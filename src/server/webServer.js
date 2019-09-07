const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const to = require('await-to-js').to;
// const GSuiteClient = require('./gSuiteClient');
const ImageProcessor = require('../processing/imageProcessor');
// const TextProcessor = require('../processing/textProcessor');

class WebServer {
  constructor(port = 5000) {
    this.port = port;
    this.app = this.configureApp();

    this.configureApp = this.configureApp.bind(this);
    this.configureEndpoints = this.configureEndpoints.bind(this);
  }

  configureEndpoints(app) {
    app.get('/login', (req, res) => {

    });

    app.get('/callback', async (req, res) => {

    });

    app.get('/logout', (req, res) => {

    });

    app.post('/process_image', async (req, res) => {
      const [err, response] = await to(ImageProcessor.getTextFromImage(req.body.image));
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });

    app.post('/translate_text', async (req, res) => {

    });

    app.post('/add_doc', async (req, res) => {
      const [err, response] = await to(ImageProcessor.getTextFromImage(req.body.image));
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });

    app.post('/remove_doc', async (req, res) => {

    });

    app.post('/add_spreadsheet', async (req, res) => {

    });

    app.post('/remove_spreadsheet', async (req, res) => {

    });

    return app;
  }

  configureApp() {
    let app = express();
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app = this.configureEndpoints(app);
    return app;
  }

  start() {
    // Initialize Firebase Cloud Firestore

    this.app.listen(this.port, () => console.log(`Server initiated, listening on port ${this.port}`));
  }
}

module.exports = WebServer;
