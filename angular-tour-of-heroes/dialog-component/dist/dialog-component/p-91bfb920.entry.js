import{r as n,h as i,H as e}from"./p-66a8649d.js";import{c as t,g as o}from"./p-3184ff59.js";import{E as s,s as l}from"./p-63c75ae2.js";const r="ion-infinite-scroll-content{display:flex;flex-direction:column;justify-content:center;min-height:84px;text-align:center;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}";const c="ion-infinite-scroll-content{display:flex;flex-direction:column;justify-content:center;min-height:84px;text-align:center;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}";const a=class{constructor(i){n(this,i);this.customHTMLEnabled=t.get("innerHTMLTemplatesEnabled",s);this.loadingSpinner=undefined;this.loadingText=undefined}componentDidLoad(){if(this.loadingSpinner===undefined){const n=o(this);this.loadingSpinner=t.get("infiniteLoadingSpinner",t.get("spinner",n==="ios"?"lines":"crescent"))}}renderLoadingText(){const{customHTMLEnabled:n,loadingText:e}=this;if(n){return i("div",{class:"infinite-loading-text",innerHTML:l(e)})}return i("div",{class:"infinite-loading-text"},this.loadingText)}render(){const n=o(this);return i(e,{class:{[n]:true,[`infinite-scroll-content-${n}`]:true}},i("div",{class:"infinite-loading"},this.loadingSpinner&&i("div",{class:"infinite-loading-spinner"},i("ion-spinner",{name:this.loadingSpinner})),this.loadingText!==undefined&&this.renderLoadingText()))}};a.style={ios:r,md:c};export{a as ion_infinite_scroll_content};
//# sourceMappingURL=p-91bfb920.entry.js.map