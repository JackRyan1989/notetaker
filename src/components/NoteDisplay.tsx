import { Accordion, AccordionItem, Button } from "@cmsgov/design-system"
import { Note } from "./TextArea"
import { ReactElement, useContext } from "react"
import NotesContext from './NotesContext'

export type Notes = Array<Note>

const NoteList = (): ReactElement => {
    const {notes} = useContext(NotesContext)
    return (
        <Accordion bordered>
            {notes.map((note: Note, index: number) => {
                return (
                    <AccordionItem key={index} heading={note.title}>
                        <p>{note.createdOn.toLocaleString()}</p>
                        <p>{note.content}</p>
                        <Button type='submit' className="ds-u-margin-top--3" variation="solid">Edit</Button>
                        <Button type='submit' className="ds-u-margin-top--3" variation="ghost">Delete</Button>
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
