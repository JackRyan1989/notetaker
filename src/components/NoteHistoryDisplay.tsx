import { TabPanel, Tabs } from "@cmsgov/design-system";
import { ReactElement } from "react";
import { Note } from "./NoteDisplay";

export default function NoteHistoryDisplay(
    { ...props }: any,
): ReactElement {
    const { prevVersions } = props;

    return (
        <>
            {prevVersions
                ? (
                    <Tabs>
                        {prevVersions.map((version: Note, index: number) => {
                            return (
                                <TabPanel
                                    key={version.id + index}
                                    id={`${index}`}
                                    tab={`Version ${index + 1}`}
                                >
                                    <ul>
                                        <li>{version.title}</li>
                                        <li>{version.content}</li>
                                        <li>
                                            Created on:{" "}
                                            {version.createdOn.toLocaleString()}
                                        </li>
                                        <li>
                                            Last updated{" "}
                                            {version?.updatedOn?.toLocaleString()}
                                        </li>
                                    </ul>
                                </TabPanel>
                            );
                        })}
                    </Tabs>
                )
                : <p>What? {prevVersions}</p>}
        </>
    );
}
