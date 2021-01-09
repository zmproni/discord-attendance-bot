const Session = require('./Session');
const Session = require('./Stack')

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
        if(!stack.isEmpty()){
            push()
        }
    }
    
}

module.exports = Attendance;
