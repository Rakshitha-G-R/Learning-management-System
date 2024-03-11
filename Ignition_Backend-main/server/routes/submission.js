const express = require('express');
const router = require("express").Router();
const Submission = require('../models/submission.model');
router.use(express.json());

// Create Submission
router.post('/submissions', async (req, res) => {
    try {
        const { assignmentID, grade, userID, submissionURL, submissionDate } = req.body;
        const submission = new Submission({ assignmentID, grade, userID, submissionURL, submissionDate });
        await submission.save();
        res.status(201).json({ message: 'Submission created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific Submission
router.get('/submissions/:id', async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
        res.status(404).json({ message: 'Submission not found' });
        return;
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Submission
router.put('/submissions/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        if (!submission) {
        res.status(404).json({ message: 'Submission not found' });
        return;
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Submission
router.delete('/submissions/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        if (!submission) {
        res.status(404).json({ message: 'Submission not found' });
        return;
        }
        res.json({ message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
