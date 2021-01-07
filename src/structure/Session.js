let date = new Date();

class Session {

    constructor(name, startDateTime, duration) {
        this._id; // import uid generator and auto generate on object creation
        this._startDateTime = startDateTime;
        this._attendanceList = [];
        this.name = name;
        this.duration = duration ; // Figure out what data struct to use
    }

    addAttendance() {}
    editAttendace() {}
    fetchAttendance() {}
    isActive() { }

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
