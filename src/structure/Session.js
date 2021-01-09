const { nanoid } = require('nanoid');
const Stack = require('./Stack');

let stack = new Stack();
const Moment = require('moment');

class Session {
    constructor(name, startDateTime, duration) {
        this._id = this.generateSessionId(); // import uid generator and auto generate on object creation
        this._startDateTime = startDateTime;
        this._attendanceList = [];
        this.name = name;
        this.duration = duration;
        this.endDateTime = Moment(this._startDateTime, 'HH:mm:ss').add(duration);
    }

    /**
     * Schedule a Session/Push created session to Stack.js
     */
    scheduleSession(){        
        if(stack.isEmpty()){
            let session = {
                id: this._id,
                startDateTime: this._startDateTime,
                attendanceList: this._attendanceList,
                name: this.name,
                endDateTime: this.endDateTime
            }
            stack.push(session)
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Removes current session
     */
    removeSession(){
        stack.pop();
    }

    /**
     * Generate random characters to be set as sessionId
     */
    generateSessionId(){
        return nanoid();
    }

    editAttendace() {

    }

    fetchAttendance() {

    }

    isActive() { 
        let currentSession = stack.peek();
        console.log(currentSession.startDateTime)
        
        if(Moment().isAfter(currentSession.startDateTime)  && Moment().isBefore(currentSession.endDateTime)){
            return true;
        }
        else{
            return false;
        }
    }

    get id() {
        return this._id;
    }

    get attendanceList() {
        return this._attendanceList;
    }

    get startDateTime() {
        return this._startDateTime;
    }

}

module.exports = Session;
