const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../utils/config");
const Session = require("../structure/Session");

const command = "remove";
const requireAdminRights = true;

const usage = new Discord.MessageEmbed()
        .setColor('#fcfa65')
        .setTitle(`${Config.command_prefix}${command} <session_name>`)
        .setDescription(`${Config.command_prefix}${command} <start_time> <duration> <session_name>`)
        .addFields(
            {name:`<session_name>` , value:`The name of the session that's going to be removed`},
            {name: `Eg:`, value: `${Config.command_prefix}${command} session_80`}
        );

module.exports = {
    name: command,
    description: "Schedule a session.",
    usage,
    requireAdminRights,
    async execute(message, args){
        let name;
        let session = new Session();

        if(args[0] == undefined){
            message.channel.send(usage);
            return;
        }

        name = args[0].toString();
            
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
            .setColor("#fcfa65")
            .setTitle(`Session successfully deleted`)
            .setDescription(`Successfully deleted the session: ${name}`); 

            message.channel.send(removeSessionNotification);
        }
    }
}
