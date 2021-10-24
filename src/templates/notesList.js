import dayjs from "dayjs";

export default function notesList(props) {
    if (props.length === 0) {
      return `<p>No notes yet! Write something.</p>`;
    }
    return `<div class="notesWrapper">
      ${props.reverse().map(function(prop, index) {
        return `<div class="verticalHolder" id="${index}"><p class="vert">${prop.title} ${dayjs(prop.timestamp).format('MM/DD/YYYY')}</p>
        <div class="hidden" id=${index}><p class="content">${prop.content}</p> <div id="delBtnHolder"><button id=${prop.id} class="deleteButton">Delete Note</button></div></div>
        </div>`
      }).join('')}
    </div>`;
  }