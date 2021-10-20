// Imports:
// Components:
import Component from "./components/baseComp";
// Templates:
import mainContentBox from "./templates/mainContentBox";
import titleBox from "./templates/titleBox";

// Register the service worker:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

let titleEntry  = new Component("#noteEntryContainer", {data:[0,1,2,3,4,5], template: titleBox})
let mainEntry  = new Component("#noteEntryContainer", {data:[0,1,2,3,4,5], template: mainContentBox}) 

titleEntry.render();
mainEntry.render();

