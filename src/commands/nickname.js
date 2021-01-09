const { Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const config = require("../utils/Config");

const command = "nickname";
const usage = `${config.command_prefix}${command} <nickname>
    <nickname> -> Your new name that will be displayed on server and name displayed when marking your attendance. Can be set to default to reset to your Discord username.
    Eg:
        ${config.command_prefix}${command} Foo Bar
        ${config.command_prefix}${command} default
    `
module.exports = {
    name: command,
    description: "Changes the user's nickname in the server.",
    usage,
    requireAdminRights: false,
    /**
     * @param {Message} message
     * @param {Array.<string>} args
     */
    async execute(message, args) {
        //Turning the args array into string
        //Remove commas from array
        let nickname = args.toString().replace(/,/g, ' ');

        if (nickname == "") {
            message.channel.send(usage);
            return;
        }

        if (!(message.guild.me.hasPermission("MANAGE_NICKNAMES") && !message.member.hasPermission("MANAGE_NICKNAMES"))) {
            let insufficientPermission = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`Can't change nickname`)
                .setDescription("Insufficient permissions to change your nickname.");   
            message.channel.send(insufficientPermission);
            return;
        }

        if (nickname == "default") {
            nickname = message.author.username;
            message.member.setNickname(nickname).catch(e => {
                console.log(e)
                message.channel.send(`An error has occurred: ${e}`)
            });

            let defaultNicknameMessage = new Discord.MessageEmbed()
                .setColor('#4287f5')
                .setTitle(`Your nickname has been succesfully reverted`)
                .setDescription("Your server nickname has been reverted back to " + nickname);   
            message.channel.send(newNicknameMessage);
            return;
        }

        message.member.setNickname(nickname).catch(e => {
            console.log(e)
            message.channel.send(`An error has occured: ${e}`)
        });

        let newNicknameMessage = new Discord.MessageEmbed()
            .setColor('#4287f5')
            .setTitle(`Your nickname has been succesfully changed`)
            .setDescription("Your server nickname has been changed to " + nickname);   
        message.channel.send(newNicknameMessage);
    }
}
