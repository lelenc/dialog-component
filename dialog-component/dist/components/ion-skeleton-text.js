import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as config, g as getIonMode } from './ionic-global.js';
import { h as hostContext } from './theme.js';

const skeletonTextCss = ":host{--background:rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065);border-radius:var(--border-radius, inherit);display:block;width:100%;height:inherit;margin-top:4px;margin-bottom:4px;background:var(--background);line-height:10px;user-select:none;pointer-events:none}span{display:inline-block}:host(.in-media){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;height:100%}:host(.skeleton-text-animated){position:relative;background:linear-gradient(to right, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065) 8%, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.135) 18%, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065) 33%);background-size:800px 104px;animation-duration:1s;animation-fill-mode:forwards;animation-iteration-count:infinite;animation-name:shimmer;animation-timing-function:linear}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}";

const SkeletonText = /*@__PURE__*/ proxyCustomElement(class SkeletonText extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.animated = false;
  }
  render() {
    const animated = this.animated && config.getBoolean('animated', true);
    const inMedia = hostContext('ion-avatar', this.el) || hostContext('ion-thumbnail', this.el);
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'skeleton-text-animated': animated,
        'in-media': inMedia,
      } }, h("span", null, "\u00A0")));
  }
  get el() { return this; }
  static get style() { return skeletonTextCss; }
}, [1, "ion-skeleton-text", {
    "animated": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-skeleton-text"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-skeleton-text":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SkeletonText);
      }
      break;
  } });
}

const IonSkeletonText = SkeletonText;
const defineCustomElement = defineCustomElement$1;

export { IonSkeletonText, defineCustomElement };

//# sourceMappingURL=ion-skeleton-text.js.map