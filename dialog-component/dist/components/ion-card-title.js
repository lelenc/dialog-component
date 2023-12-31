import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const cardTitleIosCss = ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-text-color, #000);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:28px;font-weight:700;line-height:1.2}";

const cardTitleMdCss = ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-850, #262626);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500;line-height:1.2}";

const CardTitle = /*@__PURE__*/ proxyCustomElement(class CardTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.color = undefined;
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { role: "heading", "aria-level": "2", class: createColorClasses(this.color, {
        'ion-inherit-color': true,
        [mode]: true,
      }) }, h("slot", null)));
  }
  static get style() { return {
    ios: cardTitleIosCss,
    md: cardTitleMdCss
  }; }
}, [33, "ion-card-title", {
    "color": [513]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-card-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-card-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CardTitle);
      }
      break;
  } });
}

const IonCardTitle = CardTitle;
const defineCustomElement = defineCustomElement$1;

export { IonCardTitle, defineCustomElement };

//# sourceMappingURL=ion-card-title.js.map