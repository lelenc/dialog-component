import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';

const thumbnailCss = ":host{--size:48px;--border-radius:0;border-radius:var(--border-radius);display:block;width:var(--size);height:var(--size)}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;object-fit:cover;overflow:hidden}";

const Thumbnail = /*@__PURE__*/ proxyCustomElement(class Thumbnail extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
  static get style() { return thumbnailCss; }
}, [1, "ion-thumbnail"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-thumbnail"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-thumbnail":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Thumbnail);
      }
      break;
  } });
}

const IonThumbnail = Thumbnail;
const defineCustomElement = defineCustomElement$1;

export { IonThumbnail, defineCustomElement };

//# sourceMappingURL=ion-thumbnail.js.map