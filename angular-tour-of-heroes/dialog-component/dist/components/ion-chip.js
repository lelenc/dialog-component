import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { c as createColorClasses } from './theme.js';
import { d as defineCustomElement$2 } from './ripple-effect.js';

const chipCss = ":host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.12);--color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.87);border-radius:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:4px;margin-inline-end:4px;margin-top:4px;margin-bottom:4px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:7px;padding-bottom:7px;display:inline-flex;position:relative;align-items:center;height:32px;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);font-size:14px;cursor:pointer;overflow:hidden;vertical-align:middle;box-sizing:border-box}:host(.chip-disabled){cursor:default;opacity:0.4;pointer-events:none}:host(.ion-color){background:rgba(var(--ion-color-base-rgb), 0.08);color:var(--ion-color-shade)}:host(.ion-color:focus){background:rgba(var(--ion-color-base-rgb), 0.12)}:host(.ion-color.ion-activated){background:rgba(var(--ion-color-base-rgb), 0.16)}:host(.chip-outline){border-width:1px;border-style:solid}:host(.chip-outline){border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.32);background:transparent}:host(.chip-outline.ion-color){border-color:rgba(var(--ion-color-base-rgb), 0.32)}:host(.chip-outline:not(.ion-color):focus){background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.04)}:host(.chip-outline.ion-activated:not(.ion-color)){background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08)}::slotted(ion-icon){font-size:20px}:host(:not(.ion-color)) ::slotted(ion-icon){color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54)}::slotted(ion-icon:first-child){-webkit-margin-start:-4px;margin-inline-start:-4px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:-4px;margin-bottom:-4px}::slotted(ion-icon:last-child){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:-4px;margin-inline-end:-4px;margin-top:-4px;margin-bottom:-4px}::slotted(ion-avatar){width:24px;height:24px}::slotted(ion-avatar:first-child){-webkit-margin-start:-8px;margin-inline-start:-8px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:-4px;margin-bottom:-4px}::slotted(ion-avatar:last-child){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:-8px;margin-inline-end:-8px;margin-top:-4px;margin-bottom:-4px}:host(:focus){outline:none}:host(:focus){--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.16)}:host(.ion-activated){--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2)}@media (any-hover: hover){:host(:hover){--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.16)}:host(.ion-color:hover){background:rgba(var(--ion-color-base-rgb), 0.12)}:host(.chip-outline:not(.ion-color):hover){background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.04)}}";

const Chip = /*@__PURE__*/ proxyCustomElement(class Chip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.color = undefined;
    this.outline = false;
    this.disabled = false;
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { "aria-disabled": this.disabled ? 'true' : null, class: createColorClasses(this.color, {
        [mode]: true,
        'chip-outline': this.outline,
        'chip-disabled': this.disabled,
        'ion-activatable': true,
      }) }, h("slot", null), mode === 'md' && h("ion-ripple-effect", null)));
  }
  static get style() { return chipCss; }
}, [1, "ion-chip", {
    "color": [513],
    "outline": [4],
    "disabled": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-chip", "ion-ripple-effect"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-chip":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Chip);
      }
      break;
    case "ion-ripple-effect":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IonChip = Chip;
const defineCustomElement = defineCustomElement$1;

export { IonChip, defineCustomElement };

//# sourceMappingURL=ion-chip.js.map