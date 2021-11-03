import { openDB } from "idb";

const dbName = "notesDB";
const storeName = "notesStore";
const version = 1; //versions start at 1
let notes;

async function addItem(val) {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(storeName, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'timeStamp' property of the objects.
      store.createIndex("timeStamp", "timeStamp");
    },
  });
  // Add a note:
  try {
    await db.add(storeName, {
      title: val.title,
      timeStamp: val.timeStamp,
      content: val.content,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getItems() {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(storeName, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'timeStamp' property of the objects.
      store.createIndex("timeStamp", "timeStamp");
    },
  });
  try {
    notes = await db.getAllFromIndex(storeName, "timeStamp");
  } catch (err) {
    console.log(err);
    return [];
  }
  return notes;
}

async function deleteNote(key) {
  key = parseInt(key);
  const db = await openDB(dbName, version, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(storeName, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'timeStamp' property of the objects.
      store.createIndex("timeStamp", "timeStamp");
    },
  });
  try {
    notes = await db.delete(storeName, key);
  } catch (err) {
    console.log(err);
    return err;
  }
  return notes;
}

async function updateNote(val, key) {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(storeName);
    },
  });
  try {
    notes = await db.put(storeName, {
      title: val.title,
      timeStamp: val.timeStamp,
      content: val.content,
      id: key
    });
  } catch (err) {
    console.log(err);
    return err;
  }
  return notes;
}

export { addItem, getItems, deleteNote, updateNote };
