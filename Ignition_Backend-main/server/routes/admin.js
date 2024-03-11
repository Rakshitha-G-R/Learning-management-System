const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const User = require('../models/user.model');

//Read
router.get('/admin/unapproved', async (req, res) => {
    try {
        //type, Name
        var needsApproval = [];
        const users = await User.find({type : 'Unapproved'});
        for(const u of users)
        {
            var data = { Type: 'User', Name: u.email };
            needsApproval.push(data);
        }
        const courses = await Course.find({status : 'Unapproved'});
        for(const c of courses)
        {
            var data = { Type: 'Course', Name: c.courseName };
            needsApproval.push(data);
        }
        res.status(200).json(needsApproval);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
