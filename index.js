require("dotenv").config();

const Discord = require('discord.js');
const config = require("./src/utils/Config");
const commands = require('./src/commands');
const help = require("./src/commands/help");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN)
client.on('ready', onReady);
client.on('message', onMessage);

function onReady() {
    console.log("Bot is online.");
}

/**
 * Method that runs upon being notified of new message in server
 * @param {Discord.Message} message
 */
function onMessage(message) {
    const { command_prefix, admin_role } = config;

    if (!message.content.startsWith(command_prefix) || message.author.bot) return;
    //** @type {Array.<string>} */
    const args = message.content.slice(command_prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    const command = commands.find(command => command.name == commandName);

    if (commandName == help.name) {
        help.execute(message, args);
        return;
    }

    if (!command) {
        help.execute(message, [commandName]);
        return;
    }

    if (command.requireAdminRights && !(message.member.roles.cache.find(role => role.name===admin_role))){
        message.author.send('You do not possess the required account priviledges to run that command.');        
        return;
    }

    command.execute(message, args);
}
