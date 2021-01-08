const { Message } = require("discord.js");
const config = require("../utils/Config");
/**
 * @typedef {{ import('../structure/command').Command }} Command
 */
const command = "amend"
/** @type{Command} */
module.exports = {
  name: command,
  description: "Allows user to amend the details of their ",
  requireAdminRights: false,
  usage: `${config.command_prefix}${command} <time> <note>
  <time> -> Time clocking in in HH:mmtt format or enter "now" for current time.
  <note> -> Additional information to append to attendance.
  Eg:
    ${config.command_prefix}${command} 10:00am HQ
    ${config.command_prefix}${command} now Remote`,
  /** @param {Message} message @param {Array.<string>} args */
  async execute(message, args) {
    message.channel.send("Message received");
  }
}
