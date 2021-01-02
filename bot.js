console.log('The bot has started.')

require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOTTOKEN)

client.on('ready', ready);

function ready() {
    console.log("Bot is online")
}

client.on('message', gotMessage);

function gotMessage(message) {
    console.log(message.content);
    if (message.content.toLowerCase() === 'ping') {
        message.reply('pong');
    }
}
