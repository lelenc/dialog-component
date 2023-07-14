import{r as t,d as i,h as e,H as s,i as r}from"./p-66a8649d.js";import{g as n}from"./p-3184ff59.js";import{h as o}from"./p-22318485.js";import{b as p,c as h,a}from"./p-b29e1ab6.js";import{g as c}from"./p-0e4de1d0.js";const l=".picker-col{display:flex;position:relative;flex:1;justify-content:center;height:100%;box-sizing:content-box;contain:content}.picker-opts{position:relative;flex:1;max-width:100%}.picker-opt{top:0;display:block;position:absolute;width:100%;border:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;contain:strict;overflow:hidden;will-change:transform}@supports (inset-inline-start: 0){.picker-opt{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-opt{left:0}:host-context([dir=rtl]) .picker-opt{left:unset;right:unset;right:0}[dir=rtl] .picker-opt{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){.picker-opt:dir(rtl){left:unset;right:unset;right:0}}}.picker-opt.picker-opt-disabled{pointer-events:none}.picker-opt-disabled{opacity:0}.picker-opts-left{justify-content:flex-start}.picker-opts-right{justify-content:flex-end}.picker-opt:active,.picker-opt:focus{outline:none}.picker-prefix{position:relative;flex:1;text-align:end;white-space:nowrap}.picker-suffix{position:relative;flex:1;text-align:start;white-space:nowrap}.picker-col{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:0;padding-bottom:0;transform-style:preserve-3d}.picker-prefix,.picker-suffix,.picker-opts{top:77px;transform-style:preserve-3d;color:inherit;font-size:20px;line-height:42px;pointer-events:none}.picker-opt{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;transform-origin:center center;height:46px;transform-style:preserve-3d;transition-timing-function:ease-out;background:transparent;color:inherit;font-size:20px;line-height:42px;backface-visibility:hidden;pointer-events:auto}:host-context([dir=rtl]) .picker-opt{transform-origin:calc(100% - center) center}[dir=rtl] .picker-opt{transform-origin:calc(100% - center) center}@supports selector(:dir(rtl)){.picker-opt:dir(rtl){transform-origin:calc(100% - center) center}}";const d=".picker-col{display:flex;position:relative;flex:1;justify-content:center;height:100%;box-sizing:content-box;contain:content}.picker-opts{position:relative;flex:1;max-width:100%}.picker-opt{top:0;display:block;position:absolute;width:100%;border:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;contain:strict;overflow:hidden;will-change:transform}@supports (inset-inline-start: 0){.picker-opt{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-opt{left:0}:host-context([dir=rtl]) .picker-opt{left:unset;right:unset;right:0}[dir=rtl] .picker-opt{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){.picker-opt:dir(rtl){left:unset;right:unset;right:0}}}.picker-opt.picker-opt-disabled{pointer-events:none}.picker-opt-disabled{opacity:0}.picker-opts-left{justify-content:flex-start}.picker-opts-right{justify-content:flex-end}.picker-opt:active,.picker-opt:focus{outline:none}.picker-prefix{position:relative;flex:1;text-align:end;white-space:nowrap}.picker-suffix{position:relative;flex:1;text-align:start;white-space:nowrap}.picker-col{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0;transform-style:preserve-3d}.picker-prefix,.picker-suffix,.picker-opts{top:77px;transform-style:preserve-3d;color:inherit;font-size:22px;line-height:42px;pointer-events:none}.picker-opt{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;height:43px;transition-timing-function:ease-out;background:transparent;color:inherit;font-size:22px;line-height:42px;backface-visibility:hidden;pointer-events:auto}.picker-prefix,.picker-suffix,.picker-opt.picker-opt-selected{color:var(--ion-color-primary, #3880ff)}";const f=class{constructor(e){t(this,e);this.ionPickerColChange=i(this,"ionPickerColChange",7);this.optHeight=0;this.rotateFactor=0;this.scaleFactor=1;this.velocity=0;this.y=0;this.noAnimate=true;this.colDidChange=false;this.col=undefined}colChanged(){this.colDidChange=true}async connectedCallback(){let t=0;let i=.81;const e=n(this);if(e==="ios"){t=-.46;i=1}this.rotateFactor=t;this.scaleFactor=i;this.gesture=(await import("./p-0b857c77.js")).createGesture({el:this.el,gestureName:"picker-swipe",gesturePriority:100,threshold:0,passive:false,onStart:t=>this.onStart(t),onMove:t=>this.onMove(t),onEnd:t=>this.onEnd(t)});this.gesture.enable();this.tmrId=setTimeout((()=>{this.noAnimate=false;this.refresh(true)}),250)}componentDidLoad(){this.onDomChange()}componentDidUpdate(){if(this.colDidChange){this.onDomChange(true,false);this.colDidChange=false}}disconnectedCallback(){if(this.rafId!==undefined)cancelAnimationFrame(this.rafId);if(this.tmrId)clearTimeout(this.tmrId);if(this.gesture){this.gesture.destroy();this.gesture=undefined}}emitColChange(){this.ionPickerColChange.emit(this.col)}setSelected(t,i){const e=t>-1?-(t*this.optHeight):0;this.velocity=0;if(this.rafId!==undefined)cancelAnimationFrame(this.rafId);this.update(e,i,true);this.emitColChange()}update(t,i,e){if(!this.optsEl){return}let s=0;let r=0;const{col:n,rotateFactor:o}=this;const h=n.selectedIndex;const a=n.selectedIndex=this.indexForY(-t);const c=i===0?"":i+"ms";const l=`scale(${this.scaleFactor})`;const d=this.optsEl.children;for(let e=0;e<d.length;e++){const p=d[e];const h=n.options[e];const f=e*this.optHeight+t;let u="";if(o!==0){const t=f*o;if(Math.abs(t)<=90){s=0;r=90;u=`rotateX(${t}deg) `}else{s=-9999}}else{r=0;s=f}const k=a===e;u+=`translate3d(0px,${s}px,${r}px) `;if(this.scaleFactor!==1&&!k){u+=l}if(this.noAnimate){h.duration=0;p.style.transitionDuration=""}else if(i!==h.duration){h.duration=i;p.style.transitionDuration=c}if(u!==h.transform){h.transform=u}p.style.transform=u;h.selected=k;if(k){p.classList.add(g)}else{p.classList.remove(g)}}this.col.prevSelected=h;if(e){this.y=t}if(this.lastIndex!==a){p();this.lastIndex=a}}decelerate(){if(this.velocity!==0){this.velocity*=u;this.velocity=this.velocity>0?Math.max(this.velocity,1):Math.min(this.velocity,-1);let t=this.y+this.velocity;if(t>this.minY){t=this.minY;this.velocity=0}else if(t<this.maxY){t=this.maxY;this.velocity=0}this.update(t,0,true);const i=Math.round(t)%this.optHeight!==0||Math.abs(this.velocity)>1;if(i){this.rafId=requestAnimationFrame((()=>this.decelerate()))}else{this.velocity=0;this.emitColChange();h()}}else if(this.y%this.optHeight!==0){const t=Math.abs(this.y%this.optHeight);this.velocity=t>this.optHeight/2?1:-1;this.decelerate()}}indexForY(t){return Math.min(Math.max(Math.abs(Math.round(t/this.optHeight)),0),this.col.options.length-1)}onStart(t){if(t.event.cancelable){t.event.preventDefault()}t.event.stopPropagation();a();if(this.rafId!==undefined)cancelAnimationFrame(this.rafId);const i=this.col.options;let e=i.length-1;let s=0;for(let t=0;t<i.length;t++){if(!i[t].disabled){e=Math.min(e,t);s=Math.max(s,t)}}this.minY=-(e*this.optHeight);this.maxY=-(s*this.optHeight)}onMove(t){if(t.event.cancelable){t.event.preventDefault()}t.event.stopPropagation();let i=this.y+t.deltaY;if(i>this.minY){i=Math.pow(i,.8);this.bounceFrom=i}else if(i<this.maxY){i+=Math.pow(this.maxY-i,.9);this.bounceFrom=i}else{this.bounceFrom=0}this.update(i,0,false)}onEnd(t){if(this.bounceFrom>0){this.update(this.minY,100,true);this.emitColChange();return}else if(this.bounceFrom<0){this.update(this.maxY,100,true);this.emitColChange();return}this.velocity=o(-k,t.velocityY*23,k);if(this.velocity===0&&t.deltaY===0){const i=t.event.target.closest(".picker-opt");if(i===null||i===void 0?void 0:i.hasAttribute("opt-index")){this.setSelected(parseInt(i.getAttribute("opt-index"),10),x)}}else{this.y+=t.deltaY;if(Math.abs(t.velocityY)<.05){const i=t.deltaY>0;const e=Math.abs(this.y)%this.optHeight/this.optHeight;if(i&&e>.5){this.velocity=Math.abs(this.velocity)*-1}else if(!i&&e<=.5){this.velocity=Math.abs(this.velocity)}}this.decelerate()}}refresh(t,i){var e;let s=this.col.options.length-1;let r=0;const n=this.col.options;for(let t=0;t<n.length;t++){if(!n[t].disabled){s=Math.min(s,t);r=Math.max(r,t)}}if(this.velocity!==0){return}const p=o(s,(e=this.col.selectedIndex)!==null&&e!==void 0?e:0,r);if(this.col.prevSelected!==p||t){const t=p*this.optHeight*-1;const e=i?x:0;this.velocity=0;this.update(t,e,true)}}onDomChange(t,i){const e=this.optsEl;if(e){this.optHeight=e.firstElementChild?e.firstElementChild.clientHeight:0}this.refresh(t,i)}render(){const t=this.col;const i=n(this);return e(s,{class:Object.assign({[i]:true,"picker-col":true,"picker-opts-left":this.col.align==="left","picker-opts-right":this.col.align==="right"},c(t.cssClass)),style:{"max-width":this.col.columnWidth}},t.prefix&&e("div",{class:"picker-prefix",style:{width:t.prefixWidth}},t.prefix),e("div",{class:"picker-opts",style:{maxWidth:t.optionsWidth},ref:t=>this.optsEl=t},t.options.map(((t,i)=>e("button",{"aria-label":t.ariaLabel,class:{"picker-opt":true,"picker-opt-disabled":!!t.disabled},"opt-index":i},t.text)))),t.suffix&&e("div",{class:"picker-suffix",style:{width:t.suffixWidth}},t.suffix))}get el(){return r(this)}static get watchers(){return{col:["colChanged"]}}};const g="picker-opt-selected";const u=.97;const k=90;const x=150;f.style={ios:l,md:d};export{f as ion_picker_column};
//# sourceMappingURL=p-16edf4a3.entry.js.map