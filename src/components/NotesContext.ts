import { createContext } from "react"
import { Notes } from "./NoteDisplay"

export interface NotesContextType {
  notes: Notes,
  setNotes: React.Dispatch<React.SetStateAction<Notes>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NotesContext = createContext<any | null>(null);

export default NotesContext
