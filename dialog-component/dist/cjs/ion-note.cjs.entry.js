'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const theme = require('./theme-b0b295c1.js');

const noteIosCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-350, #a6a6a6)}";

const noteMdCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600, #666666);font-size:14px}";

const Note = class {
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
Note.style = {
  ios: noteIosCss,
  md: noteMdCss
};

exports.ion_note = Note;

//# sourceMappingURL=ion-note.cjs.entry.js.map