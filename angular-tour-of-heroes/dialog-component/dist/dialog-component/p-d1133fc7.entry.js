import{r as t,h as e,H as a,i as s}from"./p-66a8649d.js";import{g as r}from"./p-3184ff59.js";const i=":host{position:absolute;z-index:999}:host(.fab-horizontal-center){-webkit-margin-start:-28px;margin-inline-start:-28px}@supports (inset-inline-start: 0){:host(.fab-horizontal-center){inset-inline-start:50%}}@supports not (inset-inline-start: 0){:host(.fab-horizontal-center){left:50%}:host-context([dir=rtl]):host(.fab-horizontal-center),:host-context([dir=rtl]).fab-horizontal-center{left:unset;right:unset;right:50%}@supports selector(:dir(rtl)){:host(.fab-horizontal-center):dir(rtl){left:unset;right:unset;right:50%}}}@supports (inset-inline-start: 0){:host(.fab-horizontal-start){inset-inline-start:calc(10px + var(--ion-safe-area-left, 0px))}}@supports not (inset-inline-start: 0){:host(.fab-horizontal-start){left:calc(10px + var(--ion-safe-area-left, 0px))}:host-context([dir=rtl]):host(.fab-horizontal-start),:host-context([dir=rtl]).fab-horizontal-start{left:unset;right:unset;right:calc(10px + var(--ion-safe-area-left, 0px))}@supports selector(:dir(rtl)){:host(.fab-horizontal-start):dir(rtl){left:unset;right:unset;right:calc(10px + var(--ion-safe-area-left, 0px))}}}@supports (inset-inline-start: 0){:host(.fab-horizontal-end){inset-inline-end:calc(10px + var(--ion-safe-area-right, 0px))}}@supports not (inset-inline-start: 0){:host(.fab-horizontal-end){right:calc(10px + var(--ion-safe-area-right, 0px))}:host-context([dir=rtl]):host(.fab-horizontal-end),:host-context([dir=rtl]).fab-horizontal-end{left:unset;right:unset;left:calc(10px + var(--ion-safe-area-right, 0px))}@supports selector(:dir(rtl)){:host(.fab-horizontal-end):dir(rtl){left:unset;right:unset;left:calc(10px + var(--ion-safe-area-right, 0px))}}}:host(.fab-vertical-top){top:10px}:host(.fab-vertical-top.fab-edge){top:-28px}:host(.fab-vertical-bottom){bottom:10px}:host(.fab-vertical-bottom.fab-edge){bottom:-28px}:host(.fab-vertical-center){margin-top:-28px;top:50%}";const o=class{constructor(e){t(this,e);this.horizontal=undefined;this.vertical=undefined;this.edge=false;this.activated=false}activatedChanged(){const t=this.activated;const e=this.getFab();if(e){e.activated=t}Array.from(this.el.querySelectorAll("ion-fab-list")).forEach((e=>{e.activated=t}))}componentDidLoad(){if(this.activated){this.activatedChanged()}}async close(){this.activated=false}getFab(){return this.el.querySelector("ion-fab-button")}async toggle(){const t=!!this.el.querySelector("ion-fab-list");if(t){this.activated=!this.activated}}render(){const{horizontal:t,vertical:s,edge:i}=this;const o=r(this);return e(a,{class:{[o]:true,[`fab-horizontal-${t}`]:t!==undefined,[`fab-vertical-${s}`]:s!==undefined,"fab-edge":i}},e("slot",null))}get el(){return s(this)}static get watchers(){return{activated:["activatedChanged"]}}};o.style=i;export{o as ion_fab};
//# sourceMappingURL=p-d1133fc7.entry.js.map