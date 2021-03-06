const { Message } = require("discord.js");
const Discord = require('discord.js');
const config = require("../utils/Config");
const commands = require("./index")

const commandName = "help";
const requireAdminRights = false;
const description = new Discord.MessageEmbed()
  .setColor('#304281')
  .setTitle(config.command_prefix + commandName)
  .setDescription("Display list of commands available and commands' details.")
  .addFields(
    { name: "Requires admin rights: ", value: requireAdminRights, inline: true },
    { name: "Usage", value: `${config.command_prefix}${commandName} <command name>` },
    { name: "Parameters", value: "<command name> -> Optional, leave empty for full list of commands. Name of the command to view explanation and usage of command." },
    { name: "Examples: ", value: config.command_prefix + commandName + "\n" + config.command_prefix + commandName + " attend" }
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
    const listOfCommands = commands.reduce((concat, { name }) => concat + config.command_prefix + name + "\n", "")
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("List of commands:")
        .setDescription(listOfCommands)
        .setFooter(`For more info on what a command does, type ${config.command_prefix}${commandName} <command's name>`)
    );
  } else {
    let command = commands.find(command => command.name == args[0]);
    (command) ? message.channel.send(command.description) :
      (args[0] === commandName) ? message.channel.send(description) :
        message.channel.send(notFound)
  }
}

module.exports = {
  name: commandName,
  requireAdminRights,
  description,
  execute
}
