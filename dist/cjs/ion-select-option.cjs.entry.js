'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');

const selectOptionCss = ":host{display:none}";

const SelectOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.inputId = `ion-selopt-${selectOptionIds++}`;
    this.disabled = false;
    this.value = undefined;
  }
  render() {
    return index.h(index.Host, { role: "option", id: this.inputId, class: ionicGlobal.getIonMode(this) });
  }
  get el() { return index.getElement(this); }
};
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

exports.ion_select_option = SelectOption;

//# sourceMappingURL=ion-select-option.cjs.entry.js.map