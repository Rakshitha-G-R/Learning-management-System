const express = require('express');
const router = require("express").Router();
const courseFunctions=require("../functions/course.functions")
const Assignment = require('../models/assignment.model');
const fileFunction=require("../functions/file.functions.js");
router.use(express.json());

// Create Assignment
router.post('/assignments/create', async (req, res) => {
    try {
        const { courseName, description,title, file,dueDate,closeDate, maxPoints } = req.body;
        console.log(req.body)
        const courseID=await courseFunctions.getCourseIdByName(courseName)
        const assignment = new Assignment({ courseID, courseName, description, title, dueDate, closeDate, fileURL:file, maxPoints });
        await assignment.save();
        res.status(201).json({ message: 'Assignment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all Assignments
router.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific Assignment
router.get('/assignments/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an Assignment
router.put('/assignments/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an Assignment
router.delete('/assignments/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;