const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const Course=require('../models/course.model')

async function getCourseGrade(myCid, userId)
{
    let assignments = await Assignment.find({courseID : myCid});
    let maxTotal = 0;
    let pointsEarned = 0;
    for(const assignment of assignments)
    {
        let id = assignment._id;
        maxTotal += assignment.maxPoints;
        let assignmentSubmission = await Submission.findOne({ assignmentID: id, userID: userId });
        console.log(assignmentSubmission);
        if(assignmentSubmission)
            pointsEarned += assignmentSubmission.grade;
    }

    return {pointsEarned, maxTotal}
}

async function getCourseIdByName(coursename)
{
    console.log(coursename)
    let course=await Course.findOne({courseName:coursename});
    console.log(String(course._id))
    return String(course._id)
}

module.exports={getCourseGrade,getCourseIdByName};