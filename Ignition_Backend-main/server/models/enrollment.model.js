const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    courseID: {
        type: String,
        ref: 'Course',
        required: true
    }
},{
    versionKey:false
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
