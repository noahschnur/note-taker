const router = require('express').Router();
const fs = require('fs');
const { validateNote, createNewNote } = require('../../lib/notes');
const notes = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes.notes);
});

router.post('/notes', (req, res) => {
    notes.notes = notes.notes.concat({...req.body, id: uuidv4()});
    // console.log(uuidv4());
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes.notes);
        console.log('db saved');
    })
    var tempArray = notes.notes.concat(req.body);
    // console.log(tempArray);
    // console.log(req.body);
    // console.log(notes.notes.length);

//     if (!validateNote(req.body)) {
//         res.status(400).send('The note is not properly formatted');
//     } else {
//         const note = createNewNote(req.body, notes);
//         res.json(note);
//     }
});

router.delete('/notes/:id', (req, res) => {
    var filteredNotesArray = notes.notes.filter(function(note){ 
            return note.id != req.params.id; 
        })
        notes.notes = filteredNotesArray
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes.notes);
            console.log('db saved');
        })
    console.log(filteredNotesArray);
});

module.exports = router;