(()=>{function r(n){return{get:function(e,t){return["object Object","object Array"].includes(Object.prototype.toString.call(e[t]))?new Proxy(e[t],r(n)):e[t]},set:function(e,t,i){return e[t]=i,!0},deleteProperty:function(e,t){return delete e[t],n.render(),!0}}}var a=class{constructor(e,t,i){this.elem=document.querySelector(e),this.data=new Proxy(t.data,r(this)),this.template=t.template,this.render=function(){this.elem.innerHTML=this.template(this.data)},this.onClick=function(c){c.target.id==="save"&&i.addItem(this.data.note.id,this.data.note)},this.elem.addEventListener("click",this.onClick.bind(this))}},d=a;})();
//# sourceMappingURL=button.js.map