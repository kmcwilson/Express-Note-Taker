//Using the notes from the notes.route and placing it in the index to be used by the server
const app = require('express').Router();

const notesRouter = require('./notes');

app.use('/notes', notesRouter);

module.exports=app;