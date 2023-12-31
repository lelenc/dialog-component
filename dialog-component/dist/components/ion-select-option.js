import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';

const selectOptionCss = ":host{display:none}";

const SelectOption = /*@__PURE__*/ proxyCustomElement(class SelectOption extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.inputId = `ion-selopt-${selectOptionIds++}`;
    this.disabled = false;
    this.value = undefined;
  }
  render() {
    return h(Host, { role: "option", id: this.inputId, class: getIonMode(this) });
  }
  get el() { return this; }
  static get style() { return selectOptionCss; }
}, [1, "ion-select-option", {
    "disabled": [4],
    "value": [8]
  }]);
let selectOptionIds = 0;
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-select-option"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-select-option":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SelectOption);
      }
      break;
  } });
}

const IonSelectOption = SelectOption;
const defineCustomElement = defineCustomElement$1;

export { IonSelectOption, defineCustomElement };

//# sourceMappingURL=ion-select-option.js.map