'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const helpers = require('./helpers-dd52ecee.js');
const index$1 = require('./index-e56e09b8.js');
const theme = require('./theme-b0b295c1.js');
const haptic = require('./haptic-61e2b2dd.js');

const buttonIosCss = ":host{--overflow:hidden;--ripple-color:currentColor;--border-width:initial;--border-color:initial;--border-style:initial;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--box-shadow:none;display:inline-block;width:auto;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;font-kerning:none}:host(.button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.button-solid){--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff)}:host(.button-outline){--border-color:var(--ion-color-primary, #3880ff);--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-clear){--border-width:0;--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);line-height:1;box-shadow:var(--box-shadow);contain:layout style;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;box-sizing:border-box;appearance:none}.button-native::-moz-focus-inner{border:0}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){-webkit-margin-start:-0.3em;margin-inline-start:-0.3em;-webkit-margin-end:0.3em;margin-inline-end:0.3em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=end]){-webkit-margin-start:0.3em;margin-inline-start:0.3em;-webkit-margin-end:-0.2em;margin-inline-end:-0.2em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){:host(:hover){color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-activated){color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.button-solid.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline.ion-color) .button-native{border-color:var(--ion-color-base);background:transparent;color:var(--ion-color-base)}:host(.button-clear.ion-color) .button-native{background:transparent;color:var(--ion-color-base)}:host(.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{color:var(--ion-toolbar-color, var(--color))}:host(.button-outline.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{border-color:var(--ion-toolbar-color, var(--color, var(--border-color)))}:host(.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--background));color:var(--ion-toolbar-background, var(--color))}:host(.button-outline.ion-activated.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--color));color:var(--ion-toolbar-background, var(--background), var(--ion-color-primary-contrast, #fff))}:host{--border-radius:14px;--padding-top:0;--padding-bottom:0;--padding-start:1em;--padding-end:1em;--transition:background-color, opacity 100ms linear;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:4px;margin-bottom:4px;height:3.1em;font-size:16px;font-weight:500;letter-spacing:0}:host(.in-buttons){font-size:17px;font-weight:400}:host(.button-solid){--background-activated:var(--ion-color-primary-shade, #3171e0);--background-focused:var(--ion-color-primary-shade, #3171e0);--background-hover:var(--ion-color-primary-tint, #4c8dff);--background-activated-opacity:1;--background-focused-opacity:1;--background-hover-opacity:1}:host(.button-outline){--border-radius:14px;--border-width:1px;--border-style:solid;--background-activated:var(--ion-color-primary, #3880ff);--background-focused:var(--ion-color-primary, #3880ff);--background-hover:transparent;--background-focused-opacity:.1;--color-activated:var(--ion-color-primary-contrast, #fff)}:host(.button-clear){--background-activated:transparent;--background-activated-opacity:0;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:transparent;--background-focused-opacity:.1;font-size:17px;font-weight:normal}:host(.button-large){--border-radius:16px;--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;height:3.1em;font-size:20px}:host(.button-small){--border-radius:6px;--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;height:2.1em;font-size:13px}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-strong){font-weight:600}:host(.button-outline.ion-focused.ion-color) .button-native,:host(.button-clear.ion-focused.ion-color) .button-native{color:var(--ion-color-base)}:host(.button-outline.ion-focused.ion-color) .button-native::after,:host(.button-clear.ion-focused.ion-color) .button-native::after{background:var(--ion-color-base)}:host(.button-solid.ion-color.ion-focused) .button-native::after{background:var(--ion-color-shade)}@media (any-hover: hover){:host(.button-clear:not(.ion-activated):hover),:host(.button-outline:not(.ion-activated):hover){opacity:0.6}:host(.button-clear.ion-color:hover) .button-native,:host(.button-outline.ion-color:hover) .button-native{color:var(--ion-color-base)}:host(.button-clear.ion-color:hover) .button-native::after,:host(.button-outline.ion-color:hover) .button-native::after{background:transparent}:host(.button-solid.ion-color:hover) .button-native::after{background:var(--ion-color-tint)}:host(:hover.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color):not(.ion-activated)) .button-native::after{background:#fff;opacity:0.1}}:host(.button-clear.ion-activated){opacity:0.4}:host(.button-outline.ion-activated.ion-color) .button-native{color:var(--ion-color-contrast)}:host(.button-outline.ion-activated.ion-color) .button-native::after{background:var(--ion-color-base)}:host(.button-solid.ion-color.ion-activated) .button-native::after{background:var(--ion-color-shade)}";

const buttonMdCss = ":host{--overflow:hidden;--ripple-color:currentColor;--border-width:initial;--border-color:initial;--border-style:initial;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--box-shadow:none;display:inline-block;width:auto;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;font-kerning:none}:host(.button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.button-solid){--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff)}:host(.button-outline){--border-color:var(--ion-color-primary, #3880ff);--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-clear){--border-width:0;--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);line-height:1;box-shadow:var(--box-shadow);contain:layout style;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;box-sizing:border-box;appearance:none}.button-native::-moz-focus-inner{border:0}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){-webkit-margin-start:-0.3em;margin-inline-start:-0.3em;-webkit-margin-end:0.3em;margin-inline-end:0.3em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=end]){-webkit-margin-start:0.3em;margin-inline-start:0.3em;-webkit-margin-end:-0.2em;margin-inline-end:-0.2em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){:host(:hover){color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-activated){color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.button-solid.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline.ion-color) .button-native{border-color:var(--ion-color-base);background:transparent;color:var(--ion-color-base)}:host(.button-clear.ion-color) .button-native{background:transparent;color:var(--ion-color-base)}:host(.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{color:var(--ion-toolbar-color, var(--color))}:host(.button-outline.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{border-color:var(--ion-toolbar-color, var(--color, var(--border-color)))}:host(.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--background));color:var(--ion-toolbar-background, var(--color))}:host(.button-outline.ion-activated.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--color));color:var(--ion-toolbar-background, var(--background), var(--ion-color-primary-contrast, #fff))}:host{--border-radius:4px;--padding-top:0;--padding-bottom:0;--padding-start:1.1em;--padding-end:1.1em;--transition:box-shadow 280ms cubic-bezier(.4, 0, .2, 1),\n                background-color 15ms linear,\n                color 15ms linear;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:4px;margin-bottom:4px;height:36px;font-size:14px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase}:host(.button-solid){--background-activated:transparent;--background-hover:var(--ion-color-primary-contrast, #fff);--background-focused:var(--ion-color-primary-contrast, #fff);--background-activated-opacity:0;--background-focused-opacity:.24;--background-hover-opacity:.08;--box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)}:host(.button-solid.ion-activated){--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)}:host(.button-outline){--border-width:2px;--border-style:solid;--box-shadow:none;--background-activated:transparent;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:var(--ion-color-primary, #3880ff);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04}:host(.button-outline.ion-activated.ion-color) .button-native{background:transparent}:host(.button-clear){--background-activated:transparent;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:var(--ion-color-primary, #3880ff);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-large){--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;height:2.8em;font-size:20px}:host(.button-small){--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;height:2.1em;font-size:13px}:host(.button-strong){font-weight:bold}::slotted(ion-icon[slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host(.button-solid.ion-color.ion-focused) .button-native::after{background:var(--ion-color-contrast)}:host(.button-clear.ion-color.ion-focused) .button-native::after,:host(.button-outline.ion-color.ion-focused) .button-native::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.button-solid.ion-color:hover) .button-native::after{background:var(--ion-color-contrast)}:host(.button-clear.ion-color:hover) .button-native::after,:host(.button-outline.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}";

const Button = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionFocus = index.createEvent(this, "ionFocus", 7);
    this.ionBlur = index.createEvent(this, "ionBlur", 7);
    this.inItem = false;
    this.inListHeader = false;
    this.inToolbar = false;
    this.inheritedAttributes = {};
    this.handleClick = (ev) => {
      const { el } = this;
      if (this.type === 'button') {
        theme.openURL(this.href, ev, this.routerDirection, this.routerAnimation);
      }
      else if (helpers.hasShadowDom(el)) {
        // this button wants to specifically submit a form
        // climb up the dom to see if we're in a <form>
        // and if so, then use JS to submit it
        let formEl = this.findForm();
        const { form } = this;
        if (!formEl && form !== undefined) {
          /**
           * The developer specified a form selector for
           * the button to submit, but it was not found.
           */
          if (typeof form === 'string') {
            index$1.printIonWarning(`Form with selector: "#${form}" could not be found. Verify that the id is correct and the form is rendered in the DOM.`, el);
          }
          else {
            index$1.printIonWarning(`The provided "form" element is invalid. Verify that the form is a HTMLFormElement and rendered in the DOM.`, el);
          }
          return;
        }
        if (!formEl) {
          /**
           * If the form element is not set, the button may be inside
           * of a form element. Query the closest form element to the button.
           */
          formEl = el.closest('form');
        }
        if (formEl) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          formEl.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.color = undefined;
    this.buttonType = 'button';
    this.disabled = false;
    this.expand = undefined;
    this.fill = undefined;
    this.routerDirection = 'forward';
    this.routerAnimation = undefined;
    this.download = undefined;
    this.href = undefined;
    this.rel = undefined;
    this.shape = undefined;
    this.size = undefined;
    this.strong = false;
    this.target = undefined;
    this.type = 'button';
    this.form = undefined;
  }
  componentWillLoad() {
    this.inToolbar = !!this.el.closest('ion-buttons');
    this.inListHeader = !!this.el.closest('ion-list-header');
    this.inItem = !!this.el.closest('ion-item') || !!this.el.closest('ion-item-divider');
    this.inheritedAttributes = helpers.inheritAriaAttributes(this.el);
  }
  get hasIconOnly() {
    return !!this.el.querySelector('[slot="icon-only"]');
  }
  get rippleType() {
    const hasClearFill = this.fill === undefined || this.fill === 'clear';
    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    if (hasClearFill && this.hasIconOnly && this.inToolbar) {
      return 'unbounded';
    }
    return 'bounded';
  }
  /**
   * Finds the form element based on the provided `form` selector
   * or element reference provided.
   */
  findForm() {
    const { form } = this;
    if (form instanceof HTMLFormElement) {
      return form;
    }
    if (typeof form === 'string') {
      const el = document.getElementById(form);
      if (el instanceof HTMLFormElement) {
        return el;
      }
    }
    return null;
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    const { buttonType, type, disabled, rel, target, size, href, color, expand, hasIconOnly, shape, strong, inheritedAttributes, } = this;
    const finalSize = size === undefined && this.inItem ? 'small' : size;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        download: this.download,
        href,
        rel,
        target,
      };
    let fill = this.fill;
    /**
     * We check both undefined and null to
     * work around https://github.com/ionic-team/stencil/issues/3586.
     */
    if (fill == null) {
      fill = this.inToolbar || this.inListHeader ? 'clear' : 'solid';
    }
    return (index.h(index.Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: theme.createColorClasses(color, {
        [mode]: true,
        [buttonType]: true,
        [`${buttonType}-${expand}`]: expand !== undefined,
        [`${buttonType}-${finalSize}`]: finalSize !== undefined,
        [`${buttonType}-${shape}`]: shape !== undefined,
        [`${buttonType}-${fill}`]: true,
        [`${buttonType}-strong`]: strong,
        'in-toolbar': theme.hostContext('ion-toolbar', this.el),
        'in-toolbar-color': theme.hostContext('ion-toolbar[color]', this.el),
        'in-buttons': theme.hostContext('ion-buttons', this.el),
        'button-has-icon-only': hasIconOnly,
        'button-disabled': disabled,
        'ion-activatable': true,
        'ion-focusable': true,
      }) }, index.h(TagType, Object.assign({}, attrs, { class: "button-native", part: "native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }, inheritedAttributes), index.h("span", { class: "button-inner" }, index.h("slot", { name: "icon-only" }), index.h("slot", { name: "start" }), index.h("slot", null), index.h("slot", { name: "end" })), mode === 'md' && index.h("ion-ripple-effect", { type: this.rippleType }))));
  }
  get el() { return index.getElement(this); }
};
Button.style = {
  ios: buttonIosCss,
  md: buttonMdCss
};

const buttonsIosCss = ".sc-ion-buttons-ios-h{display:flex;align-items:center;transform:translateZ(0);z-index:99}.sc-ion-buttons-ios-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-ios-s ion-button{--padding-start:5px;--padding-end:5px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;height:32px}.sc-ion-buttons-ios-s ion-button:not(.button-round){--border-radius:4px}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button{--color:initial;--border-color:initial;--background-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-solid,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-solid{--background:var(--ion-color-contrast);--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12;--background-hover:var(--ion-color-base);--background-hover-opacity:0.45;--color:var(--ion-color-base);--color-focused:var(--ion-color-base)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-clear,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-clear{--color-activated:var(--ion-color-contrast);--color-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-outline,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-outline{--color-activated:var(--ion-color-base);--color-focused:var(--ion-color-contrast);--background-activated:var(--ion-color-contrast)}.sc-ion-buttons-ios-s .button-clear,.sc-ion-buttons-ios-s .button-outline{--background-activated:transparent;--background-focused:currentColor;--background-hover:transparent}.sc-ion-buttons-ios-s .button-solid:not(.ion-color){--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12}.sc-ion-buttons-ios-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:24px;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:24px;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:28px;line-height:0.67}";

const buttonsMdCss = ".sc-ion-buttons-md-h{display:flex;align-items:center;transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;--padding-start:8px;--padding-end:8px;--box-shadow:none;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;height:32px}.sc-ion-buttons-md-s ion-button:not(.button-round){--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button{--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-solid,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-solid{--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-outline,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-outline{--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s .button-has-icon-only.button-clear{--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:48px;height:48px}.sc-ion-buttons-md-s .button{--background-hover:currentColor}.sc-ion-buttons-md-s .button-solid{--color:var(--ion-toolbar-background, var(--ion-background-color, #fff));--background:var(--ion-toolbar-color, var(--ion-text-color, #424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s .button-outline{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--border-color:currentColor}.sc-ion-buttons-md-s .button-clear{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}";

const Buttons = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.collapse = false;
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: {
        [mode]: true,
        ['buttons-collapse']: this.collapse,
      } }));
  }
};
Buttons.style = {
  ios: buttonsIosCss,
  md: buttonsMdCss
};

const pickerColumnInternalIosCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}";

const pickerColumnInternalMdCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}";

const PickerColumnInternal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionChange = index.createEvent(this, "ionChange", 7);
    this.isScrolling = false;
    this.isColumnVisible = false;
    this.canExitInputMode = true;
    this.centerPickerItemInView = (target, smooth = true, canExitInputMode = true) => {
      const { el, isColumnVisible } = this;
      if (isColumnVisible) {
        // (Vertical offset from parent) - (three empty picker rows) + (half the height of the target to ensure the scroll triggers)
        const top = target.offsetTop - 3 * target.clientHeight + target.clientHeight / 2;
        if (el.scrollTop !== top) {
          /**
           * Setting this flag prevents input
           * mode from exiting in the picker column's
           * scroll callback. This is useful when the user manually
           * taps an item or types on the keyboard as both
           * of these can cause a scroll to occur.
           */
          this.canExitInputMode = canExitInputMode;
          el.scroll({
            top,
            left: 0,
            behavior: smooth ? 'smooth' : undefined,
          });
        }
      }
    };
    /**
     * When ionInputModeChange is emitted, each column
     * needs to check if it is the one being made available
     * for text entry.
     */
    this.inputModeChange = (ev) => {
      if (!this.numericInput) {
        return;
      }
      const { useInputMode, inputModeColumn } = ev.detail;
      /**
       * If inputModeColumn is undefined then this means
       * all numericInput columns are being selected.
       */
      const isColumnActive = inputModeColumn === undefined || inputModeColumn === this.el;
      if (!useInputMode || !isColumnActive) {
        this.setInputModeActive(false);
        return;
      }
      this.setInputModeActive(true);
    };
    /**
     * Setting isActive will cause a re-render.
     * As a result, we do not want to cause the
     * re-render mid scroll as this will cause
     * the picker column to jump back to
     * whatever value was selected at the
     * start of the scroll interaction.
     */
    this.setInputModeActive = (state) => {
      if (this.isScrolling) {
        this.scrollEndCallback = () => {
          this.isActive = state;
        };
        return;
      }
      this.isActive = state;
    };
    /**
     * When the column scrolls, the component
     * needs to determine which item is centered
     * in the view and will emit an ionChange with
     * the item object.
     */
    this.initializeScrollListener = () => {
      /**
       * The haptics for the wheel picker are
       * an iOS-only feature. As a result, they should
       * be disabled on Android.
       */
      const enableHaptics = ionicGlobal.isPlatform('ios');
      const { el } = this;
      let timeout;
      let activeEl = this.activeItem;
      const scrollCallback = () => {
        helpers.raf(() => {
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
          if (!this.isScrolling) {
            enableHaptics && haptic.hapticSelectionStart();
            this.isScrolling = true;
          }
          /**
           * Select item in the center of the column
           * which is the month/year that we want to select
           */
          const bbox = el.getBoundingClientRect();
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;
          const activeElement = el.shadowRoot.elementFromPoint(centerX, centerY);
          if (activeEl !== null) {
            activeEl.classList.remove(PICKER_COL_ACTIVE);
          }
          if (activeElement === null || activeElement.disabled) {
            return;
          }
          /**
           * If we are selecting a new value,
           * we need to run haptics again.
           */
          if (activeElement !== activeEl) {
            enableHaptics && haptic.hapticSelectionChanged();
            if (this.canExitInputMode) {
              /**
               * The native iOS wheel picker
               * only dismisses the keyboard
               * once the selected item has changed
               * as a result of a swipe
               * from the user. If `canExitInputMode` is
               * `false` then this means that the
               * scroll is happening as a result of
               * the `value` property programmatically changing
               * either by an application or by the user via the keyboard.
               */
              this.exitInputMode();
            }
          }
          activeEl = activeElement;
          activeElement.classList.add(PICKER_COL_ACTIVE);
          timeout = setTimeout(() => {
            this.isScrolling = false;
            enableHaptics && haptic.hapticSelectionEnd();
            /**
             * Certain tasks (such as those that
             * cause re-renders) should only be done
             * once scrolling has finished, otherwise
             * flickering may occur.
             */
            const { scrollEndCallback } = this;
            if (scrollEndCallback) {
              scrollEndCallback();
              this.scrollEndCallback = undefined;
            }
            /**
             * Reset this flag as the
             * next scroll interaction could
             * be a scroll from the user. In this
             * case, we should exit input mode.
             */
            this.canExitInputMode = true;
            const dataIndex = activeElement.getAttribute('data-index');
            /**
             * If no value it is
             * possible we hit one of the
             * empty padding columns.
             */
            if (dataIndex === null) {
              return;
            }
            const index = parseInt(dataIndex, 10);
            const selectedItem = this.items[index];
            if (selectedItem.value !== this.value) {
              this.setValue(selectedItem.value);
            }
          }, 250);
        });
      };
      /**
       * Wrap this in an raf so that the scroll callback
       * does not fire when component is initially shown.
       */
      helpers.raf(() => {
        el.addEventListener('scroll', scrollCallback);
        this.destroyScrollListener = () => {
          el.removeEventListener('scroll', scrollCallback);
        };
      });
    };
    /**
     * Tells the parent picker to
     * exit text entry mode. This is only called
     * when the selected item changes during scroll, so
     * we know that the user likely wants to scroll
     * instead of type.
     */
    this.exitInputMode = () => {
      const { parentEl } = this;
      if (parentEl == null)
        return;
      parentEl.exitInputMode();
      /**
       * setInputModeActive only takes
       * effect once scrolling stops to avoid
       * a component re-render while scrolling.
       * However, we want the visual active
       * indicator to go away immediately, so
       * we call classList.remove here.
       */
      this.el.classList.remove('picker-column-active');
    };
    this.isActive = false;
    this.items = [];
    this.value = undefined;
    this.color = 'primary';
    this.numericInput = false;
  }
  valueChange() {
    if (this.isColumnVisible) {
      /**
       * Only scroll the active item into view when the picker column
       * is actively visible to the user.
       */
      this.scrollActiveItemIntoView();
    }
  }
  /**
   * Only setup scroll listeners
   * when the picker is visible, otherwise
   * the container will have a scroll
   * height of 0px.
   */
  componentWillLoad() {
    const visibleCallback = (entries) => {
      var _a;
      const ev = entries[0];
      if (ev.isIntersecting) {
        this.isColumnVisible = true;
        /**
         * Because this initial call to scrollActiveItemIntoView has to fire before
         * the scroll listener is set up, we need to manage the active class manually.
         */
        const oldActive = helpers.getElementRoot(this.el).querySelector(`.${PICKER_COL_ACTIVE}`);
        oldActive === null || oldActive === void 0 ? void 0 : oldActive.classList.remove(PICKER_COL_ACTIVE);
        this.scrollActiveItemIntoView();
        (_a = this.activeItem) === null || _a === void 0 ? void 0 : _a.classList.add(PICKER_COL_ACTIVE);
        this.initializeScrollListener();
      }
      else {
        this.isColumnVisible = false;
        if (this.destroyScrollListener) {
          this.destroyScrollListener();
          this.destroyScrollListener = undefined;
        }
      }
    };
    new IntersectionObserver(visibleCallback, { threshold: 0.001 }).observe(this.el);
    const parentEl = (this.parentEl = this.el.closest('ion-picker-internal'));
    if (parentEl !== null) {
      // TODO(FW-2832): type
      parentEl.addEventListener('ionInputModeChange', (ev) => this.inputModeChange(ev));
    }
  }
  componentDidRender() {
    var _a;
    const { activeItem, items, isColumnVisible, value } = this;
    if (isColumnVisible) {
      if (activeItem) {
        this.scrollActiveItemIntoView();
      }
      else if (((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) !== value) {
        /**
         * If the picker column does not have an active item and the current value
         * does not match the first item in the picker column, that means
         * the value is out of bounds. In this case, we assign the value to the
         * first item to match the scroll position of the column.
         *
         */
        this.setValue(items[0].value);
      }
    }
  }
  /** @internal  */
  async scrollActiveItemIntoView() {
    const activeEl = this.activeItem;
    if (activeEl) {
      this.centerPickerItemInView(activeEl, false, false);
    }
  }
  /**
   * Sets the value prop and fires the ionChange event.
   * This is used when we need to fire ionChange from
   * user-generated events that cannot be caught with normal
   * input/change event listeners.
   * @internal
   */
  async setValue(value) {
    const { items } = this;
    this.value = value;
    const findItem = items.find((item) => item.value === value && item.disabled !== true);
    if (findItem) {
      this.ionChange.emit(findItem);
    }
  }
  get activeItem() {
    return helpers.getElementRoot(this.el).querySelector(`.picker-item[data-value="${this.value}"]:not([disabled])`);
  }
  render() {
    const { items, color, isActive, numericInput } = this;
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { tabindex: 0, class: theme.createColorClasses(color, {
        [mode]: true,
        ['picker-column-active']: isActive,
        ['picker-column-numeric-input']: numericInput,
      }) }, index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), items.map((item, index$1) => {
      return (index.h("button", { tabindex: "-1", class: {
          'picker-item': true,
          'picker-item-disabled': item.disabled || false,
        }, "data-value": item.value, "data-index": index$1, onClick: (ev) => {
          this.centerPickerItemInView(ev.target, true);
        }, disabled: item.disabled }, item.text));
    }), index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0")));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChange"]
  }; }
};
const PICKER_COL_ACTIVE = 'picker-item-active';
PickerColumnInternal.style = {
  ios: pickerColumnInternalIosCss,
  md: pickerColumnInternalMdCss
};

const pickerInternalIosCss = ":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}@supports (inset-inline-start: 0){:host .picker-before{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-before{left:0}:host-context([dir=rtl]) .picker-before{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-before:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-after{top:116px;height:84px}@supports (inset-inline-start: 0){:host .picker-after{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-after{left:0}:host-context([dir=rtl]) .picker-after{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-after:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-highlight{background:var(--ion-color-step-150, #eeeeef)}";

const pickerInternalMdCss = ":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}@supports (inset-inline-start: 0){:host .picker-before{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-before{left:0}:host-context([dir=rtl]) .picker-before{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-before:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-after{top:116px;height:84px}@supports (inset-inline-start: 0){:host .picker-after{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-after{left:0}:host-context([dir=rtl]) .picker-after{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-after:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}";

const PickerInternal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionInputModeChange = index.createEvent(this, "ionInputModeChange", 7);
    this.useInputMode = false;
    this.isInHighlightBounds = (ev) => {
      const { highlightEl } = this;
      if (!highlightEl) {
        return false;
      }
      const bbox = highlightEl.getBoundingClientRect();
      /**
       * Check to see if the user clicked
       * outside the bounds of the highlight.
       */
      const outsideX = ev.clientX < bbox.left || ev.clientX > bbox.right;
      const outsideY = ev.clientY < bbox.top || ev.clientY > bbox.bottom;
      if (outsideX || outsideY) {
        return false;
      }
      return true;
    };
    /**
     * If we are no longer focused
     * on a picker column, then we should
     * exit input mode. An exception is made
     * for the input in the picker since having
     * that focused means we are still in input mode.
     */
    this.onFocusOut = (ev) => {
      // TODO(FW-2832): type
      const { relatedTarget } = ev;
      if (!relatedTarget || (relatedTarget.tagName !== 'ION-PICKER-COLUMN-INTERNAL' && relatedTarget !== this.inputEl)) {
        this.exitInputMode();
      }
    };
    /**
     * When picker columns receive focus
     * the parent picker needs to determine
     * whether to enter/exit input mode.
     */
    this.onFocusIn = (ev) => {
      // TODO(FW-2832): type
      const { target } = ev;
      /**
       * Due to browser differences in how/when focus
       * is dispatched on certain elements, we need to
       * make sure that this function only ever runs when
       * focusing a picker column.
       */
      if (target.tagName !== 'ION-PICKER-COLUMN-INTERNAL') {
        return;
      }
      /**
       * If we have actionOnClick
       * then this means the user focused
       * a picker column via mouse or
       * touch (i.e. a PointerEvent). As a result,
       * we should not enter/exit input mode
       * until the click event has fired, which happens
       * after the `focusin` event.
       *
       * Otherwise, the user likely focused
       * the column using their keyboard and
       * we should enter/exit input mode automatically.
       */
      if (!this.actionOnClick) {
        const columnEl = target;
        const allowInput = columnEl.numericInput;
        if (allowInput) {
          this.enterInputMode(columnEl, false);
        }
        else {
          this.exitInputMode();
        }
      }
    };
    /**
     * On click we need to run an actionOnClick
     * function that has been set in onPointerDown
     * so that we enter/exit input mode correctly.
     */
    this.onClick = () => {
      const { actionOnClick } = this;
      if (actionOnClick) {
        actionOnClick();
        this.actionOnClick = undefined;
      }
    };
    /**
     * Clicking a column also focuses the column on
     * certain browsers, so we use onPointerDown
     * to tell the onFocusIn function that users
     * are trying to click the column rather than
     * focus the column using the keyboard. When the
     * user completes the click, the onClick function
     * runs and runs the actionOnClick callback.
     */
    this.onPointerDown = (ev) => {
      const { useInputMode, inputModeColumn, el } = this;
      if (this.isInHighlightBounds(ev)) {
        /**
         * If we were already in
         * input mode, then we should determine
         * if we tapped a particular column and
         * should switch to input mode for
         * that specific column.
         */
        if (useInputMode) {
          /**
           * If we tapped a picker column
           * then we should either switch to input
           * mode for that column or all columns.
           * Otherwise we should exit input mode
           * since we just tapped the highlight and
           * not a column.
           */
          if (ev.target.tagName === 'ION-PICKER-COLUMN-INTERNAL') {
            /**
             * If user taps 2 different columns
             * then we should just switch to input mode
             * for the new column rather than switching to
             * input mode for all columns.
             */
            if (inputModeColumn && inputModeColumn === ev.target) {
              this.actionOnClick = () => {
                this.enterInputMode();
              };
            }
            else {
              this.actionOnClick = () => {
                this.enterInputMode(ev.target);
              };
            }
          }
          else {
            this.actionOnClick = () => {
              this.exitInputMode();
            };
          }
          /**
           * If we were not already in
           * input mode, then we should
           * enter input mode for all columns.
           */
        }
        else {
          /**
           * If there is only 1 numeric input column
           * then we should skip multi column input.
           */
          const columns = el.querySelectorAll('ion-picker-column-internal.picker-column-numeric-input');
          const columnEl = columns.length === 1 ? ev.target : undefined;
          this.actionOnClick = () => {
            this.enterInputMode(columnEl);
          };
        }
        return;
      }
      this.actionOnClick = () => {
        this.exitInputMode();
      };
    };
    /**
     * Enters input mode to allow
     * for text entry of numeric values.
     * If on mobile, we focus a hidden input
     * field so that the on screen keyboard
     * is brought up. When tabbing using a
     * keyboard, picker columns receive an outline
     * to indicate they are focused. As a result,
     * we should not focus the hidden input as it
     * would cause the outline to go away, preventing
     * users from having any visual indication of which
     * column is focused.
     */
    this.enterInputMode = (columnEl, focusInput = true) => {
      const { inputEl, el } = this;
      if (!inputEl) {
        return;
      }
      /**
       * Only active input mode if there is at
       * least one column that accepts numeric input.
       */
      const hasInputColumn = el.querySelector('ion-picker-column-internal.picker-column-numeric-input');
      if (!hasInputColumn) {
        return;
      }
      /**
       * If columnEl is undefined then
       * it is assumed that all numeric pickers
       * are eligible for text entry.
       * (i.e. hour and minute columns)
       */
      this.useInputMode = true;
      this.inputModeColumn = columnEl;
      /**
       * Users with a keyboard and mouse can
       * activate input mode where the input is
       * focused as well as when it is not focused,
       * so we need to make sure we clean up any
       * old listeners.
       */
      if (focusInput) {
        if (this.destroyKeypressListener) {
          this.destroyKeypressListener();
          this.destroyKeypressListener = undefined;
        }
        inputEl.focus();
      }
      else {
        el.addEventListener('keypress', this.onKeyPress);
        this.destroyKeypressListener = () => {
          el.removeEventListener('keypress', this.onKeyPress);
        };
      }
      this.emitInputModeChange();
    };
    this.onKeyPress = (ev) => {
      const { inputEl } = this;
      if (!inputEl) {
        return;
      }
      const parsedValue = parseInt(ev.key, 10);
      /**
       * Only numbers should be allowed
       */
      if (!Number.isNaN(parsedValue)) {
        inputEl.value += ev.key;
        this.onInputChange();
      }
    };
    this.selectSingleColumn = () => {
      const { inputEl, inputModeColumn, singleColumnSearchTimeout } = this;
      if (!inputEl || !inputModeColumn) {
        return;
      }
      const values = inputModeColumn.items.filter((item) => item.disabled !== true);
      /**
       * If users pause for a bit, the search
       * value should be reset similar to how a
       * <select> behaves. So typing "34", waiting,
       * then typing "5" should select "05".
       */
      if (singleColumnSearchTimeout) {
        clearTimeout(singleColumnSearchTimeout);
      }
      this.singleColumnSearchTimeout = setTimeout(() => {
        inputEl.value = '';
        this.singleColumnSearchTimeout = undefined;
      }, 1000);
      /**
       * For values that are longer than 2 digits long
       * we should shift the value over 1 character
       * to the left. So typing "456" would result in "56".
       * TODO: If we want to support more than just
       * time entry, we should update this value to be
       * the max length of all of the picker items.
       */
      if (inputEl.value.length >= 3) {
        const startIndex = inputEl.value.length - 2;
        const newString = inputEl.value.substring(startIndex);
        inputEl.value = newString;
        this.selectSingleColumn();
        return;
      }
      /**
       * Checking the value of the input gets priority
       * first. For example, if the value of the input
       * is "1" and we entered "2", then the complete value
       * is "12" and we should select hour 12.
       *
       * Regex removes any leading zeros from values like "02",
       * but it keeps a single zero if there are only zeros in the string.
       * 0+(?=[1-9]) --> Match 1 or more zeros that are followed by 1-9
       * 0+(?=0$) --> Match 1 or more zeros that must be followed by one 0 and end.
       */
      const findItemFromCompleteValue = values.find(({ text }) => {
        const parsedText = text.replace(/^0+(?=[1-9])|0+(?=0$)/, '');
        return parsedText === inputEl.value;
      });
      if (findItemFromCompleteValue) {
        inputModeColumn.setValue(findItemFromCompleteValue.value);
        return;
      }
      /**
       * If we typed "56" to get minute 56, then typed "7",
       * we should select "07" as "567" is not a valid minute.
       */
      if (inputEl.value.length === 2) {
        const changedCharacter = inputEl.value.substring(inputEl.value.length - 1);
        inputEl.value = changedCharacter;
        this.selectSingleColumn();
      }
    };
    /**
     * Searches a list of column items for a particular
     * value. This is currently used for numeric values.
     * The zeroBehavior can be set to account for leading
     * or trailing zeros when looking at the item text.
     */
    this.searchColumn = (colEl, value, zeroBehavior = 'start') => {
      const behavior = zeroBehavior === 'start' ? /^0+/ : /0$/;
      const item = colEl.items.find(({ text, disabled }) => disabled !== true && text.replace(behavior, '') === value);
      if (item) {
        colEl.setValue(item.value);
      }
    };
    this.selectMultiColumn = () => {
      const { inputEl, el } = this;
      if (!inputEl) {
        return;
      }
      const numericPickers = Array.from(el.querySelectorAll('ion-picker-column-internal')).filter((col) => col.numericInput);
      const firstColumn = numericPickers[0];
      const lastColumn = numericPickers[1];
      let value = inputEl.value;
      let minuteValue;
      switch (value.length) {
        case 1:
          this.searchColumn(firstColumn, value);
          break;
        case 2:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacter = inputEl.value.substring(0, 1);
          value = firstCharacter === '0' || firstCharacter === '1' ? inputEl.value : firstCharacter;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          if (value.length === 1) {
            minuteValue = inputEl.value.substring(inputEl.value.length - 1);
            this.searchColumn(lastColumn, minuteValue, 'end');
          }
          break;
        case 3:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacterAgain = inputEl.value.substring(0, 1);
          value =
            firstCharacterAgain === '0' || firstCharacterAgain === '1'
              ? inputEl.value.substring(0, 2)
              : firstCharacterAgain;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          minuteValue = value.length === 1 ? inputEl.value.substring(1) : inputEl.value.substring(2);
          this.searchColumn(lastColumn, minuteValue, 'end');
          break;
        case 4:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacterAgainAgain = inputEl.value.substring(0, 1);
          value =
            firstCharacterAgainAgain === '0' || firstCharacterAgainAgain === '1'
              ? inputEl.value.substring(0, 2)
              : firstCharacterAgainAgain;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          const minuteValueAgain = value.length === 1
            ? inputEl.value.substring(1, inputEl.value.length)
            : inputEl.value.substring(2, inputEl.value.length);
          this.searchColumn(lastColumn, minuteValueAgain, 'end');
          break;
        default:
          const startIndex = inputEl.value.length - 4;
          const newString = inputEl.value.substring(startIndex);
          inputEl.value = newString;
          this.selectMultiColumn();
          break;
      }
    };
    /**
     * Searches the value of the active column
     * to determine which value users are trying
     * to select
     */
    this.onInputChange = () => {
      const { useInputMode, inputEl, inputModeColumn } = this;
      if (!useInputMode || !inputEl) {
        return;
      }
      if (inputModeColumn) {
        this.selectSingleColumn();
      }
      else {
        this.selectMultiColumn();
      }
    };
    /**
     * Emit ionInputModeChange. Picker columns
     * listen for this event to determine whether
     * or not their column is "active" for text input.
     */
    this.emitInputModeChange = () => {
      const { useInputMode, inputModeColumn } = this;
      this.ionInputModeChange.emit({
        useInputMode,
        inputModeColumn,
      });
    };
  }
  /**
   * When the picker is interacted with
   * we need to prevent touchstart so other
   * gestures do not fire. For example,
   * scrolling on the wheel picker
   * in ion-datetime should not cause
   * a card modal to swipe to close.
   */
  preventTouchStartPropagation(ev) {
    ev.stopPropagation();
  }
  componentWillLoad() {
    helpers.getElementRoot(this.el).addEventListener('focusin', this.onFocusIn);
    helpers.getElementRoot(this.el).addEventListener('focusout', this.onFocusOut);
  }
  /**
   * @internal
   * Exits text entry mode for the picker
   * This method blurs the hidden input
   * and cause the keyboard to dismiss.
   */
  async exitInputMode() {
    const { inputEl, useInputMode } = this;
    if (!useInputMode || !inputEl) {
      return;
    }
    this.useInputMode = false;
    this.inputModeColumn = undefined;
    inputEl.blur();
    inputEl.value = '';
    if (this.destroyKeypressListener) {
      this.destroyKeypressListener();
      this.destroyKeypressListener = undefined;
    }
    this.emitInputModeChange();
  }
  render() {
    return (index.h(index.Host, { onPointerDown: (ev) => this.onPointerDown(ev), onClick: () => this.onClick() }, index.h("input", { "aria-hidden": "true", tabindex: -1, inputmode: "numeric", type: "number", ref: (el) => (this.inputEl = el), onInput: () => this.onInputChange(), onBlur: () => this.exitInputMode() }), index.h("div", { class: "picker-before" }), index.h("div", { class: "picker-after" }), index.h("div", { class: "picker-highlight", ref: (el) => (this.highlightEl = el) }), index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
PickerInternal.style = {
  ios: pickerInternalIosCss,
  md: pickerInternalMdCss
};

exports.ion_button = Button;
exports.ion_buttons = Buttons;
exports.ion_picker_column_internal = PickerColumnInternal;
exports.ion_picker_internal = PickerInternal;

//# sourceMappingURL=ion-button_4.cjs.entry.js.map