'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const theme = require('./theme-b0b295c1.js');

const itemOptionIosCss = ":host{--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.in-list.item-options-end:last-child){-webkit-padding-end:calc(0.7em + var(--ion-safe-area-right));padding-inline-end:calc(0.7em + var(--ion-safe-area-right))}:host(.in-list.item-options-start:first-child){-webkit-padding-start:calc(0.7em + var(--ion-safe-area-left));padding-inline-start:calc(0.7em + var(--ion-safe-area-left))}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;appearance:none;box-sizing:border-box}.button-inner{display:flex;flex-flow:column nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:flex;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%}::slotted(*){flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){flex-shrink:0;transition-duration:0;transition-property:none;transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:16px}:host(.ion-activated){background:var(--ion-color-primary-shade, #3171e0)}:host(.ion-color.ion-activated){background:var(--ion-color-shade)}";

const itemOptionMdCss = ":host{--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.in-list.item-options-end:last-child){-webkit-padding-end:calc(0.7em + var(--ion-safe-area-right));padding-inline-end:calc(0.7em + var(--ion-safe-area-right))}:host(.in-list.item-options-start:first-child){-webkit-padding-start:calc(0.7em + var(--ion-safe-area-left));padding-inline-start:calc(0.7em + var(--ion-safe-area-left))}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;appearance:none;box-sizing:border-box}.button-inner{display:flex;flex-flow:column nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:flex;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%}::slotted(*){flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){flex-shrink:0;transition-duration:0;transition-property:none;transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:14px;font-weight:500;text-transform:uppercase}";

const ItemOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onClick = (ev) => {
      const el = ev.target.closest('ion-item-option');
      if (el) {
        ev.preventDefault();
      }
    };
    this.color = undefined;
    this.disabled = false;
    this.download = undefined;
    this.expandable = false;
    this.href = undefined;
    this.rel = undefined;
    this.target = undefined;
    this.type = 'button';
  }
  render() {
    const { disabled, expandable, href } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const mode = ionicGlobal.getIonMode(this);
    const attrs = TagType === 'button'
      ? { type: this.type }
      : {
        download: this.download,
        href: this.href,
        target: this.target,
      };
    return (index.h(index.Host, { onClick: this.onClick, class: theme.createColorClasses(this.color, {
        [mode]: true,
        'item-option-disabled': disabled,
        'item-option-expandable': expandable,
        'ion-activatable': true,
      }) }, index.h(TagType, Object.assign({}, attrs, { class: "button-native", part: "native", disabled: disabled }), index.h("span", { class: "button-inner" }, index.h("slot", { name: "top" }), index.h("div", { class: "horizontal-wrapper" }, index.h("slot", { name: "start" }), index.h("slot", { name: "icon-only" }), index.h("slot", null), index.h("slot", { name: "end" })), index.h("slot", { name: "bottom" })), mode === 'md' && index.h("ion-ripple-effect", null))));
  }
  get el() { return index.getElement(this); }
};
ItemOption.style = {
  ios: itemOptionIosCss,
  md: itemOptionMdCss
};

exports.ion_item_option = ItemOption;

//# sourceMappingURL=ion-item-option.cjs.entry.js.map