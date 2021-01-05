const { Message, GuildMember } = require("discord.js");
const Config = require("../util/config");
/**
 * @typedef {{ import('../structure/command.js').Command }} Command
 */
const command = "nickname"
    /** @type{Command} */
module.exports = {
    name: "nickname",
    description: "Changes the user's nickname in the server.",
    usage: `${Config.prefix}nickname <Your new nickname>`,
    requireAdminRights: false,
    /**
     * @param {Message} message
     * @param {Array.<string>} args
     */
    async execute(message, args) {
        //Turning the args array into string
        var rawnickname = args.toString();
        //Remove commas from array
        var newnickname = rawnickname.replace(/,/g, ' ');

        if (newnickname != "") {
            if (message.guild.me.hasPermission("MANAGE_NICKNAMES") && !message.member.hasPermission("MANAGE_NICKNAMES")) {
                if (newnickname == "default") {
                    newnickname = message.author.username;
                    message.member.setNickname(newnickname).catch(e => console.log(e));
                    message.channel.send("Your name has been reverted back to " + newnickname);
                } else {
                    message.member.setNickname(newnickname).catch(e => console.log(e));
                    message.channel.send("Your name has been changed to " + newnickname);
                }
            } else {
                message.channel.send("I am not authorized to change your nickname.");
            }
        } else {
            message.channel.send("Please specify your nickname " +
                "\nFor example: \"!nickname [NewNickname]\"" +
                "\nIf you want to revert back to your username, simply type: \"!nickname default\"");
        }
    }
}