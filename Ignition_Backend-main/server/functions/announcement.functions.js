const Announcement=require('../models/announcement.model');

async function getAnnouncementsById(id){
    let announcements=await Announcement.findById(id);
    return announcements;
}

async function getCourceAnnouncements(courseId){
    let announcements=await Announcement.find({courseID:courseId});
    var Ids=[];
    var AnnouncementsIds=[];
    var i=0;
    for (const announcement of announcements)
    {
        Ids[i]=announcement._id;
        AnnouncementsIds[i]=Ids[i].toString();
        i=i+1;
    }
    return AnnouncementsIds;
}

module.exports={getAnnouncementsById,getCourceAnnouncements};