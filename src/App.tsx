import Header from "./components/Header"
import Layout from "./components/Layout"
import NoteColumn, { Notes } from "./components/NoteDisplay"
import { useState } from "react"
import TextEntryColumn from "./components/TextArea"
import NotesContext from './components/NotesContext'

function App() {
  const testNotes: Notes = [
    {
      title: 'A singular man.',
      content: 'An unequivocal voice found me alone, in the tub. Listening to whales on acid.',
      createdOn: new Date(),
      updatedOn: null,
      id: 1
    },
    {
      title: 'A doubular person.',
      content: 'An unequivocal voice found me alone, in the tub. Listening to acid on whales.',
      createdOn: new Date(),
      updatedOn: null,
      id: 2
    }
  ]

  const [notes, setNotes] = useState(testNotes);

  return (
    <NotesContext.Provider value={{
      notes,
      setNotes
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
