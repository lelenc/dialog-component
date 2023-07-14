import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const descriptionComponentCss = ":host{display:block}.description-container{background:var(--background-pastell-bg);border:1px solid var(--brand-main-brand);border-radius:2px;padding:0.5625rem;margin-top:1.25rem}.fade-in.top{transition:0.5s all ease-in-out;transform:translate3d(0, -50px, 0);opacity:0}";

const DescriptionComponent = /*@__PURE__*/ proxyCustomElement(class DescriptionComponent extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.data = undefined;
    this.sessionName = undefined;
    this.showContent = false;
  }
  setData(newValue) {
    this.showContent = false;
    if (newValue) {
      if (newValue.title) {
        this.title = newValue.title;
      }
      else {
        this.title = newValue.label;
      }
    }
    this.data = newValue;
    setTimeout(() => {
      this.showContent = true;
    }, 100);
    console.log("desc,setData");
  }
  render() {
    var _a, _b;
    return (h("div", { class: `fade-in top ${this.showContent ? 'show' : ''}` }, ((_a = this.data) === null || _a === void 0 ? void 0 : _a.metadata.description) && (h("div", { class: "description-container", innerHTML: (_b = this.data) === null || _b === void 0 ? void 0 : _b.metadata.description }))));
  }
  static get watchers() { return {
    "data": ["setData"]
  }; }
  static get style() { return descriptionComponentCss; }
}, [0, "description-component", {
    "data": [16],
    "sessionName": [1, "session-name"],
    "showContent": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["description-component"];
  components.forEach(tagName => { switch (tagName) {
    case "description-component":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DescriptionComponent);
      }
      break;
  } });
}

export { DescriptionComponent as D, defineCustomElement as d };

//# sourceMappingURL=description-component2.js.map