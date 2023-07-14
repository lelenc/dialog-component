import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const titleIosCss = ":host{--color:initial;display:flex;flex:1;align-items:center;transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{top:0;-webkit-padding-start:90px;padding-inline-start:90px;-webkit-padding-end:90px;padding-inline-end:90px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);position:absolute;width:100%;height:100%;transform:translateZ(0);font-size:17px;font-weight:600;text-align:center;box-sizing:border-box;pointer-events:none}@supports (inset-inline-start: 0){:host{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host{left:0}:host-context([dir=rtl]){left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host:dir(rtl){left:unset;right:unset;right:0}}}:host(.title-small){-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px;padding-top:6px;padding-bottom:16px;position:relative;font-size:13px;font-weight:normal}:host(.title-large){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:0;transform-origin:left center;bottom:0;align-items:flex-end;min-width:100%;padding-bottom:6px;font-size:34px;font-weight:700;text-align:start}:host(.title-large.title-rtl){transform-origin:right center}:host(.title-large.ion-cloned-element){--color:var(--ion-text-color, #000)}:host(.title-large) .toolbar-title{transform-origin:inherit}:host-context([dir=rtl]):host(.title-large) .toolbar-title,:host-context([dir=rtl]).title-large .toolbar-title{transform-origin:calc(100% - inherit)}@supports selector(:dir(rtl)){:host(.title-large) .toolbar-title:dir(rtl){transform-origin:calc(100% - inherit)}}";

const titleMdCss = ":host{--color:initial;display:flex;flex:1;align-items:center;transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500;letter-spacing:0.0125em}:host(.title-small){width:100%;height:100%;font-size:15px;font-weight:normal}";

const ToolbarTitle = /*@__PURE__*/ proxyCustomElement(class ToolbarTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.color = undefined;
    this.size = undefined;
  }
  sizeChanged() {
    this.emitStyle();
  }
  connectedCallback() {
    this.emitStyle();
  }
  emitStyle() {
    const size = this.getSize();
    this.ionStyle.emit({
      [`title-${size}`]: true,
    });
  }
  getSize() {
    return this.size !== undefined ? this.size : 'default';
  }
  render() {
    const mode = getIonMode(this);
    const size = this.getSize();
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
        [`title-${size}`]: true,
        'title-rtl': document.dir === 'rtl',
      }) }, h("div", { class: "toolbar-title" }, h("slot", null))));
  }
  get el() { return this; }
  static get watchers() { return {
    "size": ["sizeChanged"]
  }; }
  static get style() { return {
    ios: titleIosCss,
    md: titleMdCss
  }; }
}, [33, "ion-title", {
    "color": [513],
    "size": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ToolbarTitle);
      }
      break;
  } });
}

const IonTitle = ToolbarTitle;
const defineCustomElement = defineCustomElement$1;

export { IonTitle, defineCustomElement };

//# sourceMappingURL=ion-title.js.map