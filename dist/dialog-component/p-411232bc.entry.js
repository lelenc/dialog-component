import{r as i,h as e,e as s,H as t}from"./p-b238ac1f.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const n=(i,e,s,t,n)=>{const r=i.closest("ion-nav");if(r){if(e==="forward"){if(s!==undefined){return r.push(s,t,{skipIfBusy:true,animationBuilder:n})}}else if(e==="root"){if(s!==undefined){return r.setRoot(s,t,{skipIfBusy:true,animationBuilder:n})}}else if(e==="back"){return r.pop({skipIfBusy:true,animationBuilder:n})}}return Promise.resolve(false)};const r=class{constructor(e){i(this,e);this.onClick=()=>n(this.el,this.routerDirection,this.component,this.componentProps,this.routerAnimation);this.component=undefined;this.componentProps=undefined;this.routerDirection="forward";this.routerAnimation=undefined}render(){return e(t,{onClick:this.onClick})}get el(){return s(this)}};export{r as ion_nav_link};
//# sourceMappingURL=p-411232bc.entry.js.map