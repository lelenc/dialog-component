import { w as win } from './index-6e17926c.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var KeyboardResize;
(function (KeyboardResize) {
  KeyboardResize["Body"] = "body";
  KeyboardResize["Ionic"] = "ionic";
  KeyboardResize["Native"] = "native";
  KeyboardResize["None"] = "none";
})(KeyboardResize || (KeyboardResize = {}));
const Keyboard = {
  getEngine() {
    var _a;
    return ((_a = win === null || win === void 0 ? void 0 : win.Capacitor) === null || _a === void 0 ? void 0 : _a.isPluginAvailable('Keyboard')) && (win === null || win === void 0 ? void 0 : win.Capacitor.Plugins.Keyboard);
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

export { KeyboardResize as K, Keyboard as a };

//# sourceMappingURL=keyboard-0682ed8f.js.map