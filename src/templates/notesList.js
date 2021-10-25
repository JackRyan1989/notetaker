import dayjs from "dayjs";

export default function notesList(props) {
  let years = Array.from(
    new Set(
      props.map(function (year) {
        return dayjs(year.timestamp).format("YYYY");
      })
    )
  );
  let months = Array.from(
    new Set(
      props.map(function (month) {
        return dayjs(month.timestamp).format("MMMM");
      })
    )
  );
  if (props.length === 0) {
    return `<p>No notes yet! Write something.</p>`;
  }
  return `<div class="notesWrapper">
     <ul class="year">
      ${years.map(function (year) {
        return `
          <li><span>${year}</span>
          <ul class="month">
            ${months.map(function (month) {
              return `<li><span>${month}</span>
                <ul>
                  ${props
                    .map(function (prop) {
                      return `<li><div class="verticalHolder" id="${prop.id}"><p class="vert">${prop.title}</p>
                    <div class="hidden" id=${prop.id}><p class="content">${prop.content}</p> <div id="delBtnHolder"><button id=${prop.id} class="deleteButton">Delete Note</button></div></div>
                    </div></li>`;
                    })
                    .join(" ")}
                </ul></li>`;
            })}
            </ul>
            </li>`;
      })}
      </ul>
     </div>`;
}
