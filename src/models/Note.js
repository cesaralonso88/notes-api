const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String }
});

module.exports = mongoose.model('Note', NoteSchema);
