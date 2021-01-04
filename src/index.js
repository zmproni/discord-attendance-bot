require("dotenv").config();

const Discord = require('discord.js');
const Config = require('./util/config')

const client = new Discord.Client();
const commands = require('./commands');
const { prefix } = require("./util/config");

client.login(process.env.BOTTOKEN)
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
    if (message.content.startsWith(Config.prefix) || message.author.bot) return;
    //** @type {Array.<string>} */
    const args = message.content.slice(Config.prefix.length).trim().split(" ")
    const commandName = args.shift().toLowerCase();

    let wasCommandFound = false;
    commands.forEach(command => {
        if (command.name !== commandName) return;

        const hasAdminRight = message.member.roles.cache.find(role => role.name === Config.adminRole) == true;
        if (command.requireAdminRights && !hasAdminRight) {
            message.author.send('You do not possess the required account priviledges to run that command.')
            return;
        }

        command.execute(message, args);
        wasCommandFound = true;
    });

}
