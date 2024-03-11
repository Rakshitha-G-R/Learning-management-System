const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseID: {
        type: String,
        ref: 'Course',
        required: true
    },
    courseName:
    {
        type:String,
        required:true
    },
    description:{
        type:String
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    closeDate:{
        type: Date,
        required: true
    },
    fileURL: {
        type: String,
        required: false
    },
    maxPoints: {
        type: Number,
        required: true
    }
},{
    versionKey:false
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
