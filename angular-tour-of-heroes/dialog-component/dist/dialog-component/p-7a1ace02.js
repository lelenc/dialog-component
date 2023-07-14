import{g as n,c as e}from"./p-59a10c97.js";import{C as t}from"./p-edd32bb2.js";import{OVERLAY_BACK_BUTTON_PRIORITY as o}from"./p-add30d46.js";import{c as i,f as s,d as r,j as d,g as a}from"./p-62625646.js";import{p as c}from"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */let l=0;let u=0;const f=new WeakMap;const p=n=>({create(e){return y(n,e)},dismiss(e,t,o){return D(document,e,t,n,o)},async getTop(){return A(document,n)}});const m=p("ion-alert");const v=p("ion-action-sheet");const h=p("ion-popover");const b=n=>{if(typeof document!=="undefined"){C(document)}const e=l++;n.overlayIndex=e};const w=n=>{if(!n.hasAttribute("id")){n.id=`ion-overlay-${++u}`}return n.id};const y=(n,e)=>{if(typeof window!=="undefined"&&typeof window.customElements!=="undefined"){return window.customElements.whenDefined(n).then((()=>{const t=document.createElement(n);t.classList.add("overlay-hidden");Object.assign(t,Object.assign(Object.assign({},e),{hasController:true}));G(document).appendChild(t);return new Promise((n=>i(t,n)))}))}return Promise.resolve()};const g='[tabindex]:not([tabindex^="-"]):not([hidden]):not([disabled]), input:not([type=hidden]):not([tabindex^="-"]):not([hidden]):not([disabled]), textarea:not([tabindex^="-"]):not([hidden]):not([disabled]), button:not([tabindex^="-"]):not([hidden]):not([disabled]), select:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable[disabled="false"]:not([tabindex^="-"]):not([hidden])';const k=(n,e)=>{let t=n.querySelector(g);const o=t===null||t===void 0?void 0:t.shadowRoot;if(o){t=o.querySelector(g)||t}if(t){s(t)}else{e.focus()}};const x=n=>n.classList.contains("overlay-hidden");const j=(n,e)=>{const t=Array.from(n.querySelectorAll(g));let o=t.length>0?t[t.length-1]:null;const i=o===null||o===void 0?void 0:o.shadowRoot;if(i){o=i.querySelector(g)||o}if(o){o.focus()}else{e.focus()}};const O=(n,e)=>{const t=A(e,"ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover");const o=n.target;if(!t||!o){return}if(t.classList.contains("ion-disable-focus-trap")){return}const i=()=>{if(t===o){t.lastFocus=undefined}else{const n=a(t);if(!n.contains(o)){return}const i=n.querySelector(".ion-overlay-wrapper");if(!i){return}if(i.contains(o)){t.lastFocus=o}else{const n=t.lastFocus;k(i,t);if(n===e.activeElement){j(i,t)}t.lastFocus=e.activeElement}}};const s=()=>{if(t.contains(o)){t.lastFocus=o}else{const n=t.lastFocus;k(t,t);if(n===e.activeElement){j(t,t)}t.lastFocus=e.activeElement}};if(t.shadowRoot){s()}else{i()}};const C=n=>{if(l===0){l=1;n.addEventListener("focus",(e=>{O(e,n)}),true);n.addEventListener("ionBackButton",(e=>{const t=A(n);if(t===null||t===void 0?void 0:t.backdropDismiss){e.detail.register(o,(()=>t.dismiss(undefined,N)))}}));n.addEventListener("keydown",(e=>{if(e.key==="Escape"){const e=A(n);if(e===null||e===void 0?void 0:e.backdropDismiss){e.dismiss(undefined,N)}}}))}};const D=(n,e,t,o,i)=>{const s=A(n,o,i);if(!s){return Promise.reject("overlay does not exist")}return s.dismiss(e,t)};const T=(n,e)=>{if(e===undefined){e="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"}return Array.from(n.querySelectorAll(e)).filter((n=>n.overlayIndex>0))};const A=(n,e,t)=>{const o=T(n,e).filter((n=>!x(n)));return t===undefined?o[o.length-1]:o.find((n=>n.id===t))};const P=(n=false)=>{const e=G(document);const t=e.querySelector("ion-router-outlet, ion-nav, #ion-view-container-root");if(!t){return}if(n){t.setAttribute("aria-hidden","true")}else{t.removeAttribute("aria-hidden")}};const B=async(t,o,i,s,r)=>{var d,a;if(t.presented){return}P(true);t.presented=true;t.willPresent.emit();(d=t.willPresentShorthand)===null||d===void 0?void 0:d.emit();const c=n(t);const l=t.enterAnimation?t.enterAnimation:e.get(o,c==="ios"?i:s);const u=await I(t,l,t.el,r);if(u){t.didPresent.emit();(a=t.didPresentShorthand)===null||a===void 0?void 0:a.emit()}if(t.el.tagName!=="ION-TOAST"){M(t.el)}if(t.keyboardClose&&(document.activeElement===null||!t.el.contains(document.activeElement))){t.el.focus()}};const M=async n=>{let e=document.activeElement;if(!e){return}const t=e===null||e===void 0?void 0:e.shadowRoot;if(t){e=t.querySelector(g)||e}await n.onDidDismiss();e.focus()};const E=async(t,o,i,s,r,d,a)=>{var c,l;if(!t.presented){return false}P(false);t.presented=false;try{t.el.style.setProperty("pointer-events","none");t.willDismiss.emit({data:o,role:i});(c=t.willDismissShorthand)===null||c===void 0?void 0:c.emit({data:o,role:i});const u=n(t);const p=t.leaveAnimation?t.leaveAnimation:e.get(s,u==="ios"?r:d);if(i!==S){await I(t,p,t.el,a)}t.didDismiss.emit({data:o,role:i});(l=t.didDismissShorthand)===null||l===void 0?void 0:l.emit({data:o,role:i});f.delete(t);t.el.classList.add("overlay-hidden");t.el.style.removeProperty("pointer-events");if(t.el.lastFocus!==undefined){t.el.lastFocus=undefined}}catch(n){console.error(n)}t.el.remove();return true};const G=n=>n.querySelector("ion-app")||n.body;const I=async(n,t,o,i)=>{o.classList.remove("overlay-hidden");const s=n.el;const r=t(s,i);if(!n.animated||!e.getBoolean("animated",true)){r.duration(0)}if(n.keyboardClose){r.beforeAddWrite((()=>{const n=o.ownerDocument.activeElement;if(n===null||n===void 0?void 0:n.matches("input,ion-input, ion-textarea")){n.blur()}}))}const d=f.get(n)||[];f.set(n,[...d,r]);await r.play();return true};const L=(n,e)=>{let t;const o=new Promise((n=>t=n));V(n,e,(n=>{t(n.detail)}));return o};const V=(n,e,t)=>{const o=i=>{d(n,e,o);t(i)};r(n,e,o)};const $=n=>n==="cancel"||n===N;const z=n=>n();const F=(n,t)=>{if(typeof n==="function"){const o=e.get("_zoneGate",z);return o((()=>{try{return n(t)}catch(n){throw n}}))}return undefined};const N="backdrop";const S="gesture";const W=n=>{let e=false;let o;const i=t();const s=(t=false)=>{if(o&&!t){return{delegate:o,inline:e}}const{el:s,hasController:r,delegate:d}=n;const a=s.parentNode;e=a!==null&&!r;o=e?d||i:d;return{inline:e,delegate:o}};const r=async e=>{const{delegate:t}=s(true);if(t){return await t.attachViewToDom(n.el,e)}const{hasController:o}=n;if(o&&e!==undefined){throw new Error("framework delegate is missing")}return null};const d=()=>{const{delegate:e}=s();if(e&&n.el!==undefined){e.removeViewFromDom(n.el.parentElement,n.el)}};return{attachViewToDom:r,removeViewFromDom:d}};const _=()=>{let n;const e=()=>{if(n){n();n=undefined}};const t=(t,o)=>{e();const i=o!==undefined?document.getElementById(o):null;if(!i){c(`A trigger element with the ID "${o}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on an overlay component.`,t);return}const s=(n,e)=>{const t=()=>{e.present()};n.addEventListener("click",t);return()=>{n.removeEventListener("click",t)}};n=s(i,t)};return{addClickListener:t,removeClickListener:e}};export{N as B,S as G,B as a,h as b,W as c,E as d,L as e,k as f,_ as g,A as h,f as i,$ as j,F as k,v as l,m,b as p,w as s};
//# sourceMappingURL=p-7a1ace02.js.map