const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//Route 1: fetch all notes using fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

//Route 2: add a  notes using addnote login required
router.post('/addnote', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'enter valid description').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }


})


//Route 3: update an existing note using note id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a note object
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find the note to be update
        let note = await Note.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})


//route 4: delete the existing note using note_ id deletenote auth require
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //find the note to be update
        let note = await Note.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        //allow deletetion only if user owns this notes
        if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ success: "Note has been deleted", note: note })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})


module.exports = router