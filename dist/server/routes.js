"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var queries_1 = require("./queries");
var Route = /** @class */ (function () {
    function Route() {
        this.query = new queries_1.Query();
    }
    Route.prototype.getAllNotes = function (db) {
        var _this = this;
        return function (request, response) {
            db.all(_this.query.getAllNotes(), [], function (error, rows) {
                if (error) {
                    console.log('error at getting all the notes');
                }
                response.send(rows);
            });
        };
    };
    Route.prototype.getAllNotesByCategory = function (db) {
        var _this = this;
        return function (request, response) {
            var category = request.params.category;
            db.all(_this.query.getAllNotesByCategory(category), [], function (error, rows) {
                if (error) {
                    console.log('error at getting all the notes');
                }
                response.send(rows);
            });
        };
    };
    Route.prototype.getAllCategories = function (db) {
        var _this = this;
        return function (request, response) {
            db.all(_this.query.getAllCategories(), [], function (error, rows) {
                if (error) {
                    console.log('error at getting the categories');
                }
                response.send(rows);
            });
        };
    };
    Route.prototype.getAllNotesByString = function (db) {
        var _this = this;
        return function (request, response) {
            var note = request.params.note;
            db.all(_this.query.getAllNotesByString(note), [], function (error, rows) {
                if (error) {
                    console.log('error on search');
                    return;
                }
                response.send(rows);
            });
        };
    };
    Route.prototype.insertNewNote = function (db) {
        var _this = this;
        return function (request, response) {
            var category = request.body.category;
            var note = request.body.note;
            var title = request.body.title;
            if (category && note !== '' && title !== '') {
                db.run(_this.query.insertNewNote({ category: category, note: note, title: title }), function (error) {
                    if (error) {
                        response.status(500).send('error inserting the note ' + error);
                    }
                    response.sendStatus(200);
                });
            }
            else {
                response.sendStatus(204);
            }
        };
    };
    Route.prototype.updatePopularity = function (db) {
        var _this = this;
        return function (request, response) {
            if (request.query.id && request.query.vote) {
                db.run(_this.query.updatePopularity(request.query.id, request.query.vote), function (error) {
                    if (error) {
                        console.log('error in updatin popularity for note with id: ', request.query.id);
                        response.send('cannot vote for some reason: ' + error);
                    }
                });
            }
            response.send("got id=" + request.query.id + " and vote=" + request.query.vote);
        };
    };
    Route.prototype.updateNote = function (db) {
        var _this = this;
        return function (request, response) {
            db.run(_this.query.updateNote(request.body.id, request.body.note), function (error) {
                if (error) {
                    console.log('error in updatin note with id: ', request.body.id);
                    response.status(500).send('cannot update note');
                }
                db.get(_this.query.getNoteById(request.body.id), function (err, row) {
                    if (err) {
                        console.log('error getting the note');
                    }
                    response.send(row);
                });
            });
        };
    };
    Route.prototype.updateTitle = function (db) {
        var _this = this;
        return function (request, response) {
            db.run(_this.query.updateNoteTitle(request.body.id, request.body.title), function (error) {
                if (error) {
                    console.log('error in updating note title with id: ', request.body.id);
                    response.status(500).send('cannot update note title');
                }
                db.get(_this.query.getNoteById(request.body.id), function (err, row) {
                    if (err) {
                        console.log('error getting the note');
                    }
                    response.send(row);
                });
            });
        };
    };
    return Route;
}());
exports.Route = Route;
