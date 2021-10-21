export default function saveButton(props) {
    if (!props) {
        return `<button aria-disabled="true">Save Note</button>`
    }
    return `<button class="saveButton">Save Note</button>`
}