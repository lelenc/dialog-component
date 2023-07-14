import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';

const listHeaderIosCss = ":host{--border-style:solid;--border-width:0;--inner-border-width:0;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:flex;align-items:center;justify-content:space-between;width:100%;min-height:40px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);overflow:hidden}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.list-header-inner{display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);overflow:inherit;box-sizing:border-box}::slotted(ion-label){flex:1 1 auto}:host(.list-header-lines-inset),:host(.list-header-lines-none){--border-width:0}:host(.list-header-lines-full),:host(.list-header-lines-none){--inner-border-width:0}:host{--background:transparent;--color:var(--ion-color-step-850, #262626);--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));-webkit-padding-start:calc(var(--ion-safe-area-left, 0px) + 16px);padding-inline-start:calc(var(--ion-safe-area-left, 0px) + 16px);position:relative;align-items:flex-end;font-size:22px;font-weight:700;letter-spacing:0}::slotted(ion-button),::slotted(ion-label){margin-top:29px;margin-bottom:6px}::slotted(ion-button){-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:3px;margin-inline-end:3px;height:1.4em}:host(.list-header-lines-full){--border-width:0 0 0.55px 0}:host(.list-header-lines-inset){--inner-border-width:0 0 0.55px 0}";

const listHeaderMdCss = ":host{--border-style:solid;--border-width:0;--inner-border-width:0;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:flex;align-items:center;justify-content:space-between;width:100%;min-height:40px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);overflow:hidden}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.list-header-inner{display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);overflow:inherit;box-sizing:border-box}::slotted(ion-label){flex:1 1 auto}:host(.list-header-lines-inset),:host(.list-header-lines-none){--border-width:0}:host(.list-header-lines-full),:host(.list-header-lines-none){--inner-border-width:0}:host{--background:transparent;--color:var(--ion-text-color, #000);--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));-webkit-padding-start:calc(var(--ion-safe-area-left, 0) + 16px);padding-inline-start:calc(var(--ion-safe-area-left, 0) + 16px);min-height:45px;font-size:14px}:host(.list-header-lines-full){--border-width:0 0 1px 0}:host(.list-header-lines-inset){--inner-border-width:0 0 1px 0}";

const ListHeader = /*@__PURE__*/ proxyCustomElement(class ListHeader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.color = undefined;
    this.lines = undefined;
  }
  render() {
    const { lines } = this;
    const mode = getIonMode(this);
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
        [`list-header-lines-${lines}`]: lines !== undefined,
      }) }, h("div", { class: "list-header-inner" }, h("slot", null))));
  }
  static get style() { return {
    ios: listHeaderIosCss,
    md: listHeaderMdCss
  }; }
}, [33, "ion-list-header", {
    "color": [513],
    "lines": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-list-header"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-list-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ListHeader);
      }
      break;
  } });
}

export { ListHeader as L, defineCustomElement as d };

//# sourceMappingURL=list-header.js.map