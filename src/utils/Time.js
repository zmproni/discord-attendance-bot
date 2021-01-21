const Moment = require("moment");
const Validator = require('./Validator');

const dateFormat = "DD-MM-YYYY";
const timeFormat = "HH:mm";
const today = Moment().format(dateFormat);

class Time {
    constructor() {}

    parseDateTime(time) {
        let startTime;

        if (time === "now") {
            startTime = Moment().format(timeFormat).split(':');
        } else {
            startTime = time.split(':');
        }

        return Moment(`${today} ${startTime[0]}:${startTime[1]}`, `${dateFormat} ${timeFormat}`);
    }

    parseDuration(durationInput) {
        let durationArray = durationInput.replaceAll(/\D/g, ',').split(',');
        let duration = Moment.duration({
            hours: durationArray[0],
            minutes: durationArray[1],
            seconds: durationArray[2]
        });

        return duration
    }
}

module.exports = new Time();