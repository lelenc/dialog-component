'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const theme = require('./theme-b0b295c1.js');

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

const Text = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.color = undefined;
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: theme.createColorClasses(this.color, {
        [mode]: true,
      }) }, index.h("slot", null)));
  }
};
Text.style = textCss;

exports.ion_text = Text;

//# sourceMappingURL=ion-text.cjs.entry.js.map