const express = require("express");
const { BugModel } = require("../model/bugmodel");
const { auth } = require("../middleware/authmiddleware");


const bugRouter = express.Router();



bugRouter.get('/', auth, async (req, res) => {
        try {
            const bugs = await BugModel.find();
            res.send(bugs);
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });


    bugRouter.get('/:_id', auth, async (req, res) => {
        try {
            const { _id } = req.params; 
            const bug = await BugModel.findOne({ _id }); 
            if (!bug) {
                return res.status(404).send({ error: 'Bug not found' });
            }
            res.status(200).send({ msg: "individual bug", bug });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error', error });
        }
    });
    
    bugRouter.post('/', auth, async (req, res) => {
        try {
            const { title, description, source, severity } = req.body;
            const bug = new BugModel({
                title,
                description,
                source,
                severity,
                raised_by: req.body._id 
            });
            await bug.save();
            res.status(201).send({ message: 'Bug created successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Internal server error', error});
        }
    });

    bugRouter.patch('/:id', auth, async (req, res) => {
        try {
            const { id } = req.params;
            const { created_at, updated_at, ...updateData } = req.body; 
            const bug = await BugModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            if (!bug) {
                return res.status(404).send({ error: 'Bug not found' });
            }
            res.send(bug);
        } catch (error) {
            res.status(500).send({ error: 'Internal server error', error });
        }
    });
    
    
    // Delete
    bugRouter.delete('/:id', auth, async (req, res) => {
        try {
            const { id } = req.params;
            const bug = await BugModel.findByIdAndDelete(id);
            if (!bug) {
                return res.status(404).send({ error: 'Bug not found' });
            }
            res.send({ message: 'Bug deleted successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });



    module.exports={
        bugRouter
    }
    
    