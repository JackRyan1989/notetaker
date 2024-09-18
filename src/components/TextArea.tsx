import { Button, TextField } from "@cmsgov/design-system";
import { ReactElement, useContext } from "react";
import NotesContext from './NotesContext'
import { makeUintArray } from "../helpers/crypto";

/*
    Our note data structure which will live in the Indexed DB in the browser.
    Composed of items from state and generate onclick.
*/
export interface Note {
    title: string,
    content: string,
    createdOn: Date | string,
    updatedOn: null | Date | string,
    id: number
}


const TextArea = (): ReactElement => {
    const {notes,
        setNotes,
        editing,
        setEditing,
        error,
        setError,
        editNoteId,
        setEditNoteId,
        title,
        content,
        setTitle,
        setContent,
        valueLock,
        setValueLock} = useContext(NotesContext);

    const onChangeHandler = (event: InputEvent): void => {
        const name: string = (event?.target as HTMLInputElement)?.name;
        const value: string = (event?.target as HTMLTextAreaElement)?.value;
        setValueLock(true)
        if (value) {
            setError('')
            if (name === 'noteTitleEntry') {
                setTitle(value)
            } else if (name == 'noteContentEntry') {
                setContent(value)
            }
        }
    }

    const onSaveHandler = (event: SubmitEvent): void => {
        event.preventDefault();
        if (title.length === 0) {
            setError('noteTitleEntry')
            return
        } else if (content.length === 0) {
            setError('noteContentEntry')
            return
        }
        if (!error && !editing) {
            const note = {
                title,
                content,
                createdOn: new Date,
                updatedOn: null,
                id: makeUintArray(1)[0]
            }
            setNotes([...notes, note])
            resetState()
        } else if (!error && editing) {
            saveEditedNote();
            setEditNoteId(null)
            setEditing(false)
            resetState()
        }
        setValueLock(false)
    }

    const saveEditedNote = (): void => {
        const newNotes = notes;
        const editNoteIndex = newNotes.findIndex((note: Note) => note.id === parseInt(editNoteId))
        newNotes[editNoteIndex] = {
            title,
            content,
            createdOn: newNotes[editNoteIndex].createdOn,
            updatedOn: new Date,
            id: newNotes[editNoteIndex].id
        }
        setNotes([...newNotes])
    }

    const clearValues = (element: HTMLInputElement | HTMLTextAreaElement): void => {
        if (element && !editing && !valueLock) {
            element.value = ""
        }
    }

    const resetState = (): void => {
        setEditing(false)
        setValueLock(false)
        setTitle('')
        setContent('')
        setEditNoteId(null)
    }

    const onCancelHandler = (): void => {
        resetState();
    }

    return (
    <div>
        <TextField placeholder={editing? title: ''} name="noteTitleEntry" label="Note Title" onChange={onChangeHandler} autoFocus={true} errorMessage={(error === 'noteTitleEntry') && 'Add note title.'} inputRef={clearValues}/>
        <TextField placeholder={editing? content: ''} name="noteContentEntry" label="Note Content" multiline={true} rows={6} onChange={onChangeHandler} errorMessage={(error === 'noteContentEntry') && 'Add note content.'} inputRef={clearValues}/>
        <Button type='submit' className="ds-u-margin-top--3 ds-u-margin-right--3" variation="solid" onClick={onSaveHandler}>Save</Button>
        <Button type='button' className="ds-u-margin-top--3 ds-u-margin-right--3" variation="ghost" onClick={onCancelHandler}>Cancel</Button>
    </div>
    )
}

const TextEntryColumn = (): ReactElement => {
    return (
        <div className="ds-l-lg-col">
          <TextArea />
        </div>
    )
  }


export default TextEntryColumn
