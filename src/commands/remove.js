const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");

const command = "remove";
const requireAdminRights = true;

const usage = `${Config.command_prefix}${command} <session_name>
    <session_name> -> The name of the session that's going to be removed
    Eg:
    ${Config.command_prefix}${command} session_80
    `

module.exports = {
    name: command,
    description: "Schedule a session.",
    usage,
    requireAdminRights: true,
    async execute(message, args){
        let name;
        let session = new Session();

        if(args[0] != undefined){
            name = args[0].toString();
        }
        else{
            message.channel.send(usage);
            return;
        }
            
        if(!session.removeSession(name)){
            const sessionNotFound = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Session not found`)
            .setDescription(`There's no session with the name: ${name}`);           
            message.channel.send(sessionNotFound);
        }
        else{
            session.removeSession(name);

            const removeSessionNotification = new Discord.MessageEmbed()
            .setColor()
            .setTitle(`Session successfully deleted`)
            .setDescription(`Successfully deleted the session: ${name}`); 

            message.channel.send(removeSessionNotification)
        }
    }
}
