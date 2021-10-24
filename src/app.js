// Imports:
// Components:
import Component from "./components/baseComp";
import Button from "./components/button";
import NoteList from "./components/noteListComp";

// Templates:
import mainContentBox from "./templates/mainContentBox";
import titleBox from "./templates/titleBox";
import saveButton from "./templates/saveButton";
import newButton from "./templates/newButton";
import notesList from "./templates/notesList";

//Data store:
import * as ds from "./dataStore/dataStore";

// Register the service worker:
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

// Our data:
let note = {
  id: null,
  timeStamp: null,
  title: "",
  content: "",
};
let notes = [];

async function getData() {
  let data = await ds.getItems()
  return data;
}

(async () => {
  let titleEntry = new Component("#titleEntryContainer", {
    data: note,
    template: titleBox,
  });
  let mainEntry = new Component("#noteEntryContainer", {
    data: note,
    template: mainContentBox,
  });
  let list = new NoteList("#notesListContainer", await getData(), {
    template: notesList}, getData, ds);
  let saveB = new Button(
    "#saveContainer",
    { data: { note, notes }, template: saveButton },
    ds, list
  );
  let newB = new Button(
    "#newContainer",
    { data: { note, notes }, template: newButton },
    ds, [titleEntry, mainEntry]
  );

  titleEntry.render();
  mainEntry.render();
  saveB.render();
  newB.render();
  list.render();
  list.addOpenListener();
})();