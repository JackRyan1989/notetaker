export default function mainContentBox(props) {
  if (!props) {
    return `<p>No data supplied.</p>`;
  }
  return `<textarea id="mainContent" rows="50" cols="100">Notes</textarea>`;
}
