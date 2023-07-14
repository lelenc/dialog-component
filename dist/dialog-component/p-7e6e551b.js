import{w as n}from"./p-be7dc084.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var i;(function(n){n["Body"]="body";n["Ionic"]="ionic";n["Native"]="native";n["None"]="none"})(i||(i={}));const o={getEngine(){var i;return((i=n===null||n===void 0?void 0:n.Capacitor)===null||i===void 0?void 0:i.isPluginAvailable("Keyboard"))&&(n===null||n===void 0?void 0:n.Capacitor.Plugins.Keyboard)},getResizeMode(){const n=this.getEngine();if(!(n===null||n===void 0?void 0:n.getResizeMode)){return Promise.resolve(undefined)}return n.getResizeMode().catch((n=>{if(n.code==="UNIMPLEMENTED"){return undefined}throw n}))}};export{o as K,i as a};
//# sourceMappingURL=p-7e6e551b.js.map