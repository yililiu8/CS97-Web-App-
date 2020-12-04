const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    class_name: String,
    professor: String,
    discussions: [{
        section: String,
        ta: String,
        day: String,
        time: [String]
    }],
    office_hours: [{
        person: String,
        day: String,
        time: [String]
    }],
    lecture_dates: [{
        day: String,
        time: [String]
    }]
});

module.exports = mongoose.model('classinformation1', classSchema);

