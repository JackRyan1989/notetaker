export default function saveButton(props) {
    if (!props) {
        return `<button class="saveButton disabled" aria-disabled="true">Save Note</button>`
    }
    return `<button id="save" class="saveButton">Save Note</button>`
}