//Adding the router for the notes.js and adding an id in order to delete the note
const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

// GET route for getting all of the notes that are written. Reading the file in fs and parsing the data
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  fs.readFile('./db/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return res.json(JSON.parse(data))
    };
  })
});
//DELETE route for going through the notes and filtering out the note based on its id. Then comparing to the note that has been activated by the click function. 
notes.delete('/:id', (req, res) => {
  fs.readFile('./db/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedNotes = JSON.parse(data);
      let deletedNote = parsedNotes.filter(note => note.note_id === req.params.id)[0]
      let updatedNotes = parsedNotes.filter(note => note !== deletedNote)
      fs.writeFile('./db/notes.json', JSON.stringify(updatedNotes), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Success!')
        }
      })
      res.json('Deleted Successfully!');
    }

  })

})

// POST Route for a new note in the notes.html
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`)

  const { title, text } = req.body;
  //Creating the constant of newNote and the necessary parameters in order for the note to be written
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };
    //Reading the new note and pushing it to the object of newNote
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        //Stringify the notes that have been parsed and pushed into the newNotes array and writing these
        fs.writeFile('./db/notes.json', JSON.stringify(parsedNotes), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Success!')

          }

        })
        res.json(`Note added successfully 🚀`);
      };
    });
  

  }
});
module.exports = notes;