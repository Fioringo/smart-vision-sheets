const { Translate } = require('@google-cloud/translate');
const Translator = new Translate();


class TextProcessor {
  static async detectLanguage(text) {
    const [err, [language]] = Translator.detect(text);
    if (err) {
      throw err;
    }
    return language;
  }

  static async translateText(text, targetLang) {
    const [err, [translation]] = await Translator.translate(text, targetLang);
    if (err) {
      throw err;
    }

    return translation;
  }
}

module.exports = TextProcessor;
