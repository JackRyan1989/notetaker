function handler(instance) {
  return {
    get: function (obj, prop) {
      // Because proxies only work for the top level of the object called on, we need to call proxies on every nested object and array
      if (
        ["object Object", "object Array"].includes(
          Object.prototype.toString.call(obj[prop])
        )
      ) {
        return new Proxy(obj[prop], handler(instance));
      }
      // If the proxy is not an object or array, then grabbing it from the top level is fine:
      return obj[prop];
    },
    set: function (obj, prop, value) {
      obj[prop] = value;
      return true;
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop];
      instance.render();
      return true;
    },
  };
}

class Button {
  constructor(selector, opts, ds, comps, tds, saveAs) {
    this.elem = document.querySelector(selector);
    this.data = new Proxy(opts.data, handler(this));
    this.template = opts.template;
    this.render = function () {
      this.elem.innerHTML = this.template(this.data);
    };
    this.onClick = async function (e) {
      if (e.target.id === "save") {
        ds.addItem(this.data.note.id, this.data.note);
        comps.render();
      }
      if (e.target.id === "new") {
        let sendData = { id: null, timeStamp: null, title: "", content: "" };
        comps[0].render(sendData);
        comps[1].render(sendData);
      }
      if (e.target.id === "download") {
        let notes = await ds.getItems();
        if (notes.length === 0) {
          console.log('No notes!');
        } else {
          let html = notes.map((note)=>{
             return `<h1>${note.title}</h1>
             <h2>${Date(note.timeStamp).toString()}</h2>
             <p>${note.content}</p>
             `
          });
          let htmlstr = html.join("\n");
          let markdown = tds.turndown(htmlstr);
          let blob = new Blob([markdown], {type: 'text/markdown'});
          saveAs(blob, 'mynotes.md');
        }
      }
    };
    this.elem.addEventListener("click", this.onClick.bind(this));
  }
}

export default Button;
