import { Database } from 'sqlite3';
import { Response, Request } from 'express';
import { Query, PopularityType } from './queries';

export class Route {
    private query: Query = new Query();

    public getNote(db: Database) {
        return (request: Request, response: Response) => {
            const noteId = request.params.id;
            db.get(this.query.getNoteById(noteId), [], (error, row) => {
                if (error) {
                    console.log('error on getting note with id: ' + noteId);
                }
                response.send(row);
            })
        }
    }

    public getAllNotes(db: Database) {
        return (request: Request, response: Response) => {
            db.all(this.query.getAllNotes(), [], (error, rows) => {
                if (error) {
                    console.log('error at getting all the notes');
                }
                response.send(rows);
            })
        }
    }

    public getAllNotesByCategory(db: Database) {
        return (request: Request, response: Response) => {
            const category = request.params.category;
            db.all(this.query.getAllNotesByCategory(category), [], (error, rows) => {
                if (error) {
                    console.log('error at getting all the notes');
                }
                response.send(rows);
            })
        }
    }

    public getAllCategories(db: Database) {
        return (request: Request, response: Response) => {
            db.all(this.query.getAllCategories(), [], (error, rows) => {
                if (error) {
                    console.log('error at getting the categories');
                }
                response.send(rows);
            })
        }
    }

    public getAllNotesByString(db: Database) {
        return (request: Request, response: Response) => {
            let note = request.params.note;
            db.all(this.query.getAllNotesByString(note), [], (error, rows) => {
                if (error) {
                    console.log('error on search');
                    return;
                }
                response.send(rows);
            })
        }
    }

    public insertNewNote(db: Database) {
        return (request: Request, response: Response) => {
            const category = request.body.category;
            const note = request.body.note;
            const title = request.body.title;
            if (category && note !== '' && title !== '') {
                db.run(this.query.insertNewNote({category, note, title}), (error) => {
                if (error) {
                    response.status(500).send('error inserting the note ' + error)
                }
                response.sendStatus(200);
                })
            } else {
                response.sendStatus(204)
            }
        }
    }

    public updatePopularity(db: Database) {
        return (request: Request, response: Response) => {
            if (request.query.id && request.query.vote) {
                db.run(this.query.updatePopularity((request.query.id as string), (request.query.vote as PopularityType)), (error) => {
                    if (error) {
                        console.log('error in updatin popularity for note with id: ', request.query.id);
                        response.send('cannot vote for some reason: ' + error);
                    }
                    })
            }
            response.send(`got id=${request.query.id} and vote=${request.query.vote}`);
        }
    }

    public updateNote(db: Database) {
        return (request: Request, response: Response) => {
            db.run(this.query.updateNote(request.body.id, request.body.note), (error) => {
                if (error) {
                    console.log('error in updatin note with id: ', request.body.id);
                    response.status(500).send('cannot update note');
                }
                db.get(this.query.getNoteById(request.body.id), (err, row) => {
                if (err) {
                    console.log('error getting the note');
                }
                response.send(row);
                })
            })
        }
    }

    public updateTitle(db: Database) {
        return (request: Request, response: Response) => {
            db.run(this.query.updateNoteTitle(request.body.id, request.body.title), (error) => {
                if (error) {
                    console.log('error in updating note title with id: ', request.body.id);
                    response.status(500).send('cannot update note title');
                }
                db.get(this.query.getNoteById(request.body.id), (err, row) => {
                    if (err) {
                        console.log('error getting the note');
                    }
                    response.send(row);
                })
            })
        }
    }

}

