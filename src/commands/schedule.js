const { Message } = require("discord.js");
const Config = require("../config");
const Session = require("../structure/Session");
const command = "schedule";
let date = new Date();
const usage = `${Config.prefix}${command} <start_time> <duration>
    <schedule> -> Schedule a session.
    Eg:
    ${Config.prefix}${command} schedule 09:00 <duration>
    ${Config.prefix}${command} schedule 21:00 <duration>
    `
module.exports = {
    name: command,
    description: "Schedule a session.",
    usage,
    requireAdminRights: false,

    async execute(message, args){
        //If there are no arguments, or if there are more than 2 arguments
        if(args[0] == undefined && args[1] == undefined || args[2] != undefined){
            message.channel.send(usage);
        }

        if(args[0] != undefined && args[1] != undefined){
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth()+1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();
            let startTime = args[0].split(':');         
            let endTime = args[1].split(':');

            let name = `${dd}/${mm}/${yyyy}`;
            let startDate = `${yyyy}/${mm}/${dd}`

            //let startDateTime = Date.parse(`${startDate}T${startTime}`);
            let startDateTime = new Date(Date.parse(`${startDate}`)).setHours(startTime[0], startTime[1]) ;            
            
            let duration = new Date(Date.UTC(yyyy, mm-1, dd, endTime[0], endTime[1]));
            
            let session = new Session(name, startDateTime, duration);
            session.scheduleSession();
            /*
                console.log(session.isActive());

                console.log(name);
                console.log(args[0]);
                console.log(session._startDateTime);
            */
            
        }     
        
    }
}