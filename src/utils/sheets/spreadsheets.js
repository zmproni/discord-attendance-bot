const { Message } = require("discord.js");
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const schedule = require('../src/commands/schedule.js');
const nickname = require('../src/commands/nickname.js');
require("dotenv").config();

async function authorize(){
  const client = new google.auth.JWT(
    process.env.GS_CLIENT_EMAIL, 
    null,
    process.env.GS_PRIVATE_KEY, 
    ['https://www.googleapis.com/auth/spreadsheets'] //SCOPES
  );
  
  //connect
  client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Connected');
    }
  });
  
}
const authClient = await authorize();

const gsapi = google.sheets({ sheets, authClient });

async function viewAttendance(viewOpt){
  const opt = { 
    spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //link to the spreadsheet -- admin to fill in
    range: 'Attendees!B:E',
    dateTimeRenderOption: schedule.startDateTime
   };
  let data = await gsapi.spreadsheets.values.get(viewOpt);
  return data;

}

async function blankInput(r){
  let data = viewAttendance(viewOpt);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map(function(r) {
    while (r.length < 5) {
     console.log("Error, please re-enter your details");
     r.push('');
    }
    let r = await gsapi.spreadsheets.values.clear(r);
    return r;
   } );
  }

async function editAttendance(updateOpt){
  const updateOpt = { 
    spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //admin to fill this up
    range: 'Attendees!B:E',
    valueInputOption: 'USER_ENTERED', //search for username - if username == cell value: replace to new values
    resource: { values: newDataArray }
  };
  let res = await gsapi.spreadsheets.values.update(updateOpt);
  return res;
}

async function addAttendance(){
  const addOpt = { 
    spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //admin to fill this up
    range: '',
    valueInputOption: 'USER_ENTERED',
    insertDataOption:'',
    resource: { values: newDataArray }
  };
  let res = await gsapi.spreadsheets.values.append(addOpt);
  return res;
}


