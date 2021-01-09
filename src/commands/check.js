const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");
const Stack = require("../structure/Stack");

const command = "check";
const usage = `${Config.command_prefix}${command}
    <schedule> -> Check if there are any active session
    Eg:
    ${Config.command_prefix}${command}
    `
module.exports = {
    name: command,
    description: "Check if there are any session scheduled",
    usage,
    requireAdminRights: false,

    /**
     * @param {*} message 
     * @param {*} args 
     */

    async execute(message, args){
        let currentSession = new Session();

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


