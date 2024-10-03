import Markdown from "react-markdown"
import { Button, TabPanel, Tabs } from "@cmsgov/design-system";
import { ReactElement, useState } from "react";
import { Note } from "./NoteDisplay";

const tabContent = (obj: Note): ReactElement => {
    const [copied, setCopied] = useState(false);

    const copyContent = async (content: string): Promise<void> => {
        const type = "text/plain";
        const blob = new Blob([content], { type });
        console.log(blob)
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);
    }

    const copyHandler = (): undefined => {
        setCopied(false);
        Promise.allSettled([copyContent(obj.content)]).then((res)=>{
            if (res[0].status === 'fulfilled') {
                setCopied(true)
            } else {
                setCopied(false)
            }
        })
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <>
            <h3 className="ds-text-heading--lg">{obj.title}</h3>
            <Markdown className="ds-content">{obj.content}</Markdown>
            <p><em>
                Created on: {obj.createdOn
                    .toLocaleString()}
            </em></p>
            <p><em>
                Last updated {obj?.updatedOn
                    ?.toLocaleString() ?? 'never!'}
            </em></p>
            <Button className="ds-u-margin-y--3" onClick={copyHandler}>
                {copied ? "Copied!" : 'Copy Note Content'}
            </Button>
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
