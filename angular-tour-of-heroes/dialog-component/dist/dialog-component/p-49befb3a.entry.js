import{r as t,d as i,h as s,H as e,e as n}from"./p-b238ac1f.js";const o=":host{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner{position:relative;flex:1;contain:layout size style}";const r=class{constructor(s){t(this,s);this.ionNavWillLoad=i(this,"ionNavWillLoad",7);this.ionTabsWillChange=i(this,"ionTabsWillChange",3);this.ionTabsDidChange=i(this,"ionTabsDidChange",3);this.transitioning=false;this.onTabClicked=t=>{const{href:i,tab:s}=t.detail;if(this.useRouter&&i!==undefined){const t=document.querySelector("ion-router");if(t){t.push(i)}}else{this.select(s)}};this.selectedTab=undefined;this.useRouter=false}async componentWillLoad(){if(!this.useRouter){this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]")}if(!this.useRouter){const t=this.tabs;if(t.length>0){await this.select(t[0])}}this.ionNavWillLoad.emit()}componentWillRender(){const t=this.el.querySelector("ion-tab-bar");if(t){const i=this.selectedTab?this.selectedTab.tab:undefined;t.selectedTab=i}}async select(t){const i=h(this.tabs,t);if(!this.shouldSwitch(i)){return false}await this.setActive(i);await this.notifyRouter();this.tabSwitch();return true}async getTab(t){return h(this.tabs,t)}getSelected(){return Promise.resolve(this.selectedTab?this.selectedTab.tab:undefined)}async setRouteId(t){const i=h(this.tabs,t);if(!this.shouldSwitch(i)){return{changed:false,element:this.selectedTab}}await this.setActive(i);return{changed:true,element:this.selectedTab,markVisible:()=>this.tabSwitch()}}async getRouteId(){var t;const i=(t=this.selectedTab)===null||t===void 0?void 0:t.tab;return i!==undefined?{id:i,element:this.selectedTab}:undefined}setActive(t){if(this.transitioning){return Promise.reject("transitioning already happening")}this.transitioning=true;this.leavingTab=this.selectedTab;this.selectedTab=t;this.ionTabsWillChange.emit({tab:t.tab});t.active=true;return Promise.resolve()}tabSwitch(){const t=this.selectedTab;const i=this.leavingTab;this.leavingTab=undefined;this.transitioning=false;if(!t){return}if(i!==t){if(i){i.active=false}this.ionTabsDidChange.emit({tab:t.tab})}}notifyRouter(){if(this.useRouter){const t=document.querySelector("ion-router");if(t){return t.navChanged("forward")}}return Promise.resolve(false)}shouldSwitch(t){const i=this.selectedTab;return t!==undefined&&t!==i&&!this.transitioning}get tabs(){return Array.from(this.el.querySelectorAll("ion-tab"))}render(){return s(e,{onIonTabButtonClick:this.onTabClicked},s("slot",{name:"top"}),s("div",{class:"tabs-inner"},s("slot",null)),s("slot",{name:"bottom"}))}get el(){return n(this)}};const h=(t,i)=>{const s=typeof i==="string"?t.find((t=>t.tab===i)):i;if(!s){console.error(`tab with id: "${s}" does not exist`)}return s};r.style=o;export{r as ion_tabs};
//# sourceMappingURL=p-49befb3a.entry.js.map