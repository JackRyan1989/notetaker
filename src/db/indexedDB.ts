import { Note } from "../components/NoteDisplay";

type Mode = 'readonly' | 'readwrite' | 'versionchange'

const dbName = 'note-content-and-history-db';
const versionNumber = 1;
const dbStoreName = 'notes';

const idbAvailable = (): boolean => {
    const idb = window.indexedDB;
    return idb ? true : false
}

const idbUnavailableError = (): Error => {
    const message = "IndexedDB is not available in this browser."
    console.error(message);
    throw new Error(message)
}

const idbOpener = (): void | Error => {
    let idb: IDBFactory;
    let db: IDBDatabase;

    if (idbAvailable()) {
        idb = window.indexedDB
    } else {
        return idbUnavailableError();
    }

    const request = idb?.open(dbName, versionNumber);

    request.onerror = (evt): void => {
        console.error((evt.target as IDBOpenDBRequest)?.error);
    }

    request.onsuccess = (evt): IDBDatabase => {
        db = (evt.target as IDBOpenDBRequest)?.result;
        return db
    }

    request.onupgradeneeded = (evt): IDBDatabase => {
        const db = (evt.target as IDBOpenDBRequest)?.result
        const store = db.createObjectStore(
          dbStoreName, { keyPath: 'id', autoIncrement: true });

        store.createIndex('title', 'title', { unique: false });
        store.createIndex('createdOn', 'createdOn', { unique: false });
        store.createIndex('updatedOn', 'updatedOn', { unique: false });
        return db
      };
}

const getObjectStore = (db: IDBDatabase, store_name: string, mode: Mode ): IDBObjectStore => {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

const addNote = (db: IDBDatabase, note: Note): void => {
    const store = getObjectStore(db, dbStoreName, 'readwrite');
    let req;
    try {
        req = store.add(note);
    } catch (error: any) {
        if (error.name == 'DataCloneError')
        console.log("Error: ", error);
        throw error;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
    };
}

export { idbOpener, addNote }
