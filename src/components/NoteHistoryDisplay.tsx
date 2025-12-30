import Markdown from "react-markdown"
import { Button, TabPanel, Tabs } from "@cmsgov/design-system";
import { ReactElement, useEffect, useState } from "react";
import { Note } from "./NoteDisplay";
import remarkGfm from "remark-gfm";

const tabContent = (obj: Note, copied: boolean, copyHandler: () => void): ReactElement => {
    return (
        <>
            <h3 className="ds-text-heading--lg">{obj.title}</h3>
            <Markdown remarkPlugins={[remarkGfm]} className="ds-content">{obj.content}</Markdown>
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
    const [copied, setCopied] = useState(false);
    const { note } = props;
    const [selectedTab, setSelectedTab] = useState(note.id)

    useEffect(() => {
        document.addEventListener('paste',() => {
            setCopied(false)
        })

        return () => {
            document.removeEventListener('paste', () => { setCopied(false) })
        }
    }, [])

    const copyContent = async (content: string): Promise<void> => {
        const type = "text/plain";
        const blob = new Blob([content], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);
    }

    const copyHandler = (): undefined => {
        setCopied(false);
        Promise.allSettled([copyContent(note.content)]).then((res)=>{
            if (res[0].status === 'fulfilled') {
                setCopied(true)
            } else {
                setCopied(false)
            }
        })
    }

    return (
        <>
            {note
                ? (
                    <Tabs selectedId={selectedTab}
                    onChange={(newId) => {
                        setSelectedTab(newId)
                    }}>
                        <TabPanel
                            key={note.id}
                            id={note.id}
                            tab={"Latest Version"}
                        >
                            {tabContent(note, copied, copyHandler)}
                        </TabPanel>
                        {note.prevVersions.map(
                            (version: Note, index: number) => {
                                return (
                                    <TabPanel
                                        key={version.id + index}
                                        id={`${index}`}
                                        tab={`Version ${index + 1}`}
                                    >
                                    {tabContent(version, copied, copyHandler)}
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
