const { Message } = require("discord.js");
const { google } = require('googleapis');
const sheets = google.sheets('v4');
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

async function view(spreadsheetID){
  //   /* to view data -- users get to view the employees that are absent/on leave
//    and to check if their input is correct*/
  const opt = { 
    spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //link to the spreadsheet -- admin to fill in
    range: 'Attendees!B:E',
    dateTimeRenderOption:''
   };
  var data = await gsapi.spreadsheets.values.get(opt);
  var dataArray = data.data.values; 

}



// // if all cells aren't filled, output error
//   dataArray = dataArray.map(function (r) {
//     while (r.length < 5) {
//       console.log("Error, please re-enter your details");
//       r.push('');
//     }
//     return r;
//   });
// /*  to update spreadsheet -- for users to edit the spreadsheet if they entered wrong values/
// want to change any values entered by them. */
//   const updateOptions = { 
//     spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //admin to fill this up
//     range: '',
//     valueInputOption: 'USER_ENTERED', //search for username - if username == cell value: replace to new values
//     resource: { values: newDataArray }
//   };
//   let res = await gsapi.spreadsheets.values.update(updateOptions);
//   console.log(res);

//   //append values -- take attendance: attend, remote, hq, leave
//   const appendOptions = { 
//     spreadsheetId: '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //admin to fill this up
//     range: '',
//     valueInputOption: 'USER_ENTERED',
//     insertDataOption:'',
//     resource: { values: newDataArray }
//   };
//   let res = await gsapi.spreadsheets.values.append(appendOptions);
//   console.log(res);
// }