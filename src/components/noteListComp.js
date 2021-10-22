function handler(instance) {
    return {
        get: function(obj, prop) {
            // Because proxies only work for the top level of the object called on, we need to call proxies on every nested object and array
            if (['object Object', 'object Array'].includes(Object.prototype.toString.call(obj[prop]))) {
                return new Proxy(obj[prop], handler(instance))
            }
            // If the proxy is not an object or array, then grabbing it from the top level is fine:
            return obj[prop];
        }, 
        set: function(obj, prop, value) {
            obj[prop] = value;
            instance.render();
            return true;
        },
        deleteProperty: function(obj, prop) {
            delete obj[prop];
            instance.render();
            return true;
        }
    }
}


class NoteList {
    constructor(selector, ds, template) {
        return (async()=> {
            this.elem = document.querySelector(selector);    
            //Call the data from the store:
            this.rawData = await ds.getItems();
            // Put it into state:
            this.data = new Proxy(this.rawData, handler(this));
            this.template = template.template;
            this.render = function() {
                this.elem.innerHTML = this.template(this.data);
            }

            return this;
        })();
    }
}

export default NoteList;