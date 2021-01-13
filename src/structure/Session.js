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
     * Schedule a Session/Push created session to Stack
     */
    scheduleSession(){        
        if(stack.isEmpty()){
            let session = {
                id: this._id,
                startDateTime: this._startDateTime,
                attendanceList: this._attendanceList,
                name: this.name,
                duration: this.duration,
                endDateTime: this.endDateTime
            }
            stack.push(session);
            return true;
        }
        else{
            return false;
        }
    }
    
    /**
     * Removes current session
     */
    removeSession(name){
        let currentSession = this.getActiveSession();
        
        //If the Stack is empty return false
        if(this.noSession()){
            return false;
        }

        //If the current sessio name doesn't match the argument, return false
        if(currentSession.name!=name){
            return false;
        }

        //If the current session name match the argument, remove sessions
        if(currentSession.name===name){
            stack.pop();
            return true;
        }
    }

    /**
     * Generate random characters to be set as sessionId
     */
    generateSessionId(){
        return nanoid();
    }

    editAttendace(username, time, note) {
        let currentSession = this.getActiveSession();
        if(currentSession.attendanceList.some(e => e.username === username)){
            let index = currentSession.attendanceList.findIndex(e => e.username === username);
            console.log(time);
            console.log(note);
            this.fetchAttendance()[index].time = time;
            this.fetchAttendance()[index].note = note;
            return true;
        }

        return false;
    }

    fetchAttendance() {
        return this.getActiveSession().attendanceList;
    }

    /**
     * generate an attendance list in string form for output purposes
     */
    generateAttendanceList(){
        let attendanceList = this.fetchAttendance();
        let list = {present: "",
            leave: "",
            absent: ""
        }

        for(let i = 0; i < attendanceList.length; i++){
            if(attendanceList[i].type==='Present')
            list.present += `${attendanceList[i].username} - ${attendanceList[i].nickname} - ${Moment(attendanceList[i].time).format('HH:mm')} - ${attendanceList[i].note} - ${attendanceList[i].type}\n`

            if(attendanceList[i].type==='On Leave')
            list.leave += `${attendanceList[i].username} - ${attendanceList[i].nickname} - ${attendanceList[i].note} - ${attendanceList[i].type}\n`

            if(attendanceList[i].type==='Absent')
            list.absent += `${attendanceList[i].username} - ${attendanceList[i].nickname} - ${attendanceList[i].note} - ${attendanceList[i].type}\n`
        }
        
        if(list.present === "")list.present = "None";
        if(list.leave === "") list.leave = "None";
        if(list.absent === "") list.absent = "None";

        return list;
    }

    getActiveSession(){
        let currentSession = stack.peek();
        return currentSession;
    }

    isActive() { 
        let currentSession = this.getActiveSession();
        
        if(Moment().isAfter(currentSession.startDateTime) && Moment().isBefore(currentSession.endDateTime)){
            return true;
        }
        return false;
    }

    noSession(){
        if(stack.isEmpty()){
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
