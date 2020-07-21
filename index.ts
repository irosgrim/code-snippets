require('dotenv').config();
import { Application } from 'express';

import { sqlite3, Database } from 'sqlite3';
import { Route} from './functions/routes';
import { connectToDb } from './functions/queries';

const express = require('express');
const sqlite3: sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app: Application = express();
const port = 3000;
const dbPath = process.env.DB_PATH || './db/notes.db';
const db: Database = new sqlite3.Database(dbPath, connectToDb);
const route = new Route();

app.listen(port, () => console.log('notes server 🔥 on port: ', + port))

app.use('/', express.static(path.join(__dirname, 'www')));

app.get('/note/:id', route.getNote(db));
app.get('/all', route.getAllNotes(db));
app.get('/categories', route.getAllCategories(db));
app.get('/category/:category', route.getAllNotesByCategory(db));
app.get('/search/:note', route.getAllNotesByString(db));
app.get('/updatepopularity', route.updatePopularity(db));
app.post('/new', route.insertNewNote(db));
app.post('/update-note', route.updateNote(db));
app.post('/update-title', route.updateTitle(db));
