const to = require('await-to-js').to;
const Vision = require('@google-cloud/vision');
const TextProcessor = require('./textProcessor');
const VisionClient = new Vision.ImageAnnotatorClient();

class ImageProcessor {
  static async getTextFromImage(imageBuffer) {
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
      text,
      language,
    };
  }
}

module.exports = ImageProcessor;
