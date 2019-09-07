const to = require('await-to-js').to;
const { google } = require('googleapis');

class GSuiteClient {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      YOUR_CLIENT_ID,
      YOUR_CLIENT_SECRET,
      YOUR_REDIRECT_URL
    );
  }

  async createAuthorizationUrl(scopes) {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scopes,
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

    const data = {
      ranges: ['Sheet1'],
      values: content,
    };
    const updateResource = {
      data,
      valueInputOption: 'RAW',
    };
    const [updateErr, updateResponse] = await to(sheets.spreadsheets.batchUpdate({
      spreadsheetId: createResponse.data.spreadsheetId,
      resource: updateResource,
    }));

    if (updateErr) {
      throw updateErr;
    }

    return updateResponse.data;
  }
}

module.exports = GSuiteClient;
