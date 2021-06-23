const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Init
const globals = process.env;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoute = require('./src/routes/auth');
const notesRoute = require('./src/routes/notes');

// Routes Middlewares
app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);

// DB Connection
mongoose.connect(globals.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB Cluster');
});

// Port
const port = globals.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running, listening port: ${port}`);
});
