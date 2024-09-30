import Header from "./components/Header"
import Layout from "./components/Layout"
import NoteColumn, { Notes } from "./components/NoteDisplay"
import TextEntryColumn from "./components/TextArea"
import NotesContext from './components/NotesContext'
import { useState } from "react"

function App() {
  const [notes, setNotes] = useState<Array<null> | Notes>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<null | number>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [valueLock, setValueLock] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<null | number>(null);

  return (
    <NotesContext.Provider value={{
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
      setError
    }}>
      <Header />
      <Layout>
        <TextEntryColumn/>
        <NoteColumn/>
      </Layout>
    </NotesContext.Provider>
  )
}

export default App
