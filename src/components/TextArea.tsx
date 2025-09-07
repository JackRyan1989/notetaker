import { Button, TextField } from "@cmsgov/design-system";
import { ReactElement, useContext } from "react";
import NotesContext from "./NotesContext";
import { makeUintArray } from "../helpers/crypto";
import omit from "../helpers/omit";
import { Note } from "./NoteDisplay";
import { addNote, getNotes, idbAvailable, updateNote } from "../db/indexedDB";

const TextArea = (): ReactElement => {
    const {
        notes,
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
        setValueLock,
    } = useContext(NotesContext);

    const onChangeHandler = (event: InputEvent): void => {
        const name: string = (event?.target as HTMLInputElement)?.name;
        const value: string = (event?.target as HTMLTextAreaElement)?.value;
        setValueLock(true);
        if (value) {
            setError("");
        }
        if (name === "noteTitleEntry") {
            setTitle(value);
        } else if (name == "noteContentEntry") {
            setContent(value);
        }
    };

    const onSaveHandler = (event: SubmitEvent): void => {
        event.preventDefault();
        if (title.length === 0) {
            setError("noteTitleEntry");
            return;
        } else if (content.length === 0) {
            setError("noteContentEntry");
            return;
        }
        if (!error && !editing) { // Save the note
            const note = {
                title,
                content,
                createdOn: new Date(),
                updatedOn: null,
                id: makeUintArray(1)[0],
                prevVersions: [],
            };
            setNotes([...notes, note]);
            if (idbAvailable()) {
                addNote(note);
            }
            resetState();
        } else if (!error && editing) {
            saveEditedNote();
            setEditNoteId(null);
            setEditing(false);
            resetState();
        }
        setValueLock(false);
    };

    const saveEditedNote = (): void => {
        const newNotes = notes;
        const editNoteIndex = newNotes.findIndex((note: Note) =>
            note.id === parseInt(editNoteId)
        );
        newNotes[editNoteIndex] = {
            title,
            content,
            createdOn: newNotes[editNoteIndex].createdOn,
            updatedOn: new Date(),
            id: newNotes[editNoteIndex].id,
            prevVersions: [
                ...notes[editNoteIndex].prevVersions,
                omit("prevVersions", notes[editNoteIndex]),
            ],
        };
        setNotes([...newNotes]);
        if (idbAvailable()) {
            updateNote(newNotes[editNoteIndex]);
        }
    };

    const resetValues = (
        element: HTMLInputElement | HTMLTextAreaElement,
    ): void => {
        if (element && !editing && !valueLock) {
            element.value = "";
        }
        if (element && editing && !valueLock) {
            switch (element?.tagName) {
                case "INPUT":
                    element.value = title;
                    break;
                case "TEXTAREA":
                    element.value = content;
                    break;
                default:
                    break;
            }
        }
    };

    const resetState = (): void => {
        setEditing(false);
        setValueLock(false);
        setTitle("");
        setContent("");
        setEditNoteId(null);
    };

    const onCancelHandler = (): void => {
        resetState();
    };

    const getFileHandles = async (): Promise<
        Array<FileSystemFileHandle> | []
    > => {
        try {
            const opts = {
                types: [{
                    description: "Markdown only",
                    accept: { "text/*": [".md"] },
                }],
                multiple: false,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fsHandles = await (window as unknown as any).showOpenFilePicker(opts);
            return fsHandles;
        } catch {
            console.error("Could not upload file.");
            return [];
        }
    };

    const parseNote = (note: string): Note => {
        const [title, createdAt, ...content] = note.split("\n");
        return {
            title,
            content: content.join("\n"),
            createdOn: createdAt,
            updatedOn: null,
            id: makeUintArray(1)[0],
            prevVersions: [],
        };
    };

    const uploadNote = async () => {
        const [handles] = await getFileHandles();
        const file = await handles.getFile();

        const reader = new FileReader();

        reader.onload = async () => {
            const res = reader.result;
            if (typeof res !== "string") {
                throw Error("Reader result is not a string!")
            }
            const uploadedNote = parseNote(reader.result as string);
            if (idbAvailable()) {
                addNote(uploadedNote);
                const ns = await getNotes()
                setNotes(ns);
            }
        };
        reader.onerror = () => {
            console.error("Error reading the file. Please try again.", "error");
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <TextField
                placeholder={editing ? title : ""}
                name="noteTitleEntry"
                label="Note Title"
                value={title}
                onChange={onChangeHandler}
                autoFocus={true}
                errorMessage={(error === "noteTitleEntry") && "Add note title."}
                inputRef={resetValues}
            />
            <TextField
                placeholder={editing ? content : ""}
                name="noteContentEntry"
                label="Note Content"
                value={content}
                multiline={true}
                rows={6}
                onChange={onChangeHandler}
                errorMessage={(error === "noteContentEntry") &&
                    "Add note content."}
                inputRef={resetValues}
            />
            <Button
                type="button"
                className="ds-u-margin-top--3 ds-u-margin-right--3"
                variation="solid"
                onClick={onSaveHandler}
            >
                Save
            </Button>
            <Button
                type="button"
                className="ds-u-margin-top--3 ds-u-margin-right--3"
                variation="ghost"
                onClick={onCancelHandler}
            >
                Clear
            </Button>
            <Button
                name="uploadNote"
                className="ds-u-margin-top--3 ds-u-margin-x--3"
                onClick={uploadNote}
            >
                Upload Note
            </Button>
        </div>
    );
};

const TextEntryColumn = (): ReactElement => {
    return (
        <div className="ds-l-lg-col">
            <TextArea />
        </div>
    );
};

export default TextEntryColumn;
