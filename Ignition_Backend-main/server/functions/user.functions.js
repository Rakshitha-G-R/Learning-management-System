const Enrollment = require('../models/enrollment.model');


async function getEnrolledCourses(userId){
    var courseIDs=[];
    var i=0;
    let enrollments=await Enrollment.find({userID:userId});
    // console.log(enrollments)
    for (const enrollment of enrollments)
    {
        // console.log(enrollment.courseID)
        courseIDs[i]=enrollment.courseID;
        i=i+1;
    }
    return courseIDs;
}

module.exports = {getEnrolledCourses};