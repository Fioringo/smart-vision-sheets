const to = require('await-to-js').to;
const Vision = require('@google-cloud/vision');
// const TextProcessor = require('./textProcessor');
const VisionClient = new Vision.ImageAnnotatorClient();
const minConfidence = 0.7;


class ImageProcessor {
  static getTopFields(blocks, hasTitle) {
    const fields = [];
    let rowHeight;
    let topLeftY;
    let lastBottomLeftX = 0;
    for (const block of blocks.slice(hasTitle)) {
      if (block.confidence < minConfidence) {
        continue;
      }
      const vertices = block.boundingBox.vertices;
      const topLeftX = vertices[0].x;
      if (topLeftX - lastBottomLeftX < 0) { // carriage return, it's on the next line
        break;
      }
      const text = ImageProcessor.getBlockText(block);
      fields.push({ text, position: topLeftX });
      lastBottomLeftX = topLeftX;
      if (!rowHeight) {
        topLeftY = vertices[0].y;
        const bottomLeftY = vertices[2].y;
        rowHeight = (bottomLeftY - topLeftY) * 1.2;
      }
    }

    return [fields, rowHeight, topLeftY];
  }

  static getBlockText(block) {
    const words = [];
    for (const paragraph of block.paragraphs) {
      const text = paragraph.words.map((word) => {
        return word.symbols.map((letter) => letter.text).join('');
      }).join(' ');
      words.push(text);
    }
    const text = words.join(' ').trim();
    return text;
  }

  static getClosestField(fields, recordPosition) {
    let result = '';
    let minDistance = Infinity;
    fields.forEach((field) => {
      const distance = Math.abs(recordPosition - field.position);
      if (distance < minDistance) {
        minDistance = distance;
        result = field.text;
      }
    });

    return result;
  }

  static processTextAnnotations(annotations) {

  }

  static processSheetAnnotations(annotations, hasTitle) {
    hasTitle = hasTitle ? 1 : 0;
    const outputPages = [];
    for (const page of annotations.pages) {
      const outputRecords = [];
      const blocks = page.blocks;
      const [firstFields, rowHeight, toppestY] = ImageProcessor.getTopFields(blocks, hasTitle);
      const fieldNames = firstFields.map((field) => field.text);
      outputRecords.push(fieldNames.join(','));

      const fieldIDMap = new Map();
      const recordsMap = {};
      fieldNames.map((name, id) => {
        fieldIDMap.set(name, id);
        recordsMap[name] = [];
      });

      const indexToStart = firstFields.length;
      for (const block of blocks.slice(hasTitle + indexToStart)) {
        if (block.confidence < minConfidence) {
          continue;
        }
        const topLeftX = block.boundingBox.vertices[0].x;
        const topLeftY = block.boundingBox.vertices[0].y;
        const field = ImageProcessor.getClosestField(firstFields, topLeftX);
        const row = Math.floor((topLeftY - toppestY)/rowHeight);
        recordsMap[field][row] = ImageProcessor.getBlockText(block);
      }

      for (let i = 0; ; i++) {
        let ended = true;
        for (const field in recordsMap) {
          if (Object.prototype.hasOwnProperty.call(recordsMap, field)) {
            if (recordsMap[field].length > i ) {
              ended = false;
              break;
            }
          }
        }

        if (ended) {
          break;
        }

        const recordLine = [];
        for (const field in recordsMap) {
          if (Object.prototype.hasOwnProperty.call(recordsMap, field)) {
            const value = recordsMap[field][i];
            recordLine.push(value ? value : '');
          }
        }
        outputRecords.push(recordLine.join(','));
      }
      outputPages.push(outputRecords);
    }

    return outputPages;
  }

  static async fetchAnnotations(imageBuffer) {
    const [visionErr, [detections]] = await to(VisionClient.documentTextDetection({ image: imageBuffer }));
    if (visionErr) {
      console.log(visionErr);
      throw visionErr;
    }

    const annotations = detections.fullTextAnnotation;
    if (!annotations) {
      return { pages: [] };
    }

    return annotations;
  }

  static async getTextFromImage(imageBuffer) {
    const [fetchErr, { text, language }] = await to(ImageProcessor.fetchAnnotations(imageBuffer));
    if (fetchErr) {
      throw fetchErr;
    }
    const data = ImageProcessor.processTextAnnotations(text);
    return { data, language };
  }

  static async getCSVFromImage(imageBuffer, hasTitle = false) {
    const [fetchErr, response] = await to(ImageProcessor.fetchAnnotations(imageBuffer));
    if (fetchErr) {
      throw fetchErr;
    }
    const text = response;
    const data = ImageProcessor.processSheetAnnotations(text, hasTitle);
    return data;
  }
}

module.exports = ImageProcessor;
