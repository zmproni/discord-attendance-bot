const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Config = require("../utils/Config");
const Session = require("../structure/Session");
const Attendance = require("../structure/Attendance");
const Moment = require('moment');

const command = "absent";
const color = "#b03ed6";
const requireAdminRights = false;
const descriptionText = "Allows user to denote that they're currently absent from the session.";
const usageText = `${Config.command_prefix}${command} <note>`;
const parameters = "<note> -> Additional information to append to attendance."
const examples = `${Config.command_prefix}${command} MC`;

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
    async execute(message, args){
        let session = new Session();
        const username = message.author.username;
        const nickname = message.member.displayName; 
        let note = args[0]; 

        if(args[0] == undefined || args > 1){
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

        if(currentSession.attendanceList.some(e => e.username === username)){
            const attendanceTaken = new Discord.MessageEmbed()
                  .setColor('#ff0000')
                  .setTitle(`Attendance Taken`)
                  .setDescription("You've already taken your attendance");           
                  message.channel.send(attendanceTaken);
            return;
        }

        let attendance = new Attendance(username, nickname, '', currentSession.id, note, "On Leave");

        if(attendance.attend()){
            let attendanceList = session.generateAttendanceList();
            
            const attendanceSession = new Discord.MessageEmbed()
                  .setColor(color)
                  .setTitle("Attendance Taken")
                  .addFields(
                    {name: "Present", value: attendanceList.present},
                    {name: "On Leave", value: attendanceList.leave},
                    {name: "Absent", value: attendanceList.absent}
                )  
            message.channel.send(attendanceSession);
        }
    }
}