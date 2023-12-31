import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const noteIosCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-350, #a6a6a6)}";

const noteMdCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600, #666666);font-size:14px}";

const Note = /*@__PURE__*/ proxyCustomElement(class Note extends HTMLElement {
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
    ios: noteIosCss,
    md: noteMdCss
  }; }
}, [33, "ion-note", {
    "color": [513]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-note"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-note":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Note);
      }
      break;
  } });
}

export { Note as N, defineCustomElement as d };

//# sourceMappingURL=note.js.map