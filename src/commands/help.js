const { Message } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../util/config");

const command = "help";
const requireAdminRights = false;
const description = new Discord.MessageEmbed()
  .setColor('#304281')
  .setTitle(command + "Help")
  .setDescription("Display list of commands available and commands' details.")
  .addFields(
    { name: "Requires admin rights: ", value: requireAdminRights, inline: true},
    { name: "Usage", value: "${Config.prefix}${command} <command name>" },
    { name: "Parameters", value: "<command name> -> Optional, leave empty for full list of commands. Name of the command to view explanation and usage of command." },
    { name: "Examples: ", value: Config.prefix + command + "\n" + Config.prefix + command + " attend" }
  );

/**
 * Function to run to execute the command
 * @param {Message} message
 * @param {Array.<string>} args
 */
async function execute(message, args) {
  message.channel.send(description);
}

module.exports = {
  name: command,
  requireAdminRights,
  description,
  execute
}
