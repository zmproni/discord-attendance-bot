const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Moment = require('moment');

const command = "schedule";

/**
 * DEV NOTE:
 * - Code is still messy/overbloated
 * - Haven't put "now" argument
 * - Validation isn't completed
 */

const requireAdminRights = true;
const descriptionText = "Schedule a session where attendance can be taken."
const usageText = `${Config.command_prefix}${command} <start_time> <duration> <session_name>`;
const parameters = "<start_time> -> The start time of the session\n" +
                "<duration> -> The duration of when the user can take attendance\n" +
                "<session_name> -> Optional, The name of the session, a name will be auto generated if you leave this empty (can only be one word)\n";
const examples = "!schedule 09:00 1h session_80\n" +
                "!schedule 21:00 1h30m\n" +
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
        let timeExpression = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g;
        let durationExpression = /^(([\d]+)(h{1}|m{1}|s{1}|$)){1,3}/g;
        let name;
        let startTime;
        let today = Moment().format("YYYY/MM/DD");;
        let startDateTime;
        let durationArray = [];

        //Validations
        if(args[0] === undefined || args[0] != "now" && !timeExpression.test(args[0]) ||
            args[1] === undefined || !durationExpression.test(args[1]) || args.length > 3){
            message.channel.send(usage);
            return;
        }

        //Check if session name is defined or not
        if(args[2] === undefined){
            name = Moment().format(`DD-MM-YYYY_[SESSION]`);
        }else{
            name = args[2].toString().replace(/,/g, ' ');
        }
        
        if(timeExpression.test(args[0])){
            startTime = args[0].split(':');
        }

        if(args[0] === "now"){
            startTime = Moment().format('HH:mm').split(':');
        }

        startDateTime = Moment(`${today} ${startTime[0]}:${startTime[1]}:00`,`YYYY/MM/DD HH:mm:ss`);

        durationArray = args[1].replaceAll(/\D/g,',').split(',');

        
        let duration = Moment.duration({
            hours: durationArray[0],
            minutes: durationArray[1],
            seconds: durationArray[2]
        });

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