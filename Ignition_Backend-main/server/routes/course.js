const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const courseFunctions = require('../functions/course.functions')
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');

router.post('/course/createCourse',async(req,res)=>{
    try{
        const {courseName,instructorEmail,status,description}=req.body;
        const courseId=" ";
        const course=new Course({courseName,instructorEmail,status,courseId,description});
        const result=await course.save();
        console.log(result._id)
        await Course.updateOne({_id:result._id},{ $set: { courseId: String(result._id) } })
        res.status(200).json({ message: 'Course created successfully' });
        
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/course/courseInfo/id/:id',async(req,res)=>{
    try{
        const course=await Course.findById(req.params.id);
        res.status(200).json({ message: 'Course found',course });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get('/course/courseInfo/:name',async(req,res)=>{
    try{
        const cid=await courseFunctions.getCourseIdByName(req.params.name)
        const course=await Course.findById(cid);
        res.status(200).json({ message: 'Course found',course });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get('/course/courseGrade/:cid/:email',async(req,res) => {
    try{
        const myCid = req.params.cid;
        const userId = req.params.email;

        const gradeTotals = await courseFunctions.getCourseGrade(myCid, userId);

        res.status(200).json({ gradeTotals });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get('/courses/allCourseInfo/:email', async (req, res) => {
    try {
        const enrollments = await Enrollment.find({userID:req.params.email});
        const arr = [];

        for(const enrollment of enrollments)
            {
                const course = await Course.findById(enrollment.courseID);
                const user = await User.findOne({email:course.instructorEmail});
                console.log(enrollment.courseID, req.params.email);

                const grade = await getCourseGrade(enrollment.courseID, req.params.email);
                const gradePercentage = parseFloat((grade.pointsEarned/grade.maxTotal).toFixed(4))*100;

                const fname = user.fname.substring(5);
                const lname = user.lname.substring(5);
                const courseName = course.courseName;
                const classCode = course.classCode;

                arr.push({fname, lname, courseName, classCode, gradePercentage});
                console.log({fname, lname, courseName, classCode, gradePercentage});
            }

        res.status(200).json({ arr });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/course/:courseName',async(req,res)=>{
    try{
        const course = await Course.find({courseName:req.params.courseName});
        res.status(200).json({ message: 'Course found',course });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.delete('/course/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({ message: 'Course Not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully',course});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/course/:id',async(req,res)=>{
    const {courseCode,courseName,instructorEmail,status}=req.body;
    try{
        const course = await Course.findByIdAndUpdate(req.params.id,{courseCode,courseName,instructorEmail,status})
        if (!course) {
            return res.status(404).json({ message: 'Course Not Found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('course/courseByName/:courseName', async (req, res) => {
    try {
        const courseName = req.params.courseName;
        const course = await Course.findOneAndDelete({ courseName });

        if (!course) {
            return res.status(404).json({ message: 'Course Not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/course/updateStatus/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!course) {
            return res.status(404).json({ message: 'Course Not Found' });
        }
        res.status(200).json({ message: 'Course status updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
