const to = require('await-to-js').to;
const Vision = require('@google-cloud/vision');
const TextProcessor = require('./textProcessor');
const VisionClient = new Vision.ImageAnnotatorClient();
const minConfidence = 0.7;

const getTopFields = (blocks, hasTitle) => {
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
    const text = getBlockText(block);
    fields.push({ text, position: topLeftX });
    lastBottomLeftX = topLeftX;
    if (!rowHeight) {
      topLeftY = vertices[0].y;
      const bottomLeftY = vertices[2].y;
      rowHeight = (bottomLeftY - topLeftY) * 1.2;
    }
  }

  return [fields, rowHeight, topLeftY];
};

const getBlockText = (block) => {
  const words = [];
  for (const paragraph of block.paragraphs) {
    const text = paragraph.words.map((word) => {
      return word.symbols.map((letter) => letter.text).join('');
    }).join(' ');
    words.push(text);
  }
  const text = words.join(' ').trim();
  return text;
};

const getClosestField = (fields, recordPosition) => {
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
};

const processTextAnnotations = (annotations) => {

};

const processSheetAnnotations = (annotations, hasTitle) => {
  const outputPages = [];
  for (const page of annotations.fullTextAnnotation.pages) {
    const outputRecords = [];
    const blocks = page.blocks;
    const [firstFields, rowHeight, toppestY] = getTopFields(blocks);
    const fieldNames = firstFields.map((field) => field.text);
    outputRecords.push(fieldNames.join(','));

    const fieldIDMap = new Map();
    const recordsMap = {};
    fieldNames.map((name, id) => {
      fieldIDMap.set(name, id);
      recordsMap[name] = [];
    });

    const indexToStart = firstFields.length + 1;
    for (const block of blocks.slice(hasTitle + indexToStart)) {
      if (block.confidence < minConfidence) {
        continue;
      }
      const topLeftX = block.boundingBox.vertices[0].x;
      const topLeftY = block.boundingBox.vertices[0].y;
      const field = getClosestField(firstFields, topLeftX);
      const row = Math.floor((topLeftY - toppestY)/rowHeight);
      recordsMap[field][row] = getBlockText(block);
    }

    for (let i = 0; ; i++) {
      let empty = true;
      for (const field in recordsMap) {
        if (Object.prototype.hasOwnProperty.call(recordsMap, field)) {
          if (recordsMap[field][i] !== undefined) {
            empty = false;
          }
        }
      }

      if (empty) {
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
};

const fetchAnnotations = async (imageBuffer) => {
  const req = {
    content: imageBuffer,
  };
  const [visionErr, [detections]] = await to(VisionClient.documentTextDetection(req));
  if (visionErr) {
    throw visionErr;
  }

  const annotations = detections.fullTextAnnotation;
  if (!annotations) {
    return {};
  }
  const text = annotations.text;
  const [translateErr, language] = await to(TextProcessor.detectLanguage(text));
  if (translateErr) {
    throw translateErr;
  }

  return {
    annotations,
    language,
  };
};


class ImageProcessor {
  static async getTextFromImage(imageBuffer) {
    const { text, language } = fetchAnnotations(imageBuffer);
    const data = processTextAnnotations(text);
    return { data, language };
  }

  static async getCSVFromImage(imageBuffer, hasTitle = false) {
    const { text, language } = fetchAnnotations(imageBuffer);
    const data = processSheetAnnotations(text, hasTitle);
    return { data, language };
  }
}

module.exports = ImageProcessor;
