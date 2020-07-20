"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.connectToDb = void 0;
exports.connectToDb = function () {
    return function (error) {
        if (error) {
            console.log('SQL DB openning error: ', error.message);
        }
        console.log('Connected to 💾 DB ');
    };
};
var Query = /** @class */ (function () {
    function Query() {
    }
    Query.prototype.getNoteById = function (noteId) {
        return "SELECT * FROM notes WHERE id = " + noteId;
    };
    Query.prototype.getAllNotes = function () {
        return "SELECT * FROM notes";
    };
    Query.prototype.getAllNotesByCategory = function (category) {
        return "SELECT * FROM notes\n        WHERE category=" + category + "\n        ORDER BY\n        popularity DESC";
    };
    Query.prototype.getAllCategories = function () {
        return "SELECT * FROM categories";
    };
    Query.prototype.getAllNotesByString = function (notePartialText, orderByTimeOfCreation) {
        if (orderByTimeOfCreation === void 0) { orderByTimeOfCreation = 'DESC'; }
        return "SELECT * FROM notes \n            WHERE (note || title) LIKE '%" + notePartialText + "%' \n            ORDER BY \n            date_created " + orderByTimeOfCreation;
    };
    Query.prototype.insertNewNote = function (note) {
        return "INSERT INTO notes(category, note, title, date_created) \n            VALUES (" + note.category + ", " + note.note + ", " + note.title + ", DateTime('now'))";
    };
    Query.prototype.updatePopularity = function (noteId, type) {
        switch (type) {
            case 'UPVOTE':
                return "UPDATE notes SET popularity = popularity + 1 WHERE id=" + parseInt(noteId, 10) + ";";
            case 'DOWNVOTE':
                return "UPDATE notes SET popularity = popularity - 1 WHERE id=" + parseInt(noteId, 10) + ";";
        }
    };
    Query.prototype.updateNote = function (noteId, note) {
        return "UPDATE notes \n            SET note = '" + note + "', \n            date_updated = DateTime('now') \n            WHERE id= " + noteId;
    };
    Query.prototype.updateNoteTitle = function (noteId, noteTitle) {
        return "UPDATE notes \n            SET title = '" + noteTitle + "', \n            date_updated = DateTime('now') \n            WHERE id= " + noteId;
    };
    return Query;
}());
exports.Query = Query;
