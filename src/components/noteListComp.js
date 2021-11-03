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
      instance.render();
      return true;
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop];
      instance.render();
      return true;
    },
  };
}

class NoteList {
  constructor(selector, data, template, dataFn, ds, comp) {
    this.elem = document.querySelector(selector);
    this.data = new Proxy(data, handler(this));
    this.edit = false;
    this.item = null;
    this.template = template.template;
    this.addOpenListener = function () {
      const editButton = Array.from(
        document.getElementsByClassName("editButton")
      );
      const delButton = Array.from(
        document.getElementsByClassName("deleteButton")
      );
      const content = Array.from(
        document.getElementsByClassName("verticalHolder")
      );
      content.forEach((node) => {
        node.addEventListener("click", () => {
          if (
            (node.id === node.childNodes[2].id) &&
            (node.childNodes[2].getAttribute("data-closed") === 'true')
          ) {
            node.childNodes[2].setAttribute("class", "shown");
            node.childNodes[2].setAttribute("data-closed", 'false');
          } else if (
            (node.id === node.childNodes[2].id) &&
            (node.childNodes[2].getAttribute("data-closed") === 'false')
          ) {
            node.childNodes[2].setAttribute("class", "hidden");
            node.childNodes[2].setAttribute("data-closed", 'true');
          }
        });
      });
      delButton.forEach((button) => {
        button.addEventListener("click", () => {
          ds.deleteNote(button.id);
          this.render();
        });
      });
      editButton.forEach((button)=>{
        button.addEventListener("click", ()=> {
        this.item = this.data.find(element => element.id.toString() === button.id);
        console.log(this.item);
        comp[0].render(this.item); 
        comp[1].render(this.item);
        this.edit = true;
        })
      })
    };
    this.render = async function () {
      this.data = await dataFn();
      this.elem.innerHTML = this.template(this.data);
      this.addOpenListener();
    };
  }
}

export default NoteList;
