import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getIonMode } from './ionic-global.js';
import { G as GESTURE_CONTROLLER } from './gesture-controller.js';

const backdropIosCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";

const backdropMdCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";

const Backdrop = /*@__PURE__*/ proxyCustomElement(class Backdrop extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ionBackdropTap = createEvent(this, "ionBackdropTap", 7);
    this.blocker = GESTURE_CONTROLLER.createBlocker({
      disableScroll: true,
    });
    this.visible = true;
    this.tappable = true;
    this.stopPropagation = true;
  }
  connectedCallback() {
    if (this.stopPropagation) {
      this.blocker.block();
    }
  }
  disconnectedCallback() {
    this.blocker.unblock();
  }
  onMouseDown(ev) {
    this.emitTap(ev);
  }
  emitTap(ev) {
    if (this.stopPropagation) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (this.tappable) {
      this.ionBackdropTap.emit();
    }
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { tabindex: "-1", "aria-hidden": "true", class: {
        [mode]: true,
        'backdrop-hide': !this.visible,
        'backdrop-no-tappable': !this.tappable,
      } }));
  }
  static get style() { return {
    ios: backdropIosCss,
    md: backdropMdCss
  }; }
}, [33, "ion-backdrop", {
    "visible": [4],
    "tappable": [4],
    "stopPropagation": [4, "stop-propagation"]
  }, [[2, "click", "onMouseDown"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-backdrop"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-backdrop":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Backdrop);
      }
      break;
  } });
}

export { Backdrop as B, defineCustomElement as d };

//# sourceMappingURL=backdrop.js.map