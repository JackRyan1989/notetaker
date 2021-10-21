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
            return true;
        },
        deleteProperty: function(obj, prop) {
            delete obj[prop];
            instance.render();
            return true;
        }
    }
}


class Component {
    constructor(selector, opts) {
        this.elem = document.querySelector(selector);
        this.data = new Proxy(opts.data, handler(this));
        this.template = opts.template;
        this.render = function() {
            this.elem.innerHTML = this.template(this.data);
        }
        this.onInput = function(e) {
            let {id, value} = e.target;
            if (this.data.id === null) {
                this.data.id = 1;
            } 
            if (id === "title") {
                this.data.title = value;
                this.data.timeStamp = Date.now();
            }
            if (id === "mainContent") {
                this.data.content = value;
            }
        }
        this.elem.addEventListener('input', this.onInput.bind(this));
    }
}

export default Component;