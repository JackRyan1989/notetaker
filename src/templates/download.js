export default function downloadButton(props) {
    if (!props) {
        return `<button class="downloadButton disabled" aria-disabled="true">Download Notes</button>`
    }
    return `<button id="download" class="downloadButton">Download Notes</button>`
}