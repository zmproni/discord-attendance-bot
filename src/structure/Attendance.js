const Session = require('./Session');
const Stack = require('./Stack')

let session = new Session();
let stack = new Stack();

class Attendance {

    constructor(username, nickname, time, sessionId, note, type) {
        this.username = username;
        this.nickname = nickname;
        this.time = time;
        this.sessionId = sessionId;
        this.note = note;
        this.type = type;
    }

    attend(){
        let attendance = {
            username: this.username,
            nickname: this.nickname,
            time: this.time,
            sessionId: this.sessionId,
            note: this.note,
            type: this.type,
        }
        let currentSessionList = [];

        if(!session.noSession()){
            currentSessionList = session.getActiveSession().attendanceList;
            currentSessionList.push(attendance);
            return true;
        }else{
            return false;
        }   
    }
    
}

module.exports = Attendance;
