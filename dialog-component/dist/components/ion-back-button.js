import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { a as chevronBack, b as arrowBackSharp } from './index3.js';
import { c as config, g as getIonMode } from './ionic-global.js';
import { i as inheritAriaAttributes } from './helpers.js';
import { o as openURL, c as createColorClasses, h as hostContext } from './theme.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './ripple-effect.js';

const backButtonIosCss = ":host{--background:transparent;--color-focused:currentColor;--color-hover:currentColor;--icon-margin-top:0;--icon-margin-bottom:0;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--min-width:auto;--min-height:auto;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--opacity:1;--ripple-color:currentColor;--transition:background-color, opacity 100ms linear;display:none;min-width:var(--min-width);min-height:var(--min-height);color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;user-select:none;font-kerning:none}ion-ripple-effect{color:var(--ripple-color)}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.show-back-button){display:block}:host(.back-button-disabled){cursor:default;opacity:0.5;pointer-events:none}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;min-height:inherit;transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);overflow:hidden;user-select:none;z-index:0;appearance:none}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-color.ion-focused) .button-native{color:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native{color:var(--ion-color-base)}}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-hover:transparent;--background-hover-opacity:1;--background-focused:currentColor;--background-focused-opacity:.1;--border-radius:4px;--color:var(--ion-color-primary, #3880ff);--icon-margin-end:1px;--icon-margin-start:-4px;--icon-font-size:1.6em;--min-height:32px;font-size:17px}.button-native{transform:translateZ(0);overflow:visible;z-index:99}:host(.ion-activated) .button-native{opacity:0.4}@media (any-hover: hover){:host(:hover){opacity:0.6}}:host(.ion-color.ion-focused) .button-native::after{background:var(--ion-color-base)}";

const backButtonMdCss = ":host{--background:transparent;--color-focused:currentColor;--color-hover:currentColor;--icon-margin-top:0;--icon-margin-bottom:0;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--min-width:auto;--min-height:auto;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--opacity:1;--ripple-color:currentColor;--transition:background-color, opacity 100ms linear;display:none;min-width:var(--min-width);min-height:var(--min-height);color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;user-select:none;font-kerning:none}ion-ripple-effect{color:var(--ripple-color)}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.show-back-button){display:block}:host(.back-button-disabled){cursor:default;opacity:0.5;pointer-events:none}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;min-height:inherit;transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);overflow:hidden;user-select:none;z-index:0;appearance:none}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-color.ion-focused) .button-native{color:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native{color:var(--ion-color-base)}}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--border-radius:4px;--background-focused:currentColor;--background-focused-opacity:.12;--background-hover:currentColor;--background-hover-opacity:0.04;--color:currentColor;--icon-margin-end:0;--icon-margin-start:0;--icon-font-size:24px;--icon-font-weight:normal;--min-height:32px;--min-width:44px;--padding-start:12px;--padding-end:12px;font-size:14px;font-weight:500;text-transform:uppercase}:host(.back-button-has-icon-only){--border-radius:50%;min-width:48px;height:48px}.button-native{box-shadow:none}.button-text{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:0;padding-bottom:0}ion-icon{line-height:0.67;text-align:start}@media (any-hover: hover){:host(.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}:host(.ion-color.ion-focused) .button-native::after{background:var(--ion-color-base)}";

const BackButton = /*@__PURE__*/ proxyCustomElement(class BackButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.inheritedAttributes = {};
    this.onClick = async (ev) => {
      const nav = this.el.closest('ion-nav');
      ev.preventDefault();
      if (nav && (await nav.canGoBack())) {
        return nav.pop({ animationBuilder: this.routerAnimation, skipIfBusy: true });
      }
      return openURL(this.defaultHref, ev, 'back', this.routerAnimation);
    };
    this.color = undefined;
    this.defaultHref = undefined;
    this.disabled = false;
    this.icon = undefined;
    this.text = undefined;
    this.type = 'button';
    this.routerAnimation = undefined;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
    if (this.defaultHref === undefined) {
      this.defaultHref = config.get('backButtonDefaultHref');
    }
  }
  get backButtonIcon() {
    const icon = this.icon;
    if (icon != null) {
      // icon is set on the component or by the config
      return icon;
    }
    if (getIonMode(this) === 'ios') {
      // default ios back button icon
      return config.get('backButtonIcon', chevronBack);
    }
    // default md back button icon
    return config.get('backButtonIcon', arrowBackSharp);
  }
  get backButtonText() {
    const defaultBackButtonText = getIonMode(this) === 'ios' ? 'Back' : null;
    return this.text != null ? this.text : config.get('backButtonText', defaultBackButtonText);
  }
  get hasIconOnly() {
    return this.backButtonIcon && !this.backButtonText;
  }
  get rippleType() {
    // If the button only has an icon we use the unbounded
    // "circular" ripple effect
    if (this.hasIconOnly) {
      return 'unbounded';
    }
    return 'bounded';
  }
  render() {
    const { color, defaultHref, disabled, type, hasIconOnly, backButtonIcon, backButtonText, icon, inheritedAttributes, } = this;
    const showBackButton = defaultHref !== undefined;
    const mode = getIonMode(this);
    const ariaLabel = inheritedAttributes['aria-label'] || backButtonText || 'back';
    return (h(Host, { onClick: this.onClick, class: createColorClasses(color, {
        [mode]: true,
        button: true,
        'back-button-disabled': disabled,
        'back-button-has-icon-only': hasIconOnly,
        'in-toolbar': hostContext('ion-toolbar', this.el),
        'in-toolbar-color': hostContext('ion-toolbar[color]', this.el),
        'ion-activatable': true,
        'ion-focusable': true,
        'show-back-button': showBackButton,
      }) }, h("button", { type: type, disabled: disabled, class: "button-native", part: "native", "aria-label": ariaLabel }, h("span", { class: "button-inner" }, backButtonIcon && (h("ion-icon", { part: "icon", icon: backButtonIcon, "aria-hidden": "true", lazy: false, "flip-rtl": icon === undefined })), backButtonText && (h("span", { part: "text", "aria-hidden": "true", class: "button-text" }, backButtonText))), mode === 'md' && h("ion-ripple-effect", { type: this.rippleType }))));
  }
  get el() { return this; }
  static get style() { return {
    ios: backButtonIosCss,
    md: backButtonMdCss
  }; }
}, [33, "ion-back-button", {
    "color": [513],
    "defaultHref": [1025, "default-href"],
    "disabled": [516],
    "icon": [1],
    "text": [1],
    "type": [1],
    "routerAnimation": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-back-button", "ion-icon", "ion-ripple-effect"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-back-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, BackButton);
      }
      break;
    case "ion-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ion-ripple-effect":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IonBackButton = BackButton;
const defineCustomElement = defineCustomElement$1;

export { IonBackButton, defineCustomElement };

//# sourceMappingURL=ion-back-button.js.map