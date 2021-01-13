const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Config = require("../utils/Config");
const Session = require("../structure/Session");
const Attendance = require("../structure/Attendance");
const Moment = require('moment');
const Validator = require("../utils/Validator");
const Time = require("../utils/Time");

const command = "amend";
const color = "#b03ed6";
const requireAdminRights = false;
const descriptionText = "Allows user to amend the details of their attendance";
const usageText = `${Config.command_prefix}${command} <time> <note>`;
const parameters = `<time> -> Time clocking in in HH:mmtt format or enter "now" for current time.
<note> -> Additional information to append to attendance.`
const examples = `${Config.command_prefix}${command} 10:00am HQ
${Config.command_prefix}${command} now Remote`;

const description = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(Config.command_prefix + command)
                    .setDescription(descriptionText)
                    .addFields(
                        {name: "Requires admin rights: ", value: requireAdminRights, inline: true },
                        {name: "Usage", value: usageText},
                        {name: "Parameters", value: parameters},
                        {name: "Examples: ", value: examples,}
                    );

const usage = new Discord.MessageEmbed()
              .setColor(color)
              .setTitle(`${Config.command_prefix}${command}`)
              .addFields(
                  {name: "Usage", value: usageText},
                  {name: "Parameters", value: parameters},
                  {name: "Examples", value: examples}
              );

module.exports = {
  name: command,
  description,
  requireAdminRights,
  usage,
  async execute(message, args) {
    let session = new Session();
    const username = message.author.username;
    let time;
    let note = args[1];

    if(args.length > 2 || !Validator.validateTime(args[0]) || args[1]==undefined){
      message.channel.send(usage);
      return;
    }

    if(session.noSession()){
      const noSession = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`No Session`)
            .setDescription("Can't amend attendance because there is no active session.");           
            message.channel.send(noSession);
      return;
    }
    
    let currentSession = session.getActiveSession();
    time = Time.parseDateTime(time);

    if(time.isBefore(currentSession.startDateTime) || time.isAfter(currentSession.endDateTime)){
      const attendTimeInvalid = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Invalid Attendance Time")
            .setDescription("Input time according to session time");           
            message.channel.send(attendTimeInvalid);
      return;
    }

    if(!currentSession.attendanceList.some(e => e.username === username)){
      const usernameNotFound = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Username Not Found")
            .setDescription("You haven't taken your attendance.");           
            message.channel.send(usernameNotFound);
      return;
    }

    session.editAttendace(username, time, note);

    const attendanceEdited = new Discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("Attendance Amended")
                            .setDescription(`Your attendance detail has been amended
                                            ${username} ${Moment(time).format('HH:mm')} ${note}`);
    message.channel.send(attendanceEdited);
    console.log(session.fetchAttendance());

  }
}
