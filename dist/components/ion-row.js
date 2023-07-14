import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

const Row = /*@__PURE__*/ proxyCustomElement(class Row extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
  static get style() { return rowCss; }
}, [1, "ion-row"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-row"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-row":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Row);
      }
      break;
  } });
}

const IonRow = Row;
const defineCustomElement = defineCustomElement$1;

export { IonRow, defineCustomElement };

//# sourceMappingURL=ion-row.js.map