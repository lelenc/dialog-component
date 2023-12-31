'use strict';

const index = require('./index-32ab254f.js');

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
exports.KeyboardResize = void 0;
(function (KeyboardResize) {
  KeyboardResize["Body"] = "body";
  KeyboardResize["Ionic"] = "ionic";
  KeyboardResize["Native"] = "native";
  KeyboardResize["None"] = "none";
})(exports.KeyboardResize || (exports.KeyboardResize = {}));
const Keyboard = {
  getEngine() {
    var _a;
    return ((_a = index.win === null || index.win === void 0 ? void 0 : index.win.Capacitor) === null || _a === void 0 ? void 0 : _a.isPluginAvailable('Keyboard')) && (index.win === null || index.win === void 0 ? void 0 : index.win.Capacitor.Plugins.Keyboard);
  },
  getResizeMode() {
    const engine = this.getEngine();
    if (!(engine === null || engine === void 0 ? void 0 : engine.getResizeMode)) {
      return Promise.resolve(undefined);
    }
    return engine.getResizeMode().catch((e) => {
      if (e.code === 'UNIMPLEMENTED') {
        // If the native implementation is not available
        // we treat it the same as if the plugin is not available.
        return undefined;
      }
      throw e;
    });
  },
};

exports.Keyboard = Keyboard;

//# sourceMappingURL=keyboard-69ae473e.js.map