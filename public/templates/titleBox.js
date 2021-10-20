export default function titleBox(props) {
  if (!props) {
    return `<p>No data supplied.</p>`;
  }
  return `<textarea id="title" rows="1" cols="50">Title</textarea>`;
}
