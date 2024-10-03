import {
    Accordion,
    AccordionItem,
    Alert,
    Button,
    DownloadIcon,
    Tooltip,
    WarningIcon
} from "@cmsgov/design-system";
import { ReactElement, useContext } from "react";
import NotesContext from "./NotesContext";
import NoteHistoryDisplay from "./NoteHistoryDisplay";
import { deleteNote, idbAvailable } from "../db/indexedDB";

export interface Note {
    title: string;
    content: string;
    createdOn: Date | string;
    updatedOn: null | Date | string;
    id: number;
    prevVersions: Array<Note>;
}
export type Notes = Array<Note>;

const NoteList = (): ReactElement => {
    const {
        notes,
        setNotes,
        setTitle,
        setContent,
        setEditing,
        setEditNoteId,
        setError,
    } = useContext(NotesContext);

    const changeNote = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        event.preventDefault();
        const id = parseInt(event?.target?.id);
        const type = event?.target?.name;
        for (const note of notes) {
            if (note.id === id) {
                if (type === "editNote") {
                    setEditing(true);
                    setEditNoteId(note.id);
                    setTitle(note.title);
                    setContent(note.content);
                    setError(null);
                } else if (type === "deleteNote") {
                    setError(null);
                    deleteNoteHandler(note.id);
                }
            }
        }
    };

    const deleteNoteHandler = (id: number): void => {
        const newNotes = notes;
        const deleteNoteIndex = newNotes.findIndex((note: Note) =>
            note.id === id
        );
        newNotes.splice(deleteNoteIndex, 1);
        setNotes([...newNotes]);
        if (idbAvailable()) {
            deleteNote(id);
        }
    };

    const sortNotes = (): Notes => {
        return notes.toSorted((firstNote: Note, nextNote: Note) => {
            return (new Date(nextNote["createdOn"]) as any) -
                (new Date(firstNote["createdOn"]) as any);
        });
    };

    const constructFileContent = (note: Note): string => {
        const rawContent =
            `${note.title}\n${note.createdOn.toLocaleString()}\n${
                note.content.split("#").join("%23")
            }`;
        return encodeURI(rawContent);
    };

    const sortedNotes = sortNotes();

    return (
        <Accordion bordered>
            {sortedNotes.length > 0
                ? sortedNotes.map((note: Note, index: number) => {
                    return (
                        <AccordionItem key={index} heading={note.title}>
                            <div className="ds-l-row-lg">
                                <NoteHistoryDisplay
                                    note={note}
                                />
                            </div>
                            <div className="ds-l-col--12">
                                <Button
                                    id={`${note.id}`}
                                    name="editNote"
                                    onClick={changeNote}
                                    className="ds-u-margin-top--3"
                                    variation="solid"
                                >
                                    Edit Latest Version
                                </Button>
                                <Button
                                    id={`${note.id}`}
                                    name="deleteNote"
                                    onClick={changeNote}
                                    className="ds-u-margin-top--3 ds-u-margin-x--3"
                                >
                                    Delete Whole Thang <WarningIcon />
                                </Button>
                                <a
                                    href={`data:text/markdown;charset=utf-8,${
                                        constructFileContent(note)
                                    }`}
                                    download={`${
                                        note.title.split(" ").join("-")
                                    }.md`}
                                >
                                    <Tooltip
                                        className="ds-c-tooltip__trigger-link"
                                        component={"a"}
                                        title="Download Markdown file containing the latest version of the note."
                                    >
                                        <DownloadIcon
                                            ariaHidden={false}
                                            title="Download Markdown file containing the latest version of the note."
                                        />
                                    </Tooltip>
                                </a>
                            </div>
                        </AccordionItem>
                    );
                })
                : (
                    <Alert heading="No notes yet.">
                        Add notes via the text box above to get started!
                    </Alert>
                )}
        </Accordion>
    );
};

const NoteColumn = (): ReactElement => {
    return (
        <div className="ds-l-sm-col">
            <div className="ds-u-margin-top--3">
                <NoteList />
            </div>
        </div>
    );
};

export default NoteColumn;
