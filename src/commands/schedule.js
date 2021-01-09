const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Moment = require('moment');
const command = "schedule";

const usage = `${Config.command_prefix}${command} <start_time> <duration> <session_name>
    <start_time> -> The start time of the session
    <duration> -> The duration of when the user can take attendance
    ?<session_name> -> Optional. The name of the session, a name will be auto generated if you leave this empty (can only be one word)
    Eg:
    ${Config.command_prefix}${command} 09:00 1h session_80
    ${Config.command_prefix}${command} 21:00 1h30m 
    ${Config.command_prefix}${command} 02:00 1h30m2s
    `
module.exports = {
    name: command,
    description: "Schedule a session.",
    usage,
    requireAdminRights: true,

    async execute(message, args){
        let timeExpression = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g;
        let durationExpression = /^(([\d]+)(h{1}|m{1}|s{1}|$)){1,3}/g;
        let name;
        let startTime;
        let today = Moment().format("YYYY/MM/DD");;
        let startDateTime;
        let durationArray;
    
        //If there are no arguments, or if there user over-inputted
        if(args[0] == undefined || args[1] == undefined || args[3] != undefined){
            message.channel.send(usage);
            return;
        }

        //Check if session name is defined or not
        if(args[2] == undefined){
            name = Moment().format(`DD-MM-YYYY_[SESSION]`);
        }else{
            name = args[2].toString().replace(/,/g, ' ');
        }

        //Validate Time argument
        if(timeExpression.test(args[0])){
            //Set starTime value
            startTime = args[0].split(':');
        }

        //duration = args[1].replaceAll(/\D/g,',').split(',');
        if(durationExpression.test(args[1])){
            durationArray = args[1].replaceAll(/\D/g,',').split(',')
        }
        else{
            message.channel.send(usage);
            return;
        }

        //Check if the user over-inputted
        if(durationArray.length>4){
            message.channel.send(usage);
            return;
        }

        startDateTime = Moment(`${today} ${startTime[0]}:${startTime[1]}:00`,`YYYY/MM/DD hh:mm:ss`);
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

        if (session.scheduleSession()){}
        const notification = new Discord.MessageEmbed()
            .setColor('#fcfa65')
            .setTitle(`Session: ${session.name}`)
            .setDescription("A new session has been created!")
            .addFields(
                {name:'Starting Time' ,value:`${session.startDateTime.format('DD/MMM/YYYY')}`},
                {name:'Ending Time' ,value:`${session.endDateTime.format('DD/MMM/YYYY')}`},
                {name:'Session Duration' ,value:`${session.duration.hours()} Hours ${session.duration.minutes()} Minutes ${session.duration.seconds()} Seconds`},
        );

        message.channel.send(notification);
    }
}