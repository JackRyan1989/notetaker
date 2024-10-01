import Markdown from "react-markdown"
import NotesContext from "./NotesContext";
import { ReactElement, useContext } from "react"

export default function MarkdownPreview(): ReactElement {
    const {
        title,
        content,
        } = useContext(NotesContext);

    const separator = `---`

    return (
        <div className="ds-l-lg-col ds-u-border--1 ds-u-margin--2">
            <Markdown allowedElements={['h1']} className="ds-text-heading--2xl">{`# ${title || 'Type something!'}`}</Markdown>
            <Markdown className="ds-u-margin-bottom--1">{separator}</Markdown>
            <Markdown className="ds-content">{content}</Markdown>
        </div>
    )
}
