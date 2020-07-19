import { Request, Response, Application} from 'express';
import { sqlite3, Database } from 'sqlite3';
import { Route} from './server/routes';

const express = require('express');
const sqlite3: sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app: Application = express();
const port = 3000;
const db: Database = new sqlite3.Database('./db/notes.db', (error) => {
    if (error) {
        console.log('SQL DB openning error: ', error.message);
    }
    console.log('Connected to the notes DB');
});
const route = new Route();
app.listen(port, () => console.log('notes server 🔥 on port ', +port))

app.use('/', express.static(path.join(__dirname, 'www')));

app.get('/all', route.getAllNotes(db));
app.get('/categories', route.getAllCategories(db));
app.get('/category/:category', route.getAllNotesByCategory(db));
app.get('/search/:note', route.getAllNotesByString(db));
app.get('/popularity', route.updatePopularity(db));
app.post('/new', route.insertNewNote(db));
app.post('/update-note', route.updateNote(db));
app.post('/update-title', route.updateTitle(db));

