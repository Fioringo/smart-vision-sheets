const to = require('await-to-js').to;
const { google } = require('googleapis');

class GSuiteClient {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://cedar-unison-252202.appspot.com/callback'
    );
  }

  async createAuthorizationUrl(scopes) {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
  }

  async createGoogleDocument(filename, content) {
    const docs = google.docs({
      version: 'v1',
      auth: this.oAuth2Client,
    });

    const [createErr, createResponse] = await to(docs.documents.create({
      requestBody: {
        title: filename,
      },
    }));

    if (createErr) {
      throw createErr;
    }

    const [updateErr, updateResponse] = await to(docs.documents.batchUpdate({
      documentId: createResponse.data.documentId,
      requestBody: {
        requests: [{
          insertText: {
            endofSegmentLocation: {},
            text: content,
          },
        }],
      },
    }));

    if (updateErr) {
      throw updateErr;
    }

    return updateResponse.data;
  }

  async createGoogleSpreadsheet(filename, content) {
    const sheets = google.sheets({
      version: 'v4',
      auth: this.oAuth2Client,
    });

    const createResource = {
      properties: {
        title: filename,
      },
    };
    const [createErr, createResponse] = await to(sheets.spreadsheets.create({
      resource: createResource,
      fields: 'spreadsheetId',
    }));

    if (createErr) {
      throw createErr;
    }


    const updateResource = {
      values: content,
    };
    const [updateErr, updateResponse] = await to(sheets.spreadsheets.values.append({
      spreadsheetId: createResponse.data.spreadsheetId,
      range: 'Sheet1!A:A',
      resource: updateResource,
      valueInputOption: 'RAW',
    }));

    if (updateErr) {
      throw updateErr;
    }

    return updateResponse.data;
  }
}

module.exports = GSuiteClient;
