(()=>{function o(i){return{get:function(e,t){return["object Object","object Array"].includes(Object.prototype.toString.call(e[t]))?new Proxy(e[t],o(i)):e[t]},set:function(e,t,r){return e[t]=r,!0},deleteProperty:function(e,t){return delete e[t],i.render(),!0}}}var s=class{constructor(e,t,r,l,h,c){this.elem=document.querySelector(e),this.data=new Proxy(t.data,o(this)),this.template=t.template,this.render=function(){this.elem.innerHTML=this.template(this.data)},this.onClick=async function(a){if(a.target.id==="save"&&(r.addItem(this.data.note.id,this.data.note),l.render()),a.target.id==="new"){let n={id:null,timeStamp:null,title:"",content:""};l[0].render(n),l[1].render(n)}if(a.target.id==="download"){let n=await r.getItems();if(n.length===0)console.log("No notes!");else{let u=n.map(d=>`<h1>${d.title}</h1>
             <h2>${Date(d.timeStamp).toString()}</h2>
             <p>${d.content}</p>
             `).join(`
`),m=h.turndown(u),f=new Blob([m],{type:"text/markdown"});c(f,"mynotes.md")}}},this.elem.addEventListener("click",this.onClick.bind(this))}},w=s;})();
//# sourceMappingURL=button.js.map
