import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';

const fabListCss = ":host{margin-left:0;margin-right:0;margin-top:66px;margin-bottom:66px;display:none;position:absolute;top:0;flex-direction:column;align-items:center;min-width:56px;min-height:56px}:host(.fab-list-active){display:flex}::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:8px;margin-bottom:8px;width:40px;height:40px;transform:scale(0);opacity:0;visibility:hidden}:host(.fab-list-side-top) ::slotted(.fab-button-in-list),:host(.fab-list-side-bottom) ::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px}:host(.fab-list-side-start) ::slotted(.fab-button-in-list),:host(.fab-list-side-end) ::slotted(.fab-button-in-list){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted(.fab-button-in-list.fab-button-show){transform:scale(1);opacity:1;visibility:visible}:host(.fab-list-side-top){top:auto;bottom:0;flex-direction:column-reverse}:host(.fab-list-side-start){-webkit-margin-start:66px;margin-inline-start:66px;-webkit-margin-end:66px;margin-inline-end:66px;margin-top:0;margin-bottom:0;flex-direction:row-reverse}@supports (inset-inline-start: 0){:host(.fab-list-side-start){inset-inline-end:0}}@supports not (inset-inline-start: 0){:host(.fab-list-side-start){right:0}:host-context([dir=rtl]):host(.fab-list-side-start),:host-context([dir=rtl]).fab-list-side-start{left:unset;right:unset;left:0}@supports selector(:dir(rtl)){:host(.fab-list-side-start):dir(rtl){left:unset;right:unset;left:0}}}:host(.fab-list-side-end){-webkit-margin-start:66px;margin-inline-start:66px;-webkit-margin-end:66px;margin-inline-end:66px;margin-top:0;margin-bottom:0;flex-direction:row}@supports (inset-inline-start: 0){:host(.fab-list-side-end){inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.fab-list-side-end){left:0}:host-context([dir=rtl]):host(.fab-list-side-end),:host-context([dir=rtl]).fab-list-side-end{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.fab-list-side-end):dir(rtl){left:unset;right:unset;right:0}}}";

const FabList = /*@__PURE__*/ proxyCustomElement(class FabList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.activated = false;
    this.side = 'bottom';
  }
  activatedChanged(activated) {
    const fabs = Array.from(this.el.querySelectorAll('ion-fab-button'));
    // if showing the fabs add a timeout, else show immediately
    const timeout = activated ? 30 : 0;
    fabs.forEach((fab, i) => {
      setTimeout(() => (fab.show = activated), i * timeout);
    });
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'fab-list-active': this.activated,
        [`fab-list-side-${this.side}`]: true,
      } }, h("slot", null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "activated": ["activatedChanged"]
  }; }
  static get style() { return fabListCss; }
}, [1, "ion-fab-list", {
    "activated": [4],
    "side": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-fab-list"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-fab-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, FabList);
      }
      break;
  } });
}

const IonFabList = FabList;
const defineCustomElement = defineCustomElement$1;

export { IonFabList, defineCustomElement };

//# sourceMappingURL=ion-fab-list.js.map