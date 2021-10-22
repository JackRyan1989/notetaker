export default function notesList(props) {
    if (props.length === 0) {
      return `<p>No data supplied.</p>`;
    }
    if (!props) {
        return `<p>Loading...</p>`;
    }
    return `${props}`;
  }