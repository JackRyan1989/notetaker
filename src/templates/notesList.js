import dayjs from "dayjs";
import sanitizeMarkdown from '../functions/sanitizeMarkdown';

export default function notesList(props) {
  // Lets make an object from props to use to build out the front end
  // We're doing this so that the front end only has one listing for each year, and one listing for each month under that year.
  // If we mapped props directly, we'd end up with a year and a month for each prop, at least I think so?
  // Final form: {
  //  2021: [october, november],
  //  }
  let obj = {};
  //Initialize the year/month object:
  props.map((prop) => {
    let year = dayjs(prop.timestamp).format("YYYY");
    let month = dayjs(prop.timestamp).format("MMMM");
    if (!(year in Object.keys(obj))) {
      obj[year] = [];
    }
    if (!obj[year].includes(month)) {
      obj[year].push(month);
    }
  });
  if (props.length === 0) {
    return `<p>No notes yet! Write something.</p>`;
  }
  return `<div class="notesWrapper">
     <ul class="year">
      ${Object.keys(obj).map(function (year) {
        return `
          <li><span>${year}</span>
          <ul class="month">
            ${Object.values(obj[year]).map(function (month) {
              return `<li><span>${month}</span>
                <ul>
                  ${props
                    .map(function (prop) {
                      //Only display the notes if they belong in the year/month:
                      if (
                        dayjs(prop.timestamp).format("YYYY") === year &&
                        dayjs(prop.timestamp).format("MMMM") === month
                      ) {
                        return `<li><div class="verticalHolder" id="${prop.id}"><p class="vert">${prop.title}</p>
                    <div class="hidden" data-closed="true" id=${prop.id}><p class="content">${sanitizeMarkdown(prop.content)}</p> <div id="delBtnHolder"><button id=${prop.id} class="deleteButton">Delete Note</button></div><div id="editBtnHolder"><button id=${prop.id} class="editButton">Edit Note</button></div></div>
                    </div></li>`;
                      }
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
