export default function newButton(props) {
    if (!props) {
        return `<button class="newButton disabled" aria-disabled="true">New Note</button>`
    }
    return `<button id="new" class="newButton">New Note</button>`
}