import Header from "./components/Header";
import { getNotes, idbAvailable } from "./db/indexedDB";
import Layout from "./components/Layout";
import NoteColumn, { Notes } from "./components/NoteDisplay";
import TextEntryColumn from "./components/TextArea";
import MarkdownPreview from "./components/MarkdownPreview";
import NotesContext from "./components/NotesContext";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState<Array<null> | Notes>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<null | number>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [valueLock, setValueLock] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<null | number>(null);

  useEffect(() => {
    if (notes.length === 0 && idbAvailable()) {
      const savedNotes = getNotes();
      Promise.allSettled([savedNotes]).then((results) => {
        if (results[0].status === "fulfilled") {
          setNotes(results[0].value);
        }
      });
    }
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        deleteNoteId,
        setDeleteNoteId,
        editing,
        setEditing,
        editNoteId,
        setEditNoteId,
        title,
        setTitle,
        content,
        setContent,
        valueLock,
        setValueLock,
        error,
        setError,
      }}
    >
      <Header />
      <Layout>
        <TextEntryColumn />
        <MarkdownPreview />
      </Layout>
      <Layout>
        <NoteColumn />
      </Layout>
    </NotesContext.Provider>
  );
}

export default App;
