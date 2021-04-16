// const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const { validateNote, createNewNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(note);
    
});

router.post('/notes', (req, res) => {
    req.body.notes = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;