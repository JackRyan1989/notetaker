import { Accordion, AccordionItem, Alert, Button, Tooltip } from "@cmsgov/design-system"
import { ReactElement, useContext } from "react"
import NotesContext from './NotesContext'
import { idbAvailable, deleteNote } from "../db/indexedDB";

export interface Note {
    title: string,
    content: string,
    createdOn: Date | string,
    updatedOn: null | Date | string,
    id: number,
    prevVersions: Array<Note>
}
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
                    deleteNoteHandler(note.id);
                }
            }
        }
    }

    const deleteNoteHandler = (id: number): void => {
        const newNotes = notes;
        const deleteNoteIndex = newNotes.findIndex((note: Note) => note.id === id)
        newNotes.splice(deleteNoteIndex, 1)
        setNotes([...newNotes])
        if (idbAvailable()) {
            deleteNote(id);
        }
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

    const sortNotes = (): Notes => {
        return notes.toSorted((firstNote: Note, nextNote: Note)=>{
            return (new Date(firstNote['createdOn']) as any) - (new Date(nextNote['createdOn']) as any)
        })
    }

    const sortedNotes = sortNotes();

    return (
        <Accordion bordered>
            {sortedNotes.length > 0 ? sortedNotes.map((note: Note, index: number) => {
                return (
                    <AccordionItem key={index} heading={note.title}>
                        {tooltipContent(note)}
                        <p>{note.content}</p>
                        <Button id={`${note.id}`} name="editNote" onClick={changeNote} className="ds-u-margin-top--3" variation="solid">Edit</Button>
                        <Button id={`${note.id}`} name="deleteNote" onClick={changeNote} className="ds-u-margin-top--3" variation="ghost">Delete</Button>
                    </AccordionItem>
                )
            }) :
            <Alert heading="No notes yet.">Add notes via the text box next door to get started!</Alert>
            }
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
