const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    encryptpassword: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Student', 'Instructor', 'Admin', 'Unapproved'],
        default: 'Unapproved'
    },
    securityQuestions: {
        type: Map,
        of: String,
        default: {
            "Q1": "Answer 1",
            "Q2": "Answer 2",
            "Q3": "Answer 3",
            "Q4": "Answer 4"
        }
    }
},{
    // This line sets the email field as the primary key
    // This is only for Mongoose, not MongoDB itself
    _id: { type: String, alias: 'email' }
},{
    versionKey:false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
