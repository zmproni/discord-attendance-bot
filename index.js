require("dotenv").config();

const Discord = require('discord.js');
const Config = require('./src/util/config')

const client = new Discord.Client();
const commands = require('./src/commands');

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
    if (message.content.charAt(0) !== Config.prefix) return;
    //** @type {string} */
    const content = message.content.substr(1, message.content.length);
    commands.forEach(command => {
        if (command.name !== content) return;

        const hasAdminRight = message.member.roles.cache.find(role => role.name === Config.adminRole) == true;
        if (command.requireAdminRights && !hasAdminRight) return;

        let args = content.split(" ").filter((val, index) => index !== 0);
        command.execute(message, args);
    });
}
