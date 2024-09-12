import { Button, TextField } from "@cmsgov/design-system";
import { ReactElement, useState } from "react";

/*
    Our note data structure which will live in the Indexed DB in the browser.
    Composed of items from state and generate onclick.
*/
interface Note {
    title: string,
    content: string,
    createdOn: Date | string,
    updatedOn: Date | string,
    id: number
}


const TextArea = (): ReactElement => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const onChangeHandler = (event: InputEvent): void => {
        const name: string = event?.target?.name;
        const value: string = event?.target?.value;
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
        console.log(title === '');
        console.log(content === '')
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
        <p>{title}</p>
        <p>{content}</p>
    </div>
    )
}

export default TextArea
