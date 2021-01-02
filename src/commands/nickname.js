const { Message } = require("discord.js");

/**
 * @typedef {{channelId: number, commandPrefix: string}} Args
 */

module.exports = {
    name: "nickname",
    description: "Changes the user's nickname in the server.",
    /**
     * @param {Message} message
     * @param {Args} args
     */
    async execute(message, args) {
        /** @type {string?} */
        let sand;
    }
}
