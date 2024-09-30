import { openDB, DBSchema } from 'idb';
import { Note } from '../components/NoteDisplay';

interface NotesDB extends DBSchema {
    'notes': {
        key: number;
        value: Note;
        indexes: { 'title': string;
        'createdOn': Date;
        'updatedOn': Date;
    };
    }
  }

const dbName = 'note-content-and-history-db';
const versionNumber = 1;
const dbStoreName = 'notes';

export const idbAvailable = (): boolean => {
    const idb = window.indexedDB;
    return idb ? true : false
}

export const idbUnavailableError = (): Error => {
    const message = "IndexedDB is not available in this browser."
    console.error(message);
    throw new Error(message)
}

const notesDBPromise =  await openDB<NotesDB>(dbName, versionNumber, {
        upgrade(db) {
          // Create a store of objects
          const store = db.createObjectStore(dbStoreName, {
            // The 'id' property of the object will be the key.
            keyPath: 'id',
            // If it isn't explicitly set, create a value by auto incrementing.
            autoIncrement: true,
          });
          // Create an index on the properties we think we'll query for the most:
          store.createIndex('title', 'title', { unique: false });
          store.createIndex('createdOn', 'createdOn', { unique: false });
          store.createIndex('updatedOn', 'updatedOn', { unique: false });
        },
    });

export async function addNote(note: Note): Promise<number> {
    return (await notesDBPromise).add(dbStoreName, note)
}

export async function updateNote(val: Note) {
    return (await notesDBPromise).put(dbStoreName, val);
}

export async function deleteNote(key: number) {
    return (await notesDBPromise).delete(dbStoreName, key);
}
