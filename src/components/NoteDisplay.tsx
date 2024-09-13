import { Accordion, AccordionItem, Button } from "@cmsgov/design-system"
import { Note } from "./TextArea"
import { ReactElement } from "react"

export type Notes = Array<Note>

export interface NoteDisplayProps {
    notes: Notes
}

const NoteDisplay = ({notes}: NoteDisplayProps): ReactElement => {
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

export default NoteDisplay
