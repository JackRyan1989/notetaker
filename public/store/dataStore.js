// Initialize the state as an empty object:
// The state will contain two objects:
// Note object - with the following properties:
// id - int
// time stamp - Date.now()
// title - str
// content - str
// Notes object:  
// notes - array of [note1, note2, ... noten]
// UI object: forthcoming 

let note = {
    id: null,
    timeStamp: null,
    title: "",
    content: ""
}
let notes = [];

function handler(instance) {
    return {
        get: function(obj, prop) {
            console.log('get');
            // Because proxies only work for the top level of the object called on, we need to call proxies on every nested object and array
            if (['object Object', 'object Array'].includes(Object.prototype.toString.call(obj[prop]))) {
                return new Proxy(obj[prop], handler())
            }
            // If the proxy is not an object or array, then grabbing it from the top level is fine:
            return obj[prop];
        }, 
        set: function(obj, prop, value) {
            obj[prop] = value;
            console.log('set', obj, prop, value);
            return true;
        },
        deleteProperty: function(obj, prop) {
            console.log('delete', obj, prop, obj[prop]);
            delete obj[prop];
            return true;
        }
    }
}

let noteData = new Proxy(note, handler());