import { r as registerInstance, h, i as Host } from './index-998b260f.js';
import { g as getIonMode } from './ionic-global-58d19ecb.js';

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