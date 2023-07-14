import{e,w as o,r as t,h as n,H as s,i}from"./p-66a8649d.js";import{g as a}from"./p-3184ff59.js";import{g as r,f as l,p as c}from"./p-09c49e1c.js";import{h as d,i as h}from"./p-22318485.js";import{h as p}from"./p-0e4de1d0.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const b="all 0.2s ease-in-out";const u=e=>{const o=document.querySelector(`${e}.ion-cloned-element`);if(o!==null){return o}const t=document.createElement(e);t.classList.add("ion-cloned-element");t.style.setProperty("display","none");document.body.appendChild(t);return t};const f=e=>{if(!e){return}const o=e.querySelectorAll("ion-toolbar");return{el:e,toolbars:Array.from(o).map((e=>{const o=e.querySelector("ion-title");return{el:e,background:e.shadowRoot.querySelector(".toolbar-background"),ionTitleEl:o,innerTitleEl:o?o.shadowRoot.querySelector(".toolbar-title"):null,ionButtonsEl:Array.from(e.querySelectorAll("ion-buttons"))}}))}};const m=(t,n,s)=>{e((()=>{const e=t.scrollTop;const i=d(1,1+-e/500,1.1);const a=s.querySelector("ion-refresher.refresher-native");if(a===null){o((()=>{k(n.toolbars,i)}))}}))};const y=(e,o)=>{if(e.collapse==="fade"){return}if(o===undefined){e.style.removeProperty("--opacity-scale")}else{e.style.setProperty("--opacity-scale",o.toString())}};const g=(e,o,t)=>{if(!e[0].isIntersecting){return}const n=e[0].intersectionRatio>.9||t<=0?0:(1-e[0].intersectionRatio)*100/75;y(o.el,n===1?undefined:n)};const x=(e,t,n,s)=>{o((()=>{const o=s.scrollTop;g(e,t,o);const i=e[0];const a=i.intersectionRect;const r=a.width*a.height;const l=i.rootBounds.width*i.rootBounds.height;const c=r===0&&l===0;const d=Math.abs(a.left-i.boundingClientRect.left);const h=Math.abs(a.right-i.boundingClientRect.right);const p=r>0&&(d>=5||h>=5);if(c||p){return}if(i.isIntersecting){v(t,false);v(n)}else{const e=a.x===0&&a.y===0||a.width!==0&&a.height!==0;if(e&&o>0){v(t);v(n,false);y(t.el)}}}))};const v=(e,o=true)=>{const t=e.el;if(o){t.classList.remove("header-collapse-condense-inactive");t.removeAttribute("aria-hidden")}else{t.classList.add("header-collapse-condense-inactive");t.setAttribute("aria-hidden","true")}};const k=(e=[],o=1,t=false)=>{e.forEach((e=>{const n=e.ionTitleEl;const s=e.innerTitleEl;if(!n||n.size!=="large"){return}s.style.transition=t?b:"";s.style.transform=`scale3d(${o}, ${o}, 1)`}))};const w=(t,n,s)=>{e((()=>{const e=t.scrollTop;const i=n.clientHeight;const a=s?s.clientHeight:0;if(s!==null&&e<a){n.style.setProperty("--opacity-scale","0");t.style.setProperty("clip-path",`inset(${i}px 0px 0px 0px)`);return}const r=e-a;const l=10;const c=d(0,r/l,1);o((()=>{t.style.removeProperty("clip-path");n.style.setProperty("--opacity-scale",c.toString())}))}))};const j="ion-header{display:block;position:relative;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-ios ion-toolbar:last-of-type{--border-width:0 0 0.55px}@supports (backdrop-filter: blur(0)){.header-background{left:0;right:0;top:0;bottom:0;position:absolute;backdrop-filter:saturate(180%) blur(20px)}.header-translucent-ios ion-toolbar{--opacity:.8}.header-collapse-condense-inactive .header-background{backdrop-filter:blur(20px)}}.header-ios.ion-no-border ion-toolbar:last-of-type{--border-width:0}.header-collapse-fade ion-toolbar{--opacity-scale:inherit}.header-collapse-condense{z-index:9}.header-collapse-condense ion-toolbar{position:sticky;top:0}.header-collapse-condense ion-toolbar:first-of-type{padding-top:7px;z-index:1}.header-collapse-condense ion-toolbar{--background:var(--ion-background-color, #fff);z-index:0}.header-collapse-condense ion-toolbar:last-of-type{--border-width:0px}.header-collapse-condense ion-toolbar ion-searchbar{height:48px;padding-top:0px;padding-bottom:13px}.header-collapse-main{--opacity-scale:1}.header-collapse-main ion-toolbar{--opacity-scale:inherit}.header-collapse-main ion-toolbar.in-toolbar ion-title,.header-collapse-main ion-toolbar.in-toolbar ion-buttons{transition:all 0.2s ease-in-out}.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-buttons.buttons-collapse{opacity:0;pointer-events:none}.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-buttons.buttons-collapse{visibility:hidden}";const $="ion-header{display:block;position:relative;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-md{box-shadow:0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)}.header-collapse-condense{display:none}.header-md.ion-no-border{box-shadow:none}";const z=class{constructor(e){t(this,e);this.inheritedAttributes={};this.setupFadeHeader=async(e,o)=>{const t=this.scrollEl=await r(e);this.contentScrollCallback=()=>{w(this.scrollEl,this.el,o)};t.addEventListener("scroll",this.contentScrollCallback);w(this.scrollEl,this.el,o)};this.collapse=undefined;this.translucent=false}componentWillLoad(){this.inheritedAttributes=h(this.el)}componentDidLoad(){this.checkCollapsibleHeader()}componentDidUpdate(){this.checkCollapsibleHeader()}disconnectedCallback(){this.destroyCollapsibleHeader()}async checkCollapsibleHeader(){const e=a(this);if(e!=="ios"){return}const{collapse:t}=this;const n=t==="condense";const s=t==="fade";this.destroyCollapsibleHeader();if(n){const e=this.el.closest("ion-app,ion-page,.ion-page,page-inner");const t=e?l(e):null;o((()=>{const e=u("ion-title");e.size="large";u("ion-back-button")}));await this.setupCondenseHeader(t,e)}else if(s){const e=this.el.closest("ion-app,ion-page,.ion-page,page-inner");const o=e?l(e):null;if(!o){c(this.el);return}const t=o.querySelector('ion-header[collapse="condense"]');await this.setupFadeHeader(o,t)}}destroyCollapsibleHeader(){if(this.intersectionObserver){this.intersectionObserver.disconnect();this.intersectionObserver=undefined}if(this.scrollEl&&this.contentScrollCallback){this.scrollEl.removeEventListener("scroll",this.contentScrollCallback);this.contentScrollCallback=undefined}if(this.collapsibleMainHeader){this.collapsibleMainHeader.classList.remove("header-collapse-main");this.collapsibleMainHeader=undefined}}async setupCondenseHeader(e,t){if(!e||!t){c(this.el);return}if(typeof IntersectionObserver==="undefined"){return}this.scrollEl=await r(e);const n=t.querySelectorAll("ion-header");this.collapsibleMainHeader=Array.from(n).find((e=>e.collapse!=="condense"));if(!this.collapsibleMainHeader){return}const s=f(this.collapsibleMainHeader);const i=f(this.el);if(!s||!i){return}v(s,false);y(s.el,0);const a=e=>{x(e,s,i,this.scrollEl)};this.intersectionObserver=new IntersectionObserver(a,{root:e,threshold:[.25,.3,.4,.5,.6,.7,.8,.9,1]});this.intersectionObserver.observe(i.toolbars[i.toolbars.length-1].el);this.contentScrollCallback=()=>{m(this.scrollEl,i,e)};this.scrollEl.addEventListener("scroll",this.contentScrollCallback);o((()=>{if(this.collapsibleMainHeader!==undefined){this.collapsibleMainHeader.classList.add("header-collapse-main")}}))}render(){const{translucent:e,inheritedAttributes:o}=this;const t=a(this);const i=this.collapse||"none";const r=p("ion-menu",this.el)?"none":"banner";return n(s,Object.assign({role:r,class:{[t]:true,[`header-${t}`]:true,[`header-translucent`]:this.translucent,[`header-collapse-${i}`]:true,[`header-translucent-${t}`]:this.translucent}},o),t==="ios"&&e&&n("div",{class:"header-background"}),n("slot",null))}get el(){return i(this)}};z.style={ios:j,md:$};export{z as ion_header};
//# sourceMappingURL=p-c07ffc0f.entry.js.map