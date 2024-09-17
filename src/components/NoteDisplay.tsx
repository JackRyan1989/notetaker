import { Accordion, AccordionItem, Button } from "@cmsgov/design-system"
import { Note } from "./TextArea"
import { ReactElement, useContext } from "react"
import NotesContext from './NotesContext'

export type Notes = Array<Note>

const NoteList = (): ReactElement => {
    const {notes, setEditing, setEditNoteId} = useContext(NotesContext)

    const editNote =  (event: PointerEvent):void => {
        event.preventDefault();
        const id = parseInt(event?.target?.id);
        for (let note of notes) {
            if (note.id === id) {
                setEditing(true);
                setEditNoteId(note.id);
            }
        }
    }

    return (
        <Accordion bordered>
            {notes.map((note: Note, index: number) => {
                return (
                    <AccordionItem key={index} heading={note.title}>
                        <p>{note.createdOn.toLocaleString()}</p>
                        <p>{note.content}</p>
                        <Button id={note.id.toString()} onClick={editNote} className="ds-u-margin-top--3" variation="solid">Edit</Button>
                        <Button id={note.id.toString()} className="ds-u-margin-top--3" variation="ghost">Delete</Button>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

const NoteColumn = (): ReactElement => {
    return (
      <div className="ds-l-sm-col">
        <div className="ds-u-margin-top--3">
          <NoteList />
        </div>
      </div>
    )
  }

export default NoteColumn
