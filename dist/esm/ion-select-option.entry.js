import { r as registerInstance, h, H as Host, i as getElement } from './index-55cc1141.js';
import { g as getIonMode } from './ionic-global-ba51740c.js';

const selectOptionCss = ":host{display:none}";

const SelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputId = `ion-selopt-${selectOptionIds++}`;
    this.disabled = false;
    this.value = undefined;
  }
  render() {
    return h(Host, { role: "option", id: this.inputId, class: getIonMode(this) });
  }
  get el() { return getElement(this); }
};
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

export { SelectOption as ion_select_option };

//# sourceMappingURL=ion-select-option.entry.js.map