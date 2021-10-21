export default function mainContentBox(props) {
  if (!props) {
    return `<p>No data supplied.</p>`;
  }
  return `<label for="mainContent">Notes</label> <textarea id="mainContent" name="mainContent" rows="20" cols="100" value=${props.content} placeholder="Notes">${props.content}</textarea>`;
}
