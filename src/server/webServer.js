const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const to = require('await-to-js').to;
require('dotenv').config();
const GSuiteClient = new (require('./gSuiteClient'))();
const ImageProcessor = require('./imageProcessor');
// const TextProcessor = require('./processing/textProcessor');
const serviceAccount = require('../PennAppsXXServiceAccount.json');
const admin = require('firebase-admin');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const qs = require('querystring');
const BASE_DOMAIN = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/userinfo.email',
];

class WebServer {
  constructor(port = 5000) {
    this.port = port;
    this.app = this.configureApp();
    this.db = null;

    this.configureApp = this.configureApp.bind(this);
    this.configureEndpoints = this.configureEndpoints.bind(this);
  }

  csvToData(data) {
    if (!data) {
      return data;
    }

    const output = [];
    for (const line of data) {
      output.push(line.split(','));
    }
    return output;
  }

  configureEndpoints(app) {
    app.get('/login', (req, res) => {
      const authorizeUrl = GSuiteClient.createAuthorizationUrl(SCOPES);
      res.redirect(authorizeUrl);
    });

    app.get('/callback', async (req, res) => {
      const { code } = req.query;
      const { tokens } = GSuiteClient.oAuth2Client.getToken(code);
      GSuiteClient.oAuth2Client.credentials = tokens;
      res.redirect(`${BASE_DOMAIN}/#${qs.stringify({ tokens })}`);
    });

    app.post('/process_image', upload.single('file0'), async (req, res) => {
      const hasTitle = Boolean(req.body.hasTitle);
      const base64Img = Buffer.from(req.file.buffer, 'base64');
      const [csvErr, csvResponse] = await to(ImageProcessor.getCSVFromImage(base64Img, hasTitle));
      if (csvErr) {
        res.status(500).send(csvErr);
      } else {
        res.send({
          csv: csvResponse,
        });
      }
    });

    app.post('/add_doc', async (req, res) => {
      const { filename, content, userId } = req.body;
      const [err, response] = await to(GSuiteClient.createGoogleDocument(filename, content));
      if (err) {
        res.status(500).send(err);
      } else {
        const docRef = this.db.collection('users').doc(userId);
        docRef.update({
          docs: admin.firestore.FieldValue.arrayUnion({
            link: response.documentId,
            name: filename,
          }),
        }).then(() => {
          res.send(response);
        }).catch((reason) => {
          res.status(500).send(reason);
        });
      }
    });

    app.post('/add_spreadsheet', async (req, res) => {
      const { filename, content, userId } = req.body;
      const data = this.csvToData(content);
      const [err, response] = await to(GSuiteClient.createGoogleSpreadsheet(filename, data));
      if (err) {
        res.status(500).send(err);
      } else {
        const docRef = this.db.collection('users').doc(userId);
        docRef.update({
          docs: admin.firestore.FieldValue.arrayUnion({
            link: response.spreadsheetId,
            name: filename,
          }),
        }).then(() => {
          res.send(response);
        }).catch((reason) => {
          res.status(500).send(reason);
        });
      }
    });

    app.post('/get_spreadsheets', async (req, res) => {
      const { userId } = req.body;
      const docRef = this.db.collection('users').doc(userId);
      docRef.get().then((snapshot) => {
        if (!snapshot.exists) {
          res.status(500).send({ msg: 'No such user!' });
        } else {
          res.send(snapshot.data());
        }
      });
    });

    app.post('/remove_doc', async (req, res) => {
      const { filename, userId, documentId } = req.body;
      const docRef = this.db.collection('users').doc(userId);
      docRef.update({
        docs: admin.firestore.FieldValue.arrayRemove({
          link: documentId,
          name: filename,
        }),
      }).then(() => {
        res.send(response);
      }).catch((reason) => {
        res.status(500).send(reason);
      });
    });

    app.post('/remove_spreadsheet', async (req, res) => {
      const { filename, userId, spreadsheetId } = req.body;
      const docRef = this.db.collection('users').doc(userId);
      docRef.update({
        docs: admin.firestore.FieldValue.arrayRemove({
          link: spreadsheetId,
          name: filename,
        }),
      }).then(() => {
        res.send(response);
      }).catch((reason) => {
        res.status(500).send(reason);
      });
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
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    this.db = admin.firestore();
    this.app.listen(this.port, () => console.log(`Server initiated, listening on port ${this.port}`));
  }
}

module.exports = WebServer;
