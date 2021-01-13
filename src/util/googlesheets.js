const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');

async function accessSpreadsheet(){
    const doc = new GoogleSpreadsheet('1nSd-mTDeC1now2N6GvX40nciqoJS0Jzi3Hj2v0KJVNk'); //spreadsheet link
    await promisify(doc.useServiceAccountAuth)(creds); //access spreadsheet
    const info = await promisify(doc.getInfo); //info of the sheet
    const sheet = info.worksheets[0]; 


}
accessSpreadsheet();