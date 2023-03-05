'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});