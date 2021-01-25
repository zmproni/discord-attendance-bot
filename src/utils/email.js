var nodemailer = require('nodemailer');
var converter = require('json-2-csv');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'discordattendancebot@gmail.com',
      pass: 'discord123'
    }
  });
//convert data to csv
var data = [
  {
    "id": 1, 
    "name":"Kim Woo Bin",
    "startDateTime": 0900,
    "duration": 9,
     "type": "remote"
      }
    ];
converter.json2csv(data, (err, csv) => {
  if (err){
    throw err;
  }
  var mailOptions = {
    from: 'discordattendancebot@gmail.com',
    to: 'frznfzl97@gmail.com',
    subject: 'Attendance for the day',
    attachments: [{
      filename: 'attendance.csv', 
      content: csv,
    }]
  }
});


   
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });