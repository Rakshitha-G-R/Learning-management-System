const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    grade: {
        type: Number,
        default: 0
    },
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    submissionURL: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
},{
    versionKey:false
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
