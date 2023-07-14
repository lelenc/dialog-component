'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const helpers = require('./helpers-dd52ecee.js');

const itemOptionsIosCss = "ion-item-options{top:0;right:0;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}[dir=rtl] ion-item-options{justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;justify-content:flex-end}}.item-options-start{right:auto;left:0;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{justify-content:flex-end}[dir=rtl] .item-options-start{justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){justify-content:flex-end}}.item-options-start ion-item-option:first-child{-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}.item-options-end ion-item-option:last-child{-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)))}.item-options-ios.item-options-end{border-bottom-width:0.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:0.55px}";

const itemOptionsMdCss = "ion-item-options{top:0;right:0;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}[dir=rtl] ion-item-options{justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;justify-content:flex-end}}.item-options-start{right:auto;left:0;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{justify-content:flex-end}[dir=rtl] .item-options-start{justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){justify-content:flex-end}}.item-options-start ion-item-option:first-child{-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}.item-options-end ion-item-option:last-child{-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-md{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))))}.list-md-lines-none .item-options-md{border-bottom-width:0}.list-md-lines-full .item-options-md,.list-md-lines-inset .item-options-md.item-options-end{border-bottom-width:1px}";

const ItemOptions = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionSwipe = index.createEvent(this, "ionSwipe", 7);
    this.side = 'end';
  }
  /** @internal */
  async fireSwipeEvent() {
    this.ionSwipe.emit({
      side: this.side,
    });
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    const isEnd = helpers.isEndSide(this.side);
    return (index.h(index.Host, { class: {
        [mode]: true,
        // Used internally for styling
        [`item-options-${mode}`]: true,
        'item-options-start': !isEnd,
        'item-options-end': isEnd,
      } }));
  }
  get el() { return index.getElement(this); }
};
ItemOptions.style = {
  ios: itemOptionsIosCss,
  md: itemOptionsMdCss
};

exports.ion_item_options = ItemOptions;

//# sourceMappingURL=ion-item-options.cjs.entry.js.map