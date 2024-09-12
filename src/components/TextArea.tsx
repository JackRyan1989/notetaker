import { TextField } from "@cmsgov/design-system";
import { ReactElement } from "react";

const TextArea = ():ReactElement => {
    return (
    <div>
        <TextField name="noteTitleEntry" label="Note Title"/>
        <TextField name="noteContentEntry" label="Note Content" multiline={true} rows={6}/>
    </div>
    )
}

export default TextArea
