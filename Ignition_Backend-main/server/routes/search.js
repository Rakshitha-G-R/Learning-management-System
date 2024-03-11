const router = require("express").Router();
const User = require('../models/user.model');
const Announcement = require("../models/announcement.model");
const Enrollment = require("../models/enrollment.model");
const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");

router.post("/search", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(408).json({ error: true, message: "User not found!" });
        }

        let announcements = [];
        let assignments = [];

        let coursesToQuery;

        if (user.type === 'Student') {
            coursesToQuery = await Enrollment.find({userID : req.body.email});
        } else if (user.type === 'Instructor') {
            coursesToQuery = await Course.find({ instructorEmail: req.body.email });
        } else if (user.type === 'Admin') {
            coursesToQuery = await Course.find();
        } else {
            res.status(401).json({ error: true, message: "User not approved!" });
        }

        for (const course of coursesToQuery) {
            let enrolledCoursesAnnouncements = await Announcement.find({ 
                courseID: course.courseID
            });

            if(req.body.startDate)
            {
                enrolledCoursesAnnouncements = enrolledCoursesAnnouncements.filter(a => 
                    {
                        const dueDate = new Date(a.date);
                        return dueDate >= new Date(req.body.startDate);
                    });
            }

            if(req.body.endDate)
            {
                enrolledCoursesAnnouncements = enrolledCoursesAnnouncements.filter(a => 
                    {
                        const dueDate = new Date(a.date);
                        return dueDate <= new Date(req.body.endDate);
                    });
            }

            if ((req.body.courseName === null || new String(course.courseName).includes(req.body.courseName)) && enrolledCoursesAnnouncements.length > 0) {
                announcements = announcements.concat(enrolledCoursesAnnouncements);
            }

            let enrolledCoursesAssignments = await Assignment.find({
                courseID: course.courseID
            });

            if(req.body.startDate)
            {
                enrolledCoursesAssignments = enrolledCoursesAssignments.filter(a => 
                    {
                        const dueDate = new Date(a.dueDate);
                        return dueDate >= new Date(req.body.startDate);
                    });
            }

            if(req.body.endDate)
            {
                enrolledCoursesAssignments = enrolledCoursesAssignments.filter(a => 
                    {
                        const dueDate = new Date(a.dueDate);
                        return dueDate <= new Date(req.body.endDate);
                    });
            }

            if ((req.body.courseName === null || new String(course.courseName).includes(req.body.courseName)) && enrolledCoursesAssignments.length > 0) {
                assignments = assignments.concat(enrolledCoursesAssignments);
            }
        }

        res.status(200).json({ announcements, assignments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;