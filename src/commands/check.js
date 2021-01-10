const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Stack = require("../structure/Stack");

const command = "check";
const descriptionText = "Check if there are any session scheduled";
const usageText = `${Config.command_prefix}${command}`;
const requireAdminRights = false;

const description = new Discord.MessageEmbed()
            .setColor('#fcfa65')
            .setTitle(Config.command_prefix + command)
            .setDescription(descriptionText)
            .addFields(
                {name: "Requires admin rights: ", value: requireAdminRights, inline: true },
                {name: "Usage", value: `${Config.command_prefix}${command} <command name>` },
            );

//Command usage
const usage = new Discord.MessageEmbed()
.setColor('#fcfa65')
.setTitle(`${Config.command_prefix}${command}`)
.addFields(
    {name: "Usage", value: usageText}
);

module.exports = {
    name: command,
    description,
    usage,
    requireAdminRights: false,

    async execute(message, args){
        let currentSession = new Session();

        if(args[0]!=undefined){
            message.channel.send(usage);
            return;
        }

        if(currentSession.noSession()){
            const noSession = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`No Session`)
                .setDescription("There is no session currently active.");   
            message.channel.send(noSession);
        }
        else{
            let sessionInfo = currentSession.getActiveSession(); 

            const sessionExist = new Discord.MessageEmbed()
                .setColor('#fcfa65')
                .setTitle(`Session: ${sessionInfo.name}`)
                .setDescription("Currently active session.")
                .addFields(
                    {name:'Starting Time', value:`${sessionInfo.startDateTime.format('DD/MMM/YYYY')}`},
                    {name:'Ending Time', value:`${sessionInfo.endDateTime.format('DD/MMM/YYYY')}`},
                    {name:'Session Duration', value:`${sessionInfo.duration.hours()} Hours ${sessionInfo.duration.minutes()} Minutes ${sessionInfo.duration.seconds()} Seconds`});
            message.channel.send(sessionExist);
        }

        
    }
}


