import{g as t,a as n,c as o}from"./p-b238ac1f.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
class e{constructor(){this.m=new Map}reset(t){this.m=new Map(Object.entries(t))}get(t,n){const o=this.m.get(t);return o!==undefined?o:n}getBoolean(t,n=false){const o=this.m.get(t);if(o===undefined){return n}if(typeof o==="string"){return o==="true"}return!!o}getNumber(t,n){const o=parseFloat(this.m.get(t));return isNaN(o)?n!==undefined?n:NaN:o}set(t,n){this.m.set(t,n)}}const s=new e;const i=t=>{try{const n=t.sessionStorage.getItem(u);return n!==null?JSON.parse(n):{}}catch(t){return{}}};const c=(t,n)=>{try{t.sessionStorage.setItem(u,JSON.stringify(n))}catch(t){return}};const r=t=>{const n={};t.location.search.slice(1).split("&").map((t=>t.split("="))).map((([t,n])=>[decodeURIComponent(t),decodeURIComponent(n)])).filter((([t])=>d(t,a))).map((([t,n])=>[t.slice(a.length),n])).forEach((([t,o])=>{n[t]=o}));return n};const d=(t,n)=>t.substr(0,n.length)===n;const a="ionic:";const u="ionic-persist-config";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const f=t=>p(t);const l=(t,n)=>{if(typeof t==="string"){n=t;t=undefined}return f(t).includes(n)};const p=(t=window)=>{if(typeof t==="undefined"){return[]}t.Ionic=t.Ionic||{};let n=t.Ionic.platforms;if(n==null){n=t.Ionic.platforms=m(t);n.forEach((n=>t.document.documentElement.classList.add(`plt-${n}`)))}return n};const m=t=>{const n=s.get("platform");return Object.keys(S).filter((o=>{const e=n===null||n===void 0?void 0:n[o];return typeof e==="function"?e(t):S[o](t)}))};const h=t=>N(t)&&!C(t);const b=t=>{if(J(t,/iPad/i)){return true}if(J(t,/Macintosh/i)&&N(t)){return true}return false};const v=t=>J(t,/iPhone/i);const w=t=>J(t,/iPhone|iPod/i)||b(t);const g=t=>J(t,/android|sink/i);const y=t=>g(t)&&!J(t,/mobile/i);const O=t=>{const n=t.innerWidth;const o=t.innerHeight;const e=Math.min(n,o);const s=Math.max(n,o);return e>390&&e<520&&s>620&&s<800};const j=t=>{const n=t.innerWidth;const o=t.innerHeight;const e=Math.min(n,o);const s=Math.max(n,o);return b(t)||y(t)||e>460&&e<820&&s>780&&s<1400};const N=t=>R(t,"(any-pointer:coarse)");const M=t=>!N(t);const C=t=>I(t)||P(t);const I=t=>!!(t["cordova"]||t["phonegap"]||t["PhoneGap"]);const P=t=>{const n=t["Capacitor"];return!!(n===null||n===void 0?void 0:n.isNative)};const k=t=>J(t,/electron/i);const x=t=>{var n;return!!(((n=t.matchMedia)===null||n===void 0?void 0:n.call(t,"(display-mode: standalone)").matches)||t.navigator.standalone)};const J=(t,n)=>n.test(t.navigator.userAgent);const R=(t,n)=>{var o;return(o=t.matchMedia)===null||o===void 0?void 0:o.call(t,n).matches};const S={ipad:b,iphone:v,ios:w,android:g,phablet:O,tablet:j,cordova:I,capacitor:P,electron:k,pwa:x,mobile:N,mobileweb:h,desktop:M,hybrid:C};let U;const B=n=>n&&t(n)||U;const F=(t={})=>{if(typeof window==="undefined"){return}const e=window.document;const d=window;const a=d.Ionic=d.Ionic||{};const u={};if(t._ael){u.ael=t._ael}if(t._rel){u.rel=t._rel}if(t._ce){u.ce=t._ce}n(u);const f=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},i(d)),{persistConfig:false}),a.config),r(d)),t);s.reset(f);if(s.getBoolean("persistConfig")){c(d,f)}p(d);a.config=s;a.mode=U=s.get("mode",e.documentElement.getAttribute("mode")||(l(d,"ios")?"ios":"md"));s.set("mode",U);e.documentElement.setAttribute("mode",U);e.documentElement.classList.add(U);if(s.getBoolean("_testing")){s.set("animated",false)}const m=t=>{var n;return(n=t.tagName)===null||n===void 0?void 0:n.startsWith("ION-")};const h=t=>["ios","md"].includes(t);o((t=>{while(t){const n=t.mode||t.getAttribute("mode");if(n){if(h(n)){return n}else if(m(t)){console.warn('Invalid ionic mode: "'+n+'", expected: "ios" or "md"')}}t=t.parentElement}return U}))};export{l as a,s as c,B as g,F as i};
//# sourceMappingURL=p-59a10c97.js.map