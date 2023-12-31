import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

const Text = /*@__PURE__*/ proxyCustomElement(class Text extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.color = undefined;
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
      }) }, h("slot", null)));
  }
  static get style() { return textCss; }
}, [1, "ion-text", {
    "color": [513]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-text"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-text":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Text);
      }
      break;
  } });
}

const IonText = Text;
const defineCustomElement = defineCustomElement$1;

export { IonText, defineCustomElement };

//# sourceMappingURL=ion-text.js.map