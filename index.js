require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();

let dedicatedChannelId = null;
let commandPrefix = "!";


client.login(process.env.BOTTOKEN)

client.on('ready', ready);

function ready() {
    console.log("Bot is online")
}

client.on('message', gotMessage);

function gotMessage(message) {

}
