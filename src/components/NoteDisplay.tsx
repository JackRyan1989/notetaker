import { Accordion, AccordionItem, Button, Tooltip } from "@cmsgov/design-system"
import { Note } from "./TextArea"
import { ReactElement, useContext } from "react"
import NotesContext from './NotesContext'

export type Notes = Array<Note>

const NoteList = (): ReactElement => {
    const {notes, setNotes, setTitle, setContent, setEditing, setEditNoteId, setError} = useContext(NotesContext)

    const changeNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        event.preventDefault();
        const id = parseInt(event?.target?.id);
        const type = event?.target?.name;
        for (const note of notes) {
            if (note.id === id) {
                if (type === "editNote") {
                    setEditing(true)
                    setEditNoteId(note.id)
                    setTitle(note.title)
                    setContent(note.content)
                    setError(null)
                } else if (type === "deleteNote") {
                    setError(null)
                    deleteNote(note.id);
                }
            }
        }
    }

    const deleteNote = (id: number): void => {
        const newNotes = notes;
        const deleteNoteIndex = newNotes.findIndex((note: Note) => note.id === id)
        newNotes.splice(deleteNoteIndex, 1)
        setNotes([...newNotes])
    }

    const tooltipContent = (note: Note): ReactElement => {
        if (note.updatedOn) {
            return (
                <Tooltip placement="left-start" title={"Created on " + (note.createdOn?.toLocaleString())} className="ds-c-tooltip__trigger-link" component={'a'}>Last updated {note.updatedOn.toLocaleString()}</Tooltip>
            )
        } else {
            return (
                <Tooltip placement="left-start" title={"No updates yet."} className="ds-c-tooltip__trigger-link" component={'a'}>Created on {note.createdOn.toLocaleString()}</Tooltip>
            )
        }
    }

    return (
        <Accordion bordered>
            {notes.map((note: Note, index: number) => {
                return (
                    <AccordionItem key={index} heading={note.title}>
                        {tooltipContent(note)}
                        <p>{note.content}</p>
                        <Button id={`${note.id}`} name="editNote" onClick={changeNote} className="ds-u-margin-top--3" variation="solid">Edit</Button>
                        <Button id={`${note.id}`} name="deleteNote" onClick={changeNote} className="ds-u-margin-top--3" variation="ghost">Delete</Button>
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
