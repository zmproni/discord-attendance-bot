let date = new Date();

class Session {
    constructor(name, startDateTime, duration) {
        this.id; // import uid generator and auto generate on object creation
        this.name = name;
        this.startDateTime = startDateTime;
        this.duration = duration ; // Figure out what data struct to use
        this.attendanceList = [];
    }

    isActive() {

    }
}

module.exports = Session;
