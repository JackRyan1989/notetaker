import Header from "./components/Header"
import Layout from "./components/Layout"
import NoteColumn from "./components/NoteDisplay"
import TextEntryColumn from "./components/TextArea"
import NotesContext, { testNotes } from './components/NotesContext'
import { useState } from "react"

function App() {
  const [notes, setNotes] = useState(testNotes);
  const [editing, setEditing] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<null | number>(null);
  return (
    <NotesContext.Provider value={{
      notes,
      setNotes,
      editing,
      setEditing,
      editNoteId,
      setEditNoteId
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
