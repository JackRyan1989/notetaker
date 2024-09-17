import { createContext } from "react"
import { Notes } from "./NoteDisplay"

export interface NotesContextType {
    notes: Notes,
    setNotes: React.Dispatch<React.SetStateAction<Notes>>
  }

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

const NotesContext = createContext<any | null>(null);


export { testNotes }
export default NotesContext
