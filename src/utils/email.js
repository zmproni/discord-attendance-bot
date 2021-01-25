var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'discordattendancebot@gmail.com',
      pass: 'discord123'
    }
  });
  var mailOptions = {
    from: 'discordattendancebot@gmail.com',
    to: 'frznfzl97@gmail.com',
    subject: 'Attendance for the day',
    text: 'alessandro is stupid'
    //attachments: [{
    //  filename: 'attendance.csv', 
    //  content: csv,
    //}]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });