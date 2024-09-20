const idbOpener = (): void => {
    const idb = window.indexedDB;

    if (idb) {
        let db: IDBDatabase;
        const dbName = 'NotesDB';
        const versionNumber = 1;
        const request = idb.open(dbName, versionNumber);
        request.onerror = (evt): void => {
            console.error((evt?.target as IDBOpenDBRequest)?.error);
        }
        request.onsuccess = (evt): void => {
            db = (evt?.target as IDBOpenDBRequest)?.result;
            console.log(db)
        }
    } else {
        const message = "IndexedDB is not available in this browser."
        console.error(message);
        throw new Error(message)
    }
}

export { idbOpener }
