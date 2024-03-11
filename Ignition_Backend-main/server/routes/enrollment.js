const express = require('express');
const router = require("express").Router();
const courseFunctions=require("../functions/course.functions")
const Enrollment = require('../models/enrollment.model');
router.use(express.json());

// Create Enrollment
router.post('/enrollments', async (req, res) => {
    try {
        const { userID, courseName } = req.body;
        const courseID=await courseFunctions.getCourseIdByName(courseName)
        const enrollment = new Enrollment({ userID, courseID });
        await enrollment.save();
        res.status(201).json({ message: 'Enrollment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all Enrollments
router.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific Enrollment
router.get('/enrollments/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.find({userID : req.params.id});
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment not found' });
            return;
        }
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an Enrollment
router.put('/enrollments/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment not found' });
            return;
        }
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an Enrollment
router.delete('/enrollments/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment not found' });
            return;
        }
        res.json({ message: 'Enrollment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;