import{r as s,h as t,H as i}from"./p-b238ac1f.js";import{g as o}from"./p-59a10c97.js";import{m as e}from"./p-6d167443.js";import{u as n}from"./p-11fbf01f.js";import"./p-add30d46.js";import"./p-62625646.js";import"./p-e60a53ea.js";import"./p-be7dc084.js";const r=":host(.menu-toggle-hidden){display:none}";const a=class{constructor(t){s(this,t);this.onClick=()=>e.toggle(this.menu);this.visible=false;this.menu=undefined;this.autoHide=true}connectedCallback(){this.visibilityChanged()}async visibilityChanged(){this.visible=await n(this.menu)}render(){const s=o(this);const e=this.autoHide&&!this.visible;return t(i,{onClick:this.onClick,"aria-hidden":e?"true":null,class:{[s]:true,"menu-toggle-hidden":e}},t("slot",null))}};a.style=r;export{a as ion_menu_toggle};
//# sourceMappingURL=p-d3abcc4f.entry.js.map