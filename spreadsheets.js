const { Message } = require("discord.js");
const {google} = require('googleapis');
const keys = require('./keys.json');
//web token
const client = new google.auth.JWT(
     keys.client_email,
     null,
     keys.private_key,
     ['https://www.googleapis.com/auth/spreadsheets']
);
//connect. token gives temp access which has to be renewed after a certain period of time
client.authorize(function(err,tokens){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Connected');
        gsrun(client); 
    }
});
//for client to run google sheets
async function gsrun(cl){

    const gsapi = google.sheets({version:'v4', auth: cl });
    
    const opt = { //to get data
        spreadsheetId : '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', //link to the spreadsheet
        range: 'Attendees!A2:D4'
    };
    var data = await gsapi.spreadsheets.values.get(opt); //get the information 
    var dataArray = data.data.values;
    
    dataArray = dataArray.map(function(r){
        while(r.length < 2){
            r.push('');
        }
        return r;
    });
    //console.log(dataArray);
  
    var newDataArray = dataArray.map(function(r){
        r.push(r[0] + '-' + r[1]);
        return r;
    });
    //console.log(newDataArray);

    const updateOptions = { //to update spreadsheet
        spreadsheetId : '1HEpmFDBRj2kia8KlLMQOBt5RyadgGyELQXx0MnyPBxk', 
        range: 'Attendees!E2',
        valueInputOption: 'USER_ENTERED',
        resource: {values: newDataArray}
    };
    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res);

}