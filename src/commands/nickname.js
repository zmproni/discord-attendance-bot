const { Message } = require("discord.js");

/**
 * @typedef {{ import('../structure/command.js').Command }} Command
 */

/** @type{Command} */
module.exports = {
    name: "nickname",
    description: "Changes the user's nickname in the server.",
    requireAdminRights: false,
    /**
     * @param {Message} message
     * @param {Array.<string>} args
     */
    async execute(message, args) {
        console.log("executed")
        message.channel.send("Message received");
   }
}
