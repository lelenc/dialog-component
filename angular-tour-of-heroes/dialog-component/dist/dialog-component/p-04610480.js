import{MENU_BACK_BUTTON_PRIORITY as t}from"./p-add30d46.js";import{c as n}from"./p-22318485.js";import{g as s}from"./p-3184ff59.js";import{c as e}from"./p-f1f22152.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r=t=>e().duration(t?400:300);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=t=>{let n;let o;const a=t.width+8;const c=e();const i=e();if(t.isEndSide){n=a+"px";o="0px"}else{n=-a+"px";o="0px"}c.addElement(t.menuInnerEl).fromTo("transform",`translateX(${n})`,`translateX(${o})`);const f=s(t);const u=f==="ios";const l=u?.2:.25;i.addElement(t.backdropEl).fromTo("opacity",.01,l);return r(u).addAnimation([c,i])};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const a=t=>{let n;let o;const a=s(t);const c=t.width;if(t.isEndSide){n=-c+"px";o=c+"px"}else{n=c+"px";o=-c+"px"}const i=e().addElement(t.menuInnerEl).fromTo("transform",`translateX(${o})`,"translateX(0px)");const f=e().addElement(t.contentEl).fromTo("transform","translateX(0px)",`translateX(${n})`);const u=e().addElement(t.backdropEl).fromTo("opacity",.01,.32);return r(a==="ios").addAnimation([i,f,u])};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const c=t=>{const n=s(t);const o=t.width*(t.isEndSide?-1:1)+"px";const a=e().addElement(t.contentEl).fromTo("transform","translateX(0px)",`translateX(${o})`);return r(n==="ios").addAnimation(a)};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i=()=>{const s=new Map;const e=[];const r=async t=>{const n=await m(t);if(n){return n.open()}return false};const i=async t=>{const n=await(t!==undefined?m(t):w());if(n!==undefined){return n.close()}return false};const f=async t=>{const n=await m(t);if(n){return n.toggle()}return false};const u=async(t,n)=>{const s=await m(n);if(s){s.disabled=!t}return s};const l=async(t,n)=>{const s=await m(n);if(s){s.swipeGesture=t}return s};const p=async t=>{if(t!=null){const n=await m(t);return n!==undefined&&n.isOpen()}else{const t=await w();return t!==undefined}};const d=async t=>{const n=await m(t);if(n){return!n.disabled}return false};const m=async t=>{await h();if(t==="start"||t==="end"){const n=b((n=>n.side===t&&!n.disabled));if(n){return n}return b((n=>n.side===t))}else if(t!=null){return b((n=>n.menuId===t))}const n=b((t=>!t.disabled));if(n){return n}return e.length>0?e[0].el:undefined};const w=async()=>{await h();return O()};const y=async()=>{await h();return v()};const x=async()=>{await h();return M()};const g=(t,n)=>{s.set(t,n)};const X=t=>{if(e.indexOf(t)<0){if(!t.disabled){A(t)}e.push(t)}};const _=t=>{const n=e.indexOf(t);if(n>-1){e.splice(n,1)}};const A=t=>{const n=t.side;e.filter((s=>s.side===n&&s!==t)).forEach((t=>t.disabled=true))};const $=async(t,n,s)=>{if(M()){return false}if(n){const n=await w();if(n&&t.el!==n){await n.setOpen(false,false)}}return t._setOpen(n,s)};const j=(t,n)=>{const e=s.get(t);if(!e){throw new Error("animation not registered")}const r=e(n);return r};const O=()=>b((t=>t._isOpen));const v=()=>e.map((t=>t.el));const M=()=>e.some((t=>t.isAnimating));const b=t=>{const n=e.find(t);if(n!==undefined){return n.el}return undefined};const h=()=>Promise.all(Array.from(document.querySelectorAll("ion-menu")).map((t=>new Promise((s=>n(t,s))))));g("reveal",c);g("push",a);g("overlay",o);if(typeof document!=="undefined"){document.addEventListener("ionBackButton",(n=>{const s=O();if(s){n.detail.register(t,(()=>s.close()))}}))}return{registerAnimation:g,get:m,getMenus:y,getOpen:w,isEnabled:d,swipeGesture:l,isAnimating:x,isOpen:p,enable:u,toggle:f,close:i,open:r,_getOpenSync:O,_createAnimation:j,_register:X,_unregister:_,_setOpen:$,_setActiveMenu:A}};const f=i();export{f as m};
//# sourceMappingURL=p-04610480.js.map