const router = require('express').Router();
const Note = require('../models/Note');
const verify = require('../middleware/verifyToken');
const paginate = require('../middleware/pagination');

// Get all notes
router.get('/', verify, paginate(Note), async (req, res) => {
  notes = res.paginatedResults;
  res.json(notes);
});

// Get a note
router.get('/:noteId', verify, async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.find({ _id: noteId, userId: req.userId });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Insert new note
router.post('/', verify, async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title: title, description: description, userId: req.userId });

  try {
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Update a note
router.patch('/:noteId', verify, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, description } = req.body;
  try {
    const updatedNote = await Note.updateOne(
      { _id: noteId, userId: req.userId },
      { $set: { title: title, description: description } }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Delete a note
router.delete('/:noteId', verify, async (req, res) => {
  noteId = req.params.noteId;
  try {
    deletedNote = await Note.remove({ _id: noteId, userId: req.userId });
    res.json(deletedNote);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
