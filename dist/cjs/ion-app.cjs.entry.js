'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');

const appCss = "html.plt-mobile ion-app{user-select:none}html.plt-mobile ion-app [contenteditable]{user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

const App = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    {
      rIC(async () => {
        const isHybrid = ionicGlobal.isPlatform(window, 'hybrid');
        if (!ionicGlobal.config.getBoolean('_testing')) {
          Promise.resolve().then(function () { return require('./index-b86bc21b.js'); }).then((module) => module.startTapClick(ionicGlobal.config));
        }
        if (ionicGlobal.config.getBoolean('statusTap', isHybrid)) {
          Promise.resolve().then(function () { return require('./status-tap-cf5c4fea.js'); }).then((module) => module.startStatusTap());
        }
        if (ionicGlobal.config.getBoolean('inputShims', needInputShims())) {
          /**
           * needInputShims() ensures that only iOS and Android
           * platforms proceed into this block.
           */
          const platform = ionicGlobal.isPlatform(window, 'ios') ? 'ios' : 'android';
          Promise.resolve().then(function () { return require('./input-shims-10af8278.js'); }).then((module) => module.startInputShims(ionicGlobal.config, platform));
        }
        const hardwareBackButtonModule = await Promise.resolve().then(function () { return require('./hardware-back-button-92d97ff8.js'); });
        if (ionicGlobal.config.getBoolean('hardwareBackButton', isHybrid)) {
          hardwareBackButtonModule.startHardwareBackButton();
        }
        else {
          hardwareBackButtonModule.blockHardwareBackButton();
        }
        if (typeof window !== 'undefined') {
          Promise.resolve().then(function () { return require('./keyboard-ac7bd9f3.js'); }).then((module) => module.startKeyboardAssist(window));
        }
        Promise.resolve().then(function () { return require('./focus-visible-b9a2f5db.js'); }).then((module) => (this.focusVisible = module.startFocusVisible()));
      });
    }
  }
  /**
   * @internal
   * Used to set focus on an element that uses `ion-focusable`.
   * Do not use this if focusing the element as a result of a keyboard
   * event as the focus utility should handle this for us. This method
   * should be used when we want to programmatically focus an element as
   * a result of another user action. (Ex: We focus the first element
   * inside of a popover when the user presents it, but the popover is not always
   * presented as a result of keyboard action.)
   */
  async setFocus(elements) {
    if (this.focusVisible) {
      this.focusVisible.setFocus(elements);
    }
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: {
        [mode]: true,
        'ion-page': true,
        'force-statusbar-padding': ionicGlobal.config.getBoolean('_forceStatusbarPadding'),
      } }));
  }
  get el() { return index.getElement(this); }
};
const needInputShims = () => {
  /**
   * iOS always needs input shims
   */
  const needsShimsIOS = ionicGlobal.isPlatform(window, 'ios') && ionicGlobal.isPlatform(window, 'mobile');
  if (needsShimsIOS) {
    return true;
  }
  /**
   * Android only needs input shims when running
   * in the browser and only if the browser is using the
   * new Chrome 108+ resize behavior: https://developer.chrome.com/blog/viewport-resize-behavior/
   */
  const isAndroidMobileWeb = ionicGlobal.isPlatform(window, 'android') && ionicGlobal.isPlatform(window, 'mobileweb');
  if (isAndroidMobileWeb) {
    return true;
  }
  return false;
};
const rIC = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
  }
  else {
    setTimeout(callback, 32);
  }
};
App.style = appCss;

exports.ion_app = App;

//# sourceMappingURL=ion-app.cjs.entry.js.map