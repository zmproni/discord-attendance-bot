const { GuildMember, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../utils/Config");
const Session = require("../structure/Session");
const Attendance = require("../structure/Attendance");
const Moment = require('moment');

const command = "attend";
const color = "#b03ed6";
const requireAdminRights = false;
const descriptionText = "Use this command to denote that you are present in the sesion";
const usageText = `${config.command_prefix}${command} <time> <note>`
const parameters = "<time> -> Time clocking in in HH:mmtt format or enter \"now\" for current time. Time has to be in-between the session\n " +
"<note> -> Additional information to append to attendance.";
const examples = `${config.command_prefix}${command} 10:00 HQ
                  ${config.command_prefix}${command} now Remote`;

const description = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(config.command_prefix + command)
                .setDescription(descriptionText)
                .addFields(
                    {name: "Requires admin rights: ", value: requireAdminRights, inline: true },
                    {name: "Usage", value: usageText},
                    {name: "Parameters", value: parameters},
                    {name: "Examples: ", value: examples,}
                );
const usage = new Discord.MessageEmbed()
              .setColor(color)
              .setTitle(`${config.command_prefix}${command}`)
              .addFields(
                  {name: "Usage", value: usageText},
                  {name: "Parameters", value: parameters},
                  {name: "Examples", value: examples}
              );

module.exports = {
  name: command,
  description,
  usage,
  requireAdminRights,
  async execute(message, args) {
    let session = new Session();
    const username = message.author.username;
    const nickname = message.member.displayName; 
    let timeExpression = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g;
    let today = Moment().format('YYYY/MM/DD');
    let timeArray = [];
    let time;
    let note = args[1];

    if(args.length > 2 &&
      (!timeExpression.test(args[0]) || 
      args[0] != 'now')){
      message.channel.send(usage);
      return;
    }
    
    if(session.noSession()){
      const noSession = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`No Session`)
            .setDescription("Can't take attendance because there is no active session.");           
            message.channel.send(noSession);
      return;
    }

    let currentSession = session.getActiveSession();
    
    if(args[0] == 'now'){
      timeArray = Moment().format('HH:mm').split(':');
    }
    else{
      timeArray = args[0].split(':');
    }
    
    time = Moment(`${today} ${timeArray[0]}:${timeArray[1]}:00`, `YYYY/MM/DD HH:mm:ss`);

    if(time.isBefore(currentSession.startDateTime) || time.isAfter(currentSession.endDateTime)){
      const attendTimeInvalid = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Invalid Attendance Time`)
            .setDescription("Input time according to session time");           
            message.channel.send(attendTimeInvalid);
      return;
    }

    if(currentSession.attendanceList.some(e => e.username === username)){
      const attendanceTaken = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Attendance Taken`)
            .setDescription("You've already taken your attendance");           
            message.channel.send(attendanceTaken);
      return;
    }

    let attendance = new Attendance(username, 
                                    nickname, 
                                    time, 
                                    currentSession.id, 
                                    note, 
                                    "Present");

    if(attendance.attend()){
      let attendanceList = session.fetchAttendance();
      let list = '';
      for(let i = 0; i < attendanceList.length; i++){
        list += `${attendanceList[i].username} ${attendanceList[i].nickname} ${Moment(attendanceList[i].time).format('HH:mm')} ${attendanceList[i].note} ${attendanceList[i].type}\n`
      }
      const attendanceSession = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle("Attendance Taken")
            .setDescription(list);        
      message.channel.send(attendanceSession); 
    }
  }
}
