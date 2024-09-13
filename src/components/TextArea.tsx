import { Button, TextField } from "@cmsgov/design-system";
import { ReactElement, useState } from "react";

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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const onChangeHandler = (event: InputEvent): void => {
        const name: string = (event?.target as HTMLInputElement)?.name;
        const value: string = (event?.target as HTMLTextAreaElement)?.value;
        if (value) {
            setError('')
            if (name === 'noteTitleEntry') {
                setTitle(value)
            } else if (name == 'noteContentEntry') {
                setContent(value)
            }
        }
    }

    const onClickHandler = (event: SubmitEvent): void => {
        event.preventDefault();
        if (title.length === 0) {
            setError('noteTitleEntry')
            console.log(error);
        } else if (content.length === 0) {
            setError('noteContentEntry')
            console.log(error);
        }
    }

    return (
    <div>
        <TextField name="noteTitleEntry" label="Note Title" onChange={onChangeHandler} autoFocus={true} errorMessage={(error === 'noteTitleEntry') && 'Add note title.'}/>
        <TextField name="noteContentEntry" label="Note Content" multiline={true} rows={6} onChange={onChangeHandler} errorMessage={(error === 'noteContentEntry') && 'Add note content.'}/>
        <Button type='submit' className="ds-u-margin-top--3" variation="solid" onClick={onClickHandler}>Save</Button>
    </div>
    )
}

export default TextArea
