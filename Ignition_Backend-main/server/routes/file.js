const express = require('express');
const uploadFunctions=require('../functions/file.functions.js');
const router = express.Router();
const Files = require('../models/file.model.js');



router.post('/files/upload',async (req, res) => {
    try{
        // const {filename,fileType,CourseID}=req.body;
        const filename = req.file
        console.log(req.body)
        const url=await uploadFunctions.uploadFiles(filename);
        console.log("Got the url:",url)
        const fileUrl=url.url
        //const file=new Files({fileUrl,fileType,CourseID});
        //const savedFile=await file.save();
        res.status(200).json({message:"Uploaded file succesfullt", fileUrl});
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }

});

module.exports = router;

