export interface NewNote {
    category: number;
    note: string;
    title: string;
}

export type PopularityType = 'DOWNVOTE' | 'UPVOTE';

export const connectToDb = () => {
    return (error: Error) => {
        if (error) {
            console.log('SQL DB openning error: ', error.message);
        }
        console.log('Connected to 💾 DB ');
    }
}

export class Query {
    public getNoteById(noteId: number) {
        return `SELECT * FROM notes WHERE id = ${noteId}`;
    }

    public getAllNotes() {
        return `SELECT * FROM notes`;
    }

    public getAllNotesByCategory (category: string) {
        return `SELECT * FROM notes
        WHERE category=${category}
        ORDER BY
        popularity DESC`;
    }

    public getAllCategories() {
        return `SELECT * FROM categories`;
    }

    public getAllNotesByString(notePartialText: string, orderByTimeOfCreation: string = 'DESC' ) {
        return `SELECT * FROM notes 
            WHERE (note || title) LIKE '%${notePartialText}%' 
            ORDER BY 
            date_created ${orderByTimeOfCreation}`;
    }

    public insertNewNote(note: NewNote){
        return `INSERT INTO notes(category, note, title, date_created) 
            VALUES (${note.category}, ${note.note}, ${note.title}, DateTime('now'))`;
    }

    public updatePopularity(noteId: string, type: PopularityType) {
        switch(type) {
            case 'UPVOTE':
                return `UPDATE notes SET popularity = popularity + 1 WHERE id=${parseInt(noteId, 10)};`
            case 'DOWNVOTE':
                return `UPDATE notes SET popularity = popularity - 1 WHERE id=${parseInt(noteId, 10)};`
        }
    }

    public updateNote (noteId: number, note: string) {
        return `UPDATE notes 
            SET note = '${note}', 
            date_updated = DateTime('now') 
            WHERE id= ${noteId}`;
    }

    public updateNoteTitle(noteId: number, noteTitle: string){ 
        return `UPDATE notes 
            SET title = '${noteTitle}', 
            date_updated = DateTime('now') 
            WHERE id= ${noteId}`;
    }
}
