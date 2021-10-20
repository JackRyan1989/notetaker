function handler(instance) {
    return {
        get: function(obj, prop) {
            console.log('get');
            // Because proxies only work for the top level of the object called on, we need to call proxies on every nested object and array
            if (['object Object', 'object Array'].includes(Object.prototype.toString.call(obj[prop]))) {
                return new Proxy(obj[prop], handler(instance))
            }
            // If the proxy is not an object or array, then grabbing it from the top level is fine:
            return obj[prop];
        }, 
        set: function(obj, prop, value) {
            obj[prop] = value;
            console.log('set', obj, prop, value);
            instance.render();
            return true;
        },
        deleteProperty: function(obj, prop) {
            console.log('delete', obj, prop, obj[prop]);
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
    }

    render() {
        let newElem = this.template(this.data);
        if (this.elem.innerHTML) {
            let temp = document.createElement('div');
            temp.innerHTML = newElem;
            this.elem.appendChild(temp);
        } else {
            this.elem.innerHTML = newElem;
        }
    }
}

export default Component;