const { Message, GuildMember } = require("discord.js");
const Config = require("../util/config");
/**
 * @typedef {{ import('../structure/command.js').Command }} Command
 */

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
        message.member.setNickname(args).catch(e => console.log(e));
        message.channel.send("Message received");
    }
}