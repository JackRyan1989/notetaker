export default function titleBox(props) {
  if (!props) {
    return `<p>No data supplied.</p>`;
  }
  return `<label for="mainContent">Title</label> <textarea id="title" name="title" rows="1" cols="50" value=${props.title} placeholder="Title">${props.title}</textarea>`;
}
