export default function newButton(props) {
    if (!props) {
        return `<button aria-disabled="true">New Note</button>`
    }
    return `<button class="newButton">New Note</button>`
}