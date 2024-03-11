const Assignments=require("../models/assignment.model")

async function getCourseAssignments(courseId){
    let assignments=await Assignments.find({courseID:courseId});
    var Ids=[];
    var AssignmentsIds=[];
    var i=0;
    for (const assignment of assignments)
    {
        Ids[i]=assignment._id;
        AssignmentsIds[i]=Ids[i].toString();
        i=i+1;
    }
    return AssignmentsIds;
}

async function getAssignmentById(id){
    let assignment=await Assignments.findById(id);
    return assignment;
}

module.exports={getAssignmentById,getCourseAssignments};