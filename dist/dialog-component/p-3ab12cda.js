import{e as o,w as s}from"./p-66a8649d.js";import{a as t,s as r}from"./p-09c49e1c.js";import{c as a}from"./p-22318485.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const n=()=>{const n=window;n.addEventListener("statusTap",(()=>{o((()=>{const o=n.innerWidth;const c=n.innerHeight;const e=document.elementFromPoint(o/2,c/2);if(!e){return}const i=t(e);if(i){new Promise((o=>a(i,o))).then((()=>{s((async()=>{i.style.setProperty("--overflow","hidden");await r(i,300);i.style.removeProperty("--overflow")}))}))}}))}))};export{n as startStatusTap};
//# sourceMappingURL=p-3ab12cda.js.map