const { Message } = require("discord.js");
const Config = require("../util/config");
/**
 * @typedef {{ import('../structure/command').Command }} Command
 */
const command = "amend"
/** @type{Command} */
module.exports = {
  name: command,
  description: "Allows user to amend the details of their ",
  requireAdminRights: false,
  usage: `${Config.prefix}${command} <time> <note>
  <time> -> Time clocking in in HH:mmtt format, enter "now" for current time.
  <note> -> Additional information to append to attendance.
  Eg:
    ${Config.prefix}${command} 10:00am HQ
    ${Config.prefix}${command} now Remote`,
  /** @param {Message} message @param {Array.<string>} args */
  async execute(message, args) {
    message.channel.send("Message received");
  }
}
