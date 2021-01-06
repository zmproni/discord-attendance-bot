const { Message } = require("discord.js");
const Discord = require('discord.js');
const Config = require("../util/config");
const commands = require("./index")

const command = "help";
const requireAdminRights = false;
const description = new Discord.MessageEmbed()
  .setColor('#304281')
  .setTitle(Config.prefix + command)
  .setDescription("Display list of commands available and commands' details.")
  .addFields(
    { name: "Requires admin rights: ", value: requireAdminRights, inline: true },
    { name: "Usage", value: "${Config.prefix}${command} <command name>" },
    { name: "Parameters", value: "<command name> -> Optional, leave empty for full list of commands. Name of the command to view explanation and usage of command." },
    { name: "Examples: ", value: Config.prefix + command + "\n" + Config.prefix + command + " attend" }
  );
const notFound = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('Not found')
  .setDescription('Command not found')

/**
 * Function to run to execute the command
 * @param {Message} message
 * @param {Array.<string>} args
 */
async function execute(message, args) {
  if (!args || args.length == 0) {
    message.channel.send("List of commands");
  } else {
    let command = commands.find( command => command.name == args[0] );
    (command)? message.channel.send(command.description) : message.channel.send(notFound)
  }
}

module.exports = {
  name: command,
  requireAdminRights,
  description,
  execute
}
