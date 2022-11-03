const notes = require('express').Router();
const fs = require('fs');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  fs.readFileSync('./db/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return res.json(JSON.parse(data))
    };
  })
});

  // POST Route for a new UX/UI tip
  notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`)
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
      };
      console.log(newNote);
      fs.readFileSync('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          let parsedNotes = JSON.parse(data);
          console.log(parsedNotes);
          parsedNotes.push(newNote);

          fs.writeFileSync('./db/notes.json', JSON.stringify(parsedNotes), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Success!')
            }
          })
        };
      });
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  module.exports = notes;