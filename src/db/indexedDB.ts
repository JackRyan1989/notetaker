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
    const dbName = 'note-content-and-history-db';
    const versionNumber = 1;
    const dbStoreName = 'notes';

    if (idbAvailable()) {
        idb = window.indexedDB
    } else {
        return idbUnavailableError();
    }

    const request = idb?.open(dbName, versionNumber);

    request.onerror = (evt): void => {
        console.error((evt.target as IDBOpenDBRequest)?.error);
    }

    request.onsuccess = (evt): void => {
        db = (evt.target as IDBOpenDBRequest)?.result;
        console.log(db)
    }

    request.onupgradeneeded = (evt): void => {
        console.log("openDb.onupgradeneeded");
        const store = (evt.target as IDBOpenDBRequest)?.result.createObjectStore(
          dbStoreName, { keyPath: 'id', autoIncrement: true });

        store.createIndex('title', 'title', { unique: false });
        store.createIndex('createdOn', 'created-date', { unique: false });
        store.createIndex('updatedOn', 'updated-date', { unique: false });
      };
}

export { idbOpener }
