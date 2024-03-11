const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileUrl:{
        type: String,
        required: true
    },
    CourseID:{
        type: String,
        ref: 'Course',
        required: true
    },
    fileType:{
        type:String,
        required:true
    }
},{
    versionKey:false
});

const Files = mongoose.model('FileUploads', fileSchema);

module.exports = Files;