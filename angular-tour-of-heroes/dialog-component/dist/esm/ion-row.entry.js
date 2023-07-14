import { r as registerInstance, h, H as Host } from './index-55cc1141.js';
import { g as getIonMode } from './ionic-global-ba51740c.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

const Row = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Row.style = rowCss;

export { Row as ion_row };

//# sourceMappingURL=ion-row.entry.js.map