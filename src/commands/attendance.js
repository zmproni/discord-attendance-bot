const { Message } = require("discord.js");
const Config = require("../util/config");
/**
 * @typedef {{ import('../structure/command').Command }} Command
 */
const command = "attend"

/** @type{Command} */
module.exports = {
  name: command,
  description: "Marks attendance of user in the system for the day.",
  usage: `${Config.prefix}${command} <time> <note>
  Eg: ${Config.prefix}attend 10:00am HQ
  <time> -> Time clocking in in HH:mmtt format, enter "-" for current time.
  <note> -> Additional information to append to attendance.
  `,
  requireAdminRights: false,
  /**
   * @param {Message} message
   * @param {Array.<string>} args
   */
  async execute(message, args) {
    message.channel.send("Message received");
  }
}
