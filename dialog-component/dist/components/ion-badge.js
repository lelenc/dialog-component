import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const badgeIosCss = ":host{--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff);--padding-top:3px;--padding-end:8px;--padding-bottom:3px;--padding-start:8px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:inline-block;min-width:10px;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);font-size:13px;font-weight:bold;line-height:1;text-align:center;white-space:nowrap;contain:content;vertical-align:baseline}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(:empty){display:none}:host{border-radius:10px}";

const badgeMdCss = ":host{--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff);--padding-top:3px;--padding-end:8px;--padding-bottom:3px;--padding-start:8px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:inline-block;min-width:10px;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);font-size:13px;font-weight:bold;line-height:1;text-align:center;white-space:nowrap;contain:content;vertical-align:baseline}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(:empty){display:none}:host{--padding-top:3px;--padding-end:4px;--padding-bottom:4px;--padding-start:4px;border-radius:4px}";

const Badge = /*@__PURE__*/ proxyCustomElement(class Badge extends HTMLElement {
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
  static get style() { return {
    ios: badgeIosCss,
    md: badgeMdCss
  }; }
}, [33, "ion-badge", {
    "color": [513]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-badge"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-badge":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Badge);
      }
      break;
  } });
}

const IonBadge = Badge;
const defineCustomElement = defineCustomElement$1;

export { IonBadge, defineCustomElement };

//# sourceMappingURL=ion-badge.js.map