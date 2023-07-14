import{w as e,r,d as s,e as t,h as i,i as n,H as o}from"./p-66a8649d.js";import{a as h,g as f}from"./p-3184ff59.js";import{g as a}from"./p-2f802871.js";import{I as l,b as c,p,g}from"./p-09c49e1c.js";import{t as d,c as u,h as m,g as x,b as y}from"./p-22318485.js";import{h as v}from"./p-b29e1ab6.js";import{c as b}from"./p-f1f22152.js";import"./p-28e84784.js";import"./p-be7dc084.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const w=e=>{const r=e.previousElementSibling;const s=r!==null&&r.tagName==="ION-HEADER";return s?"translate":"scale"};const k=(e,r,s)=>e==="scale"?S(r,s):N(r,s);const j=e=>{const r=e.querySelector("ion-spinner");const s=r.shadowRoot.querySelector("circle");const t=e.querySelector(".spinner-arrow-container");const i=e.querySelector(".arrow-container");const n=i?i.querySelector("ion-icon"):null;const o=b().duration(1e3).easing("ease-out");const h=b().addElement(t).keyframes([{offset:0,opacity:"0.3"},{offset:.45,opacity:"0.3"},{offset:.55,opacity:"1"},{offset:1,opacity:"1"}]);const f=b().addElement(s).keyframes([{offset:0,strokeDasharray:"1px, 200px"},{offset:.2,strokeDasharray:"1px, 200px"},{offset:.55,strokeDasharray:"100px, 200px"},{offset:1,strokeDasharray:"100px, 200px"}]);const a=b().addElement(r).keyframes([{offset:0,transform:"rotate(-90deg)"},{offset:1,transform:"rotate(210deg)"}]);if(i&&n){const e=b().addElement(i).keyframes([{offset:0,transform:"rotate(0deg)"},{offset:.3,transform:"rotate(0deg)"},{offset:.55,transform:"rotate(280deg)"},{offset:1,transform:"rotate(400deg)"}]);const r=b().addElement(n).keyframes([{offset:0,transform:"translateX(2px) scale(0)"},{offset:.3,transform:"translateX(2px) scale(0)"},{offset:.55,transform:"translateX(-1.5px) scale(1)"},{offset:1,transform:"translateX(-1.5px) scale(1)"}]);o.addAnimation([e,r])}return o.addAnimation([h,f,a])};const S=(e,r)=>{const s=r.clientHeight;const t=b().addElement(e).keyframes([{offset:0,transform:`scale(0) translateY(-${s}px)`},{offset:1,transform:"scale(1) translateY(100px)"}]);return j(e).addAnimation([t])};const N=(e,r)=>{const s=r.clientHeight;const t=b().addElement(e).keyframes([{offset:0,transform:`translateY(-${s}px)`},{offset:1,transform:"translateY(100px)"}]);return j(e).addAnimation([t])};const Y=e=>b().duration(125).addElement(e).fromTo("transform","translateY(var(--ion-pulling-refresher-translate, 100px))","translateY(0px)");const z=(e,r)=>{e.style.setProperty("opacity",r.toString())};const P=(r,s,t)=>{const i=1;e((()=>{r.forEach(((e,r)=>{const n=r*(i/s);const o=i-n;const h=t-n;const f=m(0,h/o,1);e.style.setProperty("opacity",f.toString())}))}))};const R=(r,s)=>{e((()=>{r.style.setProperty("--refreshing-rotation-duration",s>=1?"0.5s":"2s");r.style.setProperty("opacity","1")}))};const $=(r,s,t=200)=>{if(!r){return Promise.resolve()}const i=d(r,t);e((()=>{r.style.setProperty("transition",`${t}ms all ease-out`);if(s===undefined){r.style.removeProperty("transform")}else{r.style.setProperty("transform",`translate3d(0px, ${s}, 0px)`)}}));return i};const E=async(e,r)=>{const s=e.querySelector("ion-refresher-content");if(!s){return Promise.resolve(false)}await new Promise((e=>u(s,e)));const t=e.querySelector("ion-refresher-content .refresher-pulling ion-spinner");const i=e.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");return t!==null&&i!==null&&(r==="ios"&&h("mobile")&&e.style.webkitOverflowScrolling!==undefined||r==="md")};const D="ion-refresher{top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}@supports (inset-inline-start: 0){ion-refresher{inset-inline-start:0}}@supports not (inset-inline-start: 0){ion-refresher{left:0}:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}[dir=rtl] ion-refresher{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){ion-refresher:dir(rtl){left:unset;right:unset;right:0}}}ion-refresher.refresher-active{display:block}ion-refresher-content{display:flex;flex-direction:column;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{transform-origin:center;transition:200ms;font-size:30px;text-align:center}:host-context([dir=rtl]) .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{transform-origin:calc(100% - center)}[dir=rtl] .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon{transform-origin:calc(100% - center)}@supports selector(:dir(rtl)){.refresher-pulling-icon:dir(rtl),.refresher-refreshing-icon:dir(rtl){transform-origin:calc(100% - center)}}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line,.refresher-ios .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0}.refresher-native .refresher-refreshing ion-spinner{--refreshing-rotation-duration:2s;display:none;animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards}.refresher-native .refresher-refreshing{display:none;animation:250ms linear refresher-pop forwards}.refresher-native ion-spinner{width:32px;height:32px;color:var(--ion-color-step-450, #747577)}.refresher-native.refresher-refreshing .refresher-pulling ion-spinner,.refresher-native.refresher-completing .refresher-pulling ion-spinner{display:none}.refresher-native.refresher-refreshing .refresher-refreshing ion-spinner,.refresher-native.refresher-completing .refresher-refreshing ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-pulling ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-refreshing ion-spinner{display:none}.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0) rotate(180deg);transition:300ms}@keyframes refresher-pop{0%{transform:scale(1);animation-timing-function:ease-in}50%{transform:scale(1.2);animation-timing-function:ease-out}100%{transform:scale(1)}}@keyframes refresher-rotate{from{transform:rotate(0deg)}to{transform:rotate(180deg)}}";const M="ion-refresher{top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}@supports (inset-inline-start: 0){ion-refresher{inset-inline-start:0}}@supports not (inset-inline-start: 0){ion-refresher{left:0}:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}[dir=rtl] ion-refresher{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){ion-refresher:dir(rtl){left:unset;right:unset;right:0}}}ion-refresher.refresher-active{display:block}ion-refresher-content{display:flex;flex-direction:column;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{transform-origin:center;transition:200ms;font-size:30px;text-align:center}:host-context([dir=rtl]) .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{transform-origin:calc(100% - center)}[dir=rtl] .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon{transform-origin:calc(100% - center)}@supports selector(:dir(rtl)){.refresher-pulling-icon:dir(rtl),.refresher-refreshing-icon:dir(rtl){transform-origin:calc(100% - center)}}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line,.refresher-md .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;width:24px;height:24px;color:var(--ion-color-primary, #3880ff)}ion-refresher.refresher-native .spinner-arrow-container{display:inherit}ion-refresher.refresher-native .arrow-container{display:block;position:absolute;width:24px;height:24px}ion-refresher.refresher-native .arrow-container ion-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;left:0;right:0;bottom:-4px;position:absolute;color:var(--ion-color-primary, #3880ff);font-size:12px}ion-refresher.refresher-native.refresher-pulling ion-refresher-content .refresher-pulling,ion-refresher.refresher-native.refresher-ready ion-refresher-content .refresher-pulling{display:flex}ion-refresher.refresher-native.refresher-refreshing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-cancelling ion-refresher-content .refresher-refreshing{display:flex}ion-refresher.refresher-native .refresher-pulling-icon{transform:translateY(calc(-100% - 10px))}ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;border-radius:100%;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;display:flex;border:1px solid var(--ion-color-step-200, #ececec);background:var(--ion-color-step-250, #ffffff);box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1)}";const X=class{constructor(e){r(this,e);this.ionRefresh=s(this,"ionRefresh",7);this.ionPull=s(this,"ionPull",7);this.ionStart=s(this,"ionStart",7);this.appliedStyles=false;this.didStart=false;this.progress=0;this.pointerDown=false;this.needsCompletion=false;this.didRefresh=false;this.lastVelocityY=0;this.animations=[];this.nativeRefresher=false;this.state=1;this.pullMin=60;this.pullMax=this.pullMin+60;this.closeDuration="280ms";this.snapbackDuration="280ms";this.pullFactor=1;this.disabled=false}disabledChanged(){if(this.gesture){this.gesture.enable(!this.disabled)}}async checkNativeRefresher(){const e=await E(this.el,f(this));if(e&&!this.nativeRefresher){const e=this.el.closest("ion-content");this.setupNativeRefresher(e)}else if(!e){this.destroyNativeRefresher()}}destroyNativeRefresher(){if(this.scrollEl&&this.scrollListenerCallback){this.scrollEl.removeEventListener("scroll",this.scrollListenerCallback);this.scrollListenerCallback=undefined}this.nativeRefresher=false}async resetNativeRefresher(e,r){this.state=r;if(f(this)==="ios"){await $(e,undefined,300)}else{await d(this.el.querySelector(".refresher-refreshing-icon"),200)}this.didRefresh=false;this.needsCompletion=false;this.pointerDown=false;this.animations.forEach((e=>e.destroy()));this.animations=[];this.progress=0;this.state=1}async setupiOSNativeRefresher(r,s){this.elementToTransform=this.scrollEl;const i=r.shadowRoot.querySelectorAll("svg");let n=this.scrollEl.clientHeight*.16;const o=i.length;e((()=>i.forEach((e=>e.style.setProperty("animation","none")))));this.scrollListenerCallback=()=>{if(!this.pointerDown&&this.state===1){return}t((()=>{const r=this.scrollEl.scrollTop;const t=this.el.clientHeight;if(r>0){if(this.state===8){const i=m(0,r/(t*.5),1);e((()=>z(s,1-i)));return}return}if(this.pointerDown){if(!this.didStart){this.didStart=true;this.ionStart.emit()}if(this.pointerDown){this.ionPull.emit()}}const h=this.didStart?30:0;const f=this.progress=m(0,(Math.abs(r)-h)/n,1);const a=this.state===8||f===1;if(a){if(this.pointerDown){R(s,this.lastVelocityY)}if(!this.didRefresh){this.beginRefresh();this.didRefresh=true;v({style:"light"});if(!this.pointerDown){$(this.elementToTransform,`${t}px`)}}}else{this.state=2;P(i,o,f)}}))};this.scrollEl.addEventListener("scroll",this.scrollListenerCallback);this.gesture=(await import("./p-0b857c77.js")).createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,onStart:()=>{this.pointerDown=true;if(!this.didRefresh){$(this.elementToTransform,"0px")}if(n===0){n=this.scrollEl.clientHeight*.16}},onMove:e=>{this.lastVelocityY=e.velocityY},onEnd:()=>{this.pointerDown=false;this.didStart=false;if(this.needsCompletion){this.resetNativeRefresher(this.elementToTransform,32);this.needsCompletion=false}else if(this.didRefresh){t((()=>$(this.elementToTransform,`${this.el.clientHeight}px`)))}}});this.disabledChanged()}async setupMDNativeRefresher(r,s,t){const i=x(s).querySelector("circle");const n=this.el.querySelector("ion-refresher-content .refresher-pulling-icon");const o=x(t).querySelector("circle");if(i!==null&&o!==null){e((()=>{i.style.setProperty("animation","none");t.style.setProperty("animation-delay","-655ms");o.style.setProperty("animation-delay","-655ms")}))}this.gesture=(await import("./p-0b857c77.js")).createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,canStart:()=>this.state!==8&&this.state!==32&&this.scrollEl.scrollTop===0,onStart:e=>{this.progress=0;e.data={animation:undefined,didStart:false,cancelled:false}},onMove:s=>{if(s.velocityY<0&&this.progress===0&&!s.data.didStart||s.data.cancelled){s.data.cancelled=true;return}if(!s.data.didStart){s.data.didStart=true;this.state=2;const{scrollEl:t}=this;const i=t.matches(l)?"overflow":"--overflow";e((()=>t.style.setProperty(i,"hidden")));const o=w(r);const h=k(o,n,this.el);s.data.animation=h;h.progressStart(false,0);this.ionStart.emit();this.animations.push(h);return}this.progress=m(0,s.deltaY/180*.5,1);s.data.animation.progressStep(this.progress);this.ionPull.emit()},onEnd:r=>{if(!r.data.didStart){return}this.gesture.enable(false);const{scrollEl:s}=this;const t=s.matches(l)?"overflow":"--overflow";e((()=>s.style.removeProperty(t)));if(this.progress<=.4){r.data.animation.progressEnd(0,this.progress,500).onFinish((()=>{this.animations.forEach((e=>e.destroy()));this.animations=[];this.gesture.enable(true);this.state=1}));return}const i=a([0,0],[0,0],[1,1],[1,1],this.progress)[0];const o=Y(n);this.animations.push(o);e((async()=>{n.style.setProperty("--ion-pulling-refresher-translate",`${i*100}px`);r.data.animation.progressEnd();await o.play();this.beginRefresh();r.data.animation.destroy();this.gesture.enable(true)}))}});this.disabledChanged()}async setupNativeRefresher(e){if(this.scrollListenerCallback||!e||this.nativeRefresher||!this.scrollEl){return}this.setCss(0,"",false,"");this.nativeRefresher=true;const r=this.el.querySelector("ion-refresher-content .refresher-pulling ion-spinner");const s=this.el.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");if(f(this)==="ios"){this.setupiOSNativeRefresher(r,s)}else{this.setupMDNativeRefresher(e,r,s)}}componentDidUpdate(){this.checkNativeRefresher()}async connectedCallback(){if(this.el.getAttribute("slot")!=="fixed"){console.error('Make sure you use: <ion-refresher slot="fixed">');return}const e=this.el.closest(c);if(!e){p(this.el);return}u(e,(async()=>{const r=e.querySelector(l);this.scrollEl=await g(r!==null&&r!==void 0?r:e);this.backgroundContentEl=await e.getBackgroundElement();if(await E(this.el,f(this))){this.setupNativeRefresher(e)}else{this.gesture=(await import("./p-0b857c77.js")).createGesture({el:e,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:20,passive:false,canStart:()=>this.canStart(),onStart:()=>this.onStart(),onMove:e=>this.onMove(e),onEnd:()=>this.onEnd()});this.disabledChanged()}}))}disconnectedCallback(){this.destroyNativeRefresher();this.scrollEl=undefined;if(this.gesture){this.gesture.destroy();this.gesture=undefined}}async complete(){if(this.nativeRefresher){this.needsCompletion=true;if(!this.pointerDown){y((()=>y((()=>this.resetNativeRefresher(this.elementToTransform,32)))))}}else{this.close(32,"120ms")}}async cancel(){if(this.nativeRefresher){if(!this.pointerDown){y((()=>y((()=>this.resetNativeRefresher(this.elementToTransform,16)))))}}else{this.close(16,"")}}getProgress(){return Promise.resolve(this.progress)}canStart(){if(!this.scrollEl){return false}if(this.state!==1){return false}if(this.scrollEl.scrollTop>0){return false}return true}onStart(){this.progress=0;this.state=1;this.memoizeOverflowStyle()}onMove(e){if(!this.scrollEl){return}const r=e.event;if(r.touches!==undefined&&r.touches.length>1){return}if((this.state&56)!==0){return}const s=Number.isNaN(this.pullFactor)||this.pullFactor<0?1:this.pullFactor;const t=e.deltaY*s;if(t<=0){this.progress=0;this.state=1;if(this.appliedStyles){this.setCss(0,"",false,"");return}return}if(this.state===1){const e=this.scrollEl.scrollTop;if(e>0){this.progress=0;return}this.state=2}if(r.cancelable){r.preventDefault()}this.setCss(t,"0ms",true,"");if(t===0){this.progress=0;return}const i=this.pullMin;this.progress=t/i;if(!this.didStart){this.didStart=true;this.ionStart.emit()}this.ionPull.emit();if(t<i){this.state=2;return}if(t>this.pullMax){this.beginRefresh();return}this.state=4;return}onEnd(){if(this.state===4){this.beginRefresh()}else if(this.state===2){this.cancel()}else if(this.state===1){this.restoreOverflowStyle()}}beginRefresh(){this.state=8;this.setCss(this.pullMin,this.snapbackDuration,true,"");this.ionRefresh.emit({complete:this.complete.bind(this)})}close(e,r){setTimeout((()=>{this.state=1;this.progress=0;this.didStart=false;this.setCss(0,"0ms",false,"",true)}),600);this.state=e;this.setCss(0,this.closeDuration,true,r)}setCss(r,s,t,i,n=false){if(this.nativeRefresher){return}this.appliedStyles=r>0;e((()=>{if(this.scrollEl&&this.backgroundContentEl){const e=this.scrollEl.style;const n=this.backgroundContentEl.style;e.transform=n.transform=r>0?`translateY(${r}px) translateZ(0px)`:"";e.transitionDuration=n.transitionDuration=s;e.transitionDelay=n.transitionDelay=i;e.overflow=t?"hidden":""}if(n){this.restoreOverflowStyle()}}))}memoizeOverflowStyle(){if(this.scrollEl){const{overflow:e,overflowX:r,overflowY:s}=this.scrollEl.style;this.overflowStyles={overflow:e!==null&&e!==void 0?e:"",overflowX:r!==null&&r!==void 0?r:"",overflowY:s!==null&&s!==void 0?s:""}}}restoreOverflowStyle(){if(this.overflowStyles!==undefined&&this.scrollEl!==undefined){const{overflow:e,overflowX:r,overflowY:s}=this.overflowStyles;this.scrollEl.style.overflow=e;this.scrollEl.style.overflowX=r;this.scrollEl.style.overflowY=s;this.overflowStyles=undefined}}render(){const e=f(this);return i(o,{slot:"fixed",class:{[e]:true,[`refresher-${e}`]:true,"refresher-native":this.nativeRefresher,"refresher-active":this.state!==1,"refresher-pulling":this.state===2,"refresher-ready":this.state===4,"refresher-refreshing":this.state===8,"refresher-cancelling":this.state===16,"refresher-completing":this.state===32}})}get el(){return n(this)}static get watchers(){return{disabled:["disabledChanged"]}}};X.style={ios:D,md:M};export{X as ion_refresher};
//# sourceMappingURL=p-c0846830.entry.js.map