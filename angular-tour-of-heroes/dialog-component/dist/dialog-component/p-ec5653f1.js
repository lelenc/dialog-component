import{f as o,w as s}from"./p-b238ac1f.js";import{a as t,s as r}from"./p-202ccf16.js";import{c as a}from"./p-62625646.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const c=()=>{const c=window;c.addEventListener("statusTap",(()=>{o((()=>{const o=c.innerWidth;const n=c.innerHeight;const f=document.elementFromPoint(o/2,n/2);if(!f){return}const i=t(f);if(i){new Promise((o=>a(i,o))).then((()=>{s((async()=>{i.style.setProperty("--overflow","hidden");await r(i,300);i.style.removeProperty("--overflow")}))}))}}))}))};export{c as startStatusTap};
//# sourceMappingURL=p-ec5653f1.js.map