'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const index$1 = require('./index-eafee97e.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');

const reorderIosCss = ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}";

const reorderMdCss = ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}";

const Reorder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  onClick(ev) {
    const reorderGroup = this.el.closest('ion-reorder-group');
    ev.preventDefault();
    // Only stop event propagation if the reorder is inside of an enabled
    // reorder group. This allows interaction with clickable children components.
    if (!reorderGroup || !reorderGroup.disabled) {
      ev.stopImmediatePropagation();
    }
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    const reorderIcon = mode === 'ios' ? index$1.reorderThreeOutline : index$1.reorderTwoSharp;
    return (index.h(index.Host, { class: mode }, index.h("slot", null, index.h("ion-icon", { icon: reorderIcon, lazy: false, class: "reorder-icon", part: "icon", "aria-hidden": "true" }))));
  }
  get el() { return index.getElement(this); }
};
Reorder.style = {
  ios: reorderIosCss,
  md: reorderMdCss
};

exports.ion_reorder = Reorder;

//# sourceMappingURL=ion-reorder.cjs.entry.js.map