import{r as s,h as t,H as i}from"./p-66a8649d.js";import{g as o}from"./p-3184ff59.js";import{m as e}from"./p-04610480.js";import{u as n}from"./p-3eaca62b.js";import"./p-add30d46.js";import"./p-22318485.js";import"./p-f1f22152.js";import"./p-be7dc084.js";const r=":host(.menu-toggle-hidden){display:none}";const a=class{constructor(t){s(this,t);this.onClick=()=>e.toggle(this.menu);this.visible=false;this.menu=undefined;this.autoHide=true}connectedCallback(){this.visibilityChanged()}async visibilityChanged(){this.visible=await n(this.menu)}render(){const s=o(this);const e=this.autoHide&&!this.visible;return t(i,{onClick:this.onClick,"aria-hidden":e?"true":null,class:{[s]:true,"menu-toggle-hidden":e}},t("slot",null))}};a.style=r;export{a as ion_menu_toggle};
//# sourceMappingURL=p-cc992ba0.entry.js.map