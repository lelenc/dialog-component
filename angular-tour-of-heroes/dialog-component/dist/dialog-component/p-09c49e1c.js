import{c as o}from"./p-22318485.js";import{b as t}from"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const s="ION-CONTENT";const n="ion-content";const r=".ion-content-scroll-host";const e=`${n}, ${r}`;const c=o=>o.tagName===s;const a=async t=>{if(c(t)){await new Promise((s=>o(t,s)));return t.getScrollElement()}return t};const i=o=>{const t=o.querySelector(r);if(t){return t}return o.querySelector(e)};const f=o=>o.closest(e);const u=(o,t)=>{if(c(o)){const s=o;return s.scrollToTop(t)}return Promise.resolve(o.scrollTo({top:0,left:0,behavior:t>0?"smooth":"auto"}))};const l=(o,t,s,n)=>{if(c(o)){const r=o;return r.scrollByPoint(t,s,n)}return Promise.resolve(o.scrollBy({top:s,left:t,behavior:n>0?"smooth":"auto"}))};const m=o=>t(o,n);const p=o=>{if(c(o)){const t=o;const s=t.scrollY;t.scrollY=false;return s}else{o.style.setProperty("overflow","hidden");return true}};const h=(o,t)=>{if(c(o)){o.scrollY=t}else{o.style.removeProperty("overflow")}};export{r as I,f as a,n as b,l as c,p as d,i as f,a as g,c as i,m as p,h as r,u as s};
//# sourceMappingURL=p-09c49e1c.js.map