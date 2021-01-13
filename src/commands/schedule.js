const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Moment = require('moment');
const Time = require('../utils/Time');
const { validateTime } = require("../utils/Time");
const Validator = require("../utils/Validator");

const command = "schedule";

/**
 * DEV NOTE:
 * - Code is still messy/overbloated
 * - Validation isn't completed (Duration)
 * - setTimeout doesn't start according to startDateTime. (It starts immediately after command)
 */

const requireAdminRights = true;
const descriptionText = "Schedule a session where attendance can be taken."
const usageText = `${Config.command_prefix}${command} <start_time> <duration> <session_name>`;
const parameters = "<start_time> -> The start time of the session\n" +
                "<duration> -> The duration of when the user can take attendance\n" +
                "<session_name> -> Optional, The name of the session, a name will be auto generated if you leave this empty (can only be one word)\n";
const examples = "!schedule 09:00 1h0m0s session_80\n" +
                "!schedule 21:00 1h30m0s\n" +
                "!schedule 02:00 1h30m2s\n";

//Command description
const description = new Discord.MessageEmbed()
            .setColor('#fcfa65')
            .setTitle(Config.command_prefix + command)
            .setDescription(descriptionText)
            .addFields(
                {name: "Requires admin rights: ", value: requireAdminRights, inline: true },
                {name: "Usage", value: usageText},
                {name: "Parameters", value: parameters},
                {name: "Examples: ", value: examples,}
            );

//Command usage
const usage = new Discord.MessageEmbed()
            .setColor('#fcfa65')
            .setTitle(`${Config.command_prefix}${command}`)
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

    async execute(message, args){
        //Validations
        if(!Validator.validateTime(args[0]) || !Validator.validateDuration(args[1]) || args.length > 3){
            message.channel.send(usage);
            return;
        }

        let startDateTime = Time.parseDateTime(args[0]);
        let duration = Time.parseDuration(args[1]);
        let name = Validator.validateAndGetName(args[2]);

        let session = new Session(name, startDateTime, duration);

        if(!session.scheduleSession()){
            const scheduleRejection = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Can't Schedule Session`)
            .setDescription("A session has already been scheduled for today");           
            message.channel.send(scheduleRejection);
            return;
        }
        
        const notification = new Discord.MessageEmbed()
            .setColor('#fcfa65')
            .setTitle(`Session: ${session.name}`)
            .setDescription("A new session has been created!")
            .addFields(
                {name:'Session Start' ,value:`${session.startDateTime.format('DD/MMM/YYYY [-] HH:mm')}`},
                {name:'Session End' ,value:`${session.endDateTime.format('DD/MMM/YYYY [-] HH:mm' )}`},
                {name:'Session Duration' ,value:`${session.duration.hours()} Hours ${session.duration.minutes()} Minutes ${session.duration.seconds()} Seconds`});
        message.channel.send(notification);

        setTimeout(
            function(){
                let attendanceList = session.generateAttendanceList();

                const sessionTimeout = new Discord.MessageEmbed()
                .setColor('#fcfa65')
                .setTitle(`Session Over`)
                .setDescription(`Session ${name} is over. Below are the attendance for today:`)
                .addFields({name: "Present", value: attendanceList.present},
                        {name: "On Leave", value: attendanceList.leave},
                        {name: "Absent", value: attendanceList.absent}
                );

                if(!session.noSession()){
                    message.channel.send(sessionTimeout);
                }

                session.removeSession(name);
        }, duration.asMilliseconds());
    }
}