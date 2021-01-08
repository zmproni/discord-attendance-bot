const { nanoid } = require('nanoid');
const Stack = require('./Stack')

let stack = new Stack();
let date = new Date();

class Session {
    constructor(name, startDateTime, duration) {
        this._id = this.generateSessionId(); // import uid generator and auto generate on object creation
        this._startDateTime = startDateTime;
        this._attendanceList = [];
        this.name = name;
        this.duration = duration ; // Figure out what data struct to use
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
                duration: this.duration
            }

            stack.push(session)
            console.log(this.isActive());
        }
        else{
            console.log(`A session has already been scheduled for today`);
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
        
        if(date >= currentSession.startDateTime){
            return true;
        }
        else{
            return false;
        }
        
    }

    isEmpty(){
        if (this.top===0)
        return true;

        else
        return false;
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
