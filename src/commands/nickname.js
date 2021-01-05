const { Message, GuildMember } = require("discord.js");
const Config = require("../util/config");

const command = "nickname";
const usage = `${Config.prefix}${command} <nickname>
    <nickname> -> Your new name that will be displayed on server and name displayed when marking your attendance. Can be set to default to reset to your Discord username.
    Eg:
        ${Config.prefix}${command} Foo Bar
        ${Config.prefix}${command} default
    `
module.exports = {
    name: command,
    description: "Changes the user's nickname in the server.",
    usage,
    requireAdminRights: false,
    /**
     * @param {Message} message
     * @param {Array.<string>} args
     */
    async execute(message, args) {
        //Turning the args array into string
        //Remove commas from array
        let nickname = args.toString().replace(/,/g, ' ');

        if (nickname == "") {
            message.channel.send(usage);
            return;
        }

        if (!(message.guild.me.hasPermission("MANAGE_NICKNAMES") && !message.member.hasPermission("MANAGE_NICKNAMES"))) {
            message.channel.send("Insufficient permissions to change your nickname.");
            return;
        }

        if (nickname == "default") {
            nickname = message.author.username;
            message.member.setNickname(nickname).catch(e => {
                console.log(e)
                message.channel.send(`An error has occurred: ${e}`)
            });
            message.channel.send("Your server nickname has been reverted back to " + nickname);
            return;
        }

        message.member.setNickname(nickname).catch(e => {
            console.log(e)
            message.channel.send(`An error has occured: ${e}`)
        });
        message.channel.send("Your server nickname has been changed to " + nickname);

    }
}