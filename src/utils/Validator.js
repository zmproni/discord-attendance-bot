const Moment = require("Moment");

const timeExpression = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g;
const durationExpression = /^(([\d]+)(h{1}|m{1}|s{1}|$)){1,3}/g;
const dateFormat = "DD-MM-YYYY";
const timeFormat = "HH:mm:ss";

class Validator{
    constructor(){}

    async validateTime(input){
        if(input===undefined) return false;
        if(input != 'now' && !timeExpression.test(input)) return false;
        
        return true;
    }

    async validateDuration(input){
        if(input===undefined) return false;
        if(!durationExpression.test(input)) return false;
        
        return true;
    }

    validateAndGetName(name){
        if(name === undefined) return Moment().format(`DD-MM-YYYY_[SESSION]`);
        else return name.toString().replace(/,/g, ' ');
    }
}

module.exports = new Validator();