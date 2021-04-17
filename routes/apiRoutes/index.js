const router = require('express').Router();
const fs = require('fs');
const notes = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');

// GET notes
router.get('/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes.notes);
});

// POST notes, add id via uuidv4
router.post('/notes', (req, res) => {
    notes.notes = notes.notes.concat({...req.body, id: uuidv4()});
    // console.log(uuidv4());
    // Rewrite db.json with new POST data
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes.notes);
        // console.log('db saved');
    })
});

// DELETE notes from array
router.delete('/notes/:id', (req, res) => {
    var filteredNotesArray = notes.notes.filter(function(note){ 
            return note.id != req.params.id; 
        })
        notes.notes = filteredNotesArray
        // Rewrite db.json without note with ID selected by DELETE
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes.notes);
            console.log('db saved');
        })
    // console.log(filteredNotesArray);
});

module.exports = router;