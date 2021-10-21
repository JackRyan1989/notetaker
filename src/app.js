// Imports:
// Components:
import Component from "./components/baseComp";
import Button from "./components/button";
// Templates:
import mainContentBox from "./templates/mainContentBox";
import titleBox from "./templates/titleBox";
import saveButton from "./templates/saveButton";
import newButton from "./templates/newButton";
//Data store:
import * as ds from "./dataStore/dataStore";

// Register the service worker:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

// Our data:
let note = {
    id: null,
    timeStamp: null,
    title: "",
    content: ""
}
let notes = [];

let titleEntry  = new Component("#titleEntryContainer", {data: note, template: titleBox})
let mainEntry  = new Component("#noteEntryContainer", {data: note, template: mainContentBox}) 
let saveB = new Button("#saveContainer", {data: {note, notes}, template: saveButton}, ds);
let newB = new Button("#newContainer", {data: {note, notes}, template: newButton}, ds);


titleEntry.render();
mainEntry.render();
saveB.render();
newB.render();