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
    to: 'HRs email',
    subject: 'Attendance for the day',
    text: 'csv file'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });