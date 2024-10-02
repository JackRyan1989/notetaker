import { TabPanel, Tabs } from "@cmsgov/design-system";
import { ReactElement } from "react";
import { Note } from "./NoteDisplay";

const tabContent = (obj: Note): ReactElement => {
    return (
        <>
            <h3 className="ds-text-heading--lg">{obj.title}</h3>
            <p>{obj.content}</p>
            <p>
                Created on: {obj.createdOn
                    .toLocaleString()}
            </p>
            <p>
                Last updated {obj?.updatedOn
                    ?.toLocaleString() ?? 'never!'}
            </p>
        </>
    );
};

export default function NoteHistoryDisplay(
    { ...props }: any,
): ReactElement {
    const { note } = props;

    return (
        <>
            {note
                ? (
                    <Tabs defaultSelectedId={note.id}>
                        <TabPanel
                            key={note.id}
                            id={note.id}
                            tab={"Latest Version"}
                        >
                            {tabContent(note)}
                        </TabPanel>
                        {note.prevVersions.map(
                            (version: Note, index: number) => {
                                return (
                                    <TabPanel
                                        key={version.id + index}
                                        id={`${index}`}
                                        tab={`Version ${index + 1}`}
                                    >
                                    {tabContent(version)}
                                    </TabPanel>
                                );
                            },
                        )}
                    </Tabs>
                )
                : <p>Loading...</p>}
        </>
    );
}
