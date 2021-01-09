const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Moment = require('moment');
const command = "schedule";
let date = new Date();
const usage = `${Config.command_prefix}${command} <start_time> <duration>
    <schedule> -> Schedule a session.
    Eg:
    ${Config.command_prefix}${command} 09:00 1h
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
        
        let startTime;
        let today = Moment().format("YYYY/MM/DD");;
        let name = Moment().format(`DD-MM-YYYY_[SESSION]`);
        let startDateTime;
        let durationArray;

        
        //If there are no arguments, or if there are more than 2 arguments
        if(args[0] == undefined || args[1] == undefined || args[2] != undefined){
            message.channel.send(usage);
            return;
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

        session.scheduleSession();

        if(session.isActive()){
            const notification = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Can't Schedule Session`)
            .setDescription("A session has already been scheduled for today");           
            return;
        }

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
        
        
        /*
        if(args[0] != undefined && args[1] != undefined){
            let startTime = args[0].split(':');         
            let endTime = args[1].split(':');
            
            let todayDate = Moment().format("YYYY/MM/DD");

            let name = Moment().format(`DD-MM-YYYY_[SESSION]`);            

            let startDateTime = Moment(`${todayDate} ${startTime[0]}:${startTime[1]}:00`,`YYYY/MM/DD hh:mm:ss`)
            let endDateTime = Moment(`${todayDate} ${endTime[0]}:${endTime[1]}:00`,`YYYY/MM/DD hh:mm:ss`);
            
            let session = new Session(name, startDateTime, endDateTime);
            session.scheduleSession();
        }     
        */

        
    }
}