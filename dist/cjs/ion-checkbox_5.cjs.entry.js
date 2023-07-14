'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const formController = require('./form-controller-c065967e.js');
const helpers = require('./helpers-dd52ecee.js');
const index$1 = require('./index-e56e09b8.js');
const theme = require('./theme-b0b295c1.js');

const checkboxIosCss = ":host{--checkbox-background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;cursor:pointer;user-select:none;z-index:2}:host(.in-item){width:100%;height:100%}:host([slot=start]:not(.legacy-checkbox)),:host([slot=end]:not(.legacy-checkbox)){width:auto}:host(.legacy-checkbox){width:var(--size);height:var(--size)}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}:host(.legacy-checkbox) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-checkbox) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-checkbox) label{left:0}:host-context([dir=rtl]):host(.legacy-checkbox) label,:host-context([dir=rtl]).legacy-checkbox label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-checkbox) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-checkbox) label::-moz-focus-inner{border:0}.checkbox-wrapper{display:flex;flex-grow:1;align-items:center;height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.native-wrapper{display:flex;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);box-sizing:border-box}:host(.legacy-checkbox) .checkbox-icon{display:block;width:100%;height:100%}:host(:not(.legacy-checkbox)) .checkbox-icon{width:var(--size);height:var(--size)}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-justify-space-between) .checkbox-wrapper{justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{justify-content:end}:host(.checkbox-label-placement-start) .checkbox-wrapper{flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-end) .checkbox-wrapper{flex-direction:row-reverse}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:1px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.23);--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--size:26px}:host(.checkbox-disabled){opacity:0.3}:host(.in-item.legacy-checkbox){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:10px;margin-bottom:9px;display:block;position:static}:host(.in-item.legacy-checkbox[slot=start]){-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:8px;margin-bottom:8px}";

const checkboxMdCss = ":host{--checkbox-background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;cursor:pointer;user-select:none;z-index:2}:host(.in-item){width:100%;height:100%}:host([slot=start]:not(.legacy-checkbox)),:host([slot=end]:not(.legacy-checkbox)){width:auto}:host(.legacy-checkbox){width:var(--size);height:var(--size)}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}:host(.legacy-checkbox) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-checkbox) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-checkbox) label{left:0}:host-context([dir=rtl]):host(.legacy-checkbox) label,:host-context([dir=rtl]).legacy-checkbox label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-checkbox) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-checkbox) label::-moz-focus-inner{border:0}.checkbox-wrapper{display:flex;flex-grow:1;align-items:center;height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.native-wrapper{display:flex;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);box-sizing:border-box}:host(.legacy-checkbox) .checkbox-icon{display:block;width:100%;height:100%}:host(:not(.legacy-checkbox)) .checkbox-icon{width:var(--size);height:var(--size)}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-justify-space-between) .checkbox-wrapper{justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{justify-content:end}:host(.checkbox-label-placement-start) .checkbox-wrapper{flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-end) .checkbox-wrapper{flex-direction:row-reverse}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:calc(var(--size) * .125);--border-width:2px;--border-style:solid;--border-color:rgb(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--checkmark-width:3;--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--transition:background 180ms cubic-bezier(0.4, 0, 0.2, 1);--size:18px}.checkbox-icon path{stroke-dasharray:30;stroke-dashoffset:30}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{stroke-dashoffset:0;transition:stroke-dashoffset 90ms linear 90ms}:host(.legacy-checkbox.checkbox-disabled),:host(.checkbox-disabled) .label-text-wrapper{opacity:0.38}:host(.checkbox-disabled) .native-wrapper{opacity:0.63}:host(.in-item.legacy-checkbox){margin-left:0;margin-right:0;margin-top:18px;margin-bottom:18px;display:block;position:static}:host(.in-item.legacy-checkbox[slot=start]){-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px;margin-top:18px;margin-bottom:18px}";

const Checkbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionChange = index.createEvent(this, "ionChange", 7);
    this.ionFocus = index.createEvent(this, "ionFocus", 7);
    this.ionBlur = index.createEvent(this, "ionBlur", 7);
    this.ionStyle = index.createEvent(this, "ionStyle", 7);
    this.inputId = `ion-cb-${checkboxIds++}`;
    this.inheritedAttributes = {};
    // TODO(FW-3100): remove this
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    /**
     * Sets the checked property and emits
     * the ionChange event. Use this to update the
     * checked state in response to user-generated
     * actions such as a click.
     */
    this.setChecked = (state) => {
      const isChecked = (this.checked = state);
      this.ionChange.emit({
        checked: isChecked,
        value: this.value,
      });
    };
    this.toggleChecked = (ev) => {
      ev.preventDefault();
      this.setFocus();
      this.setChecked(!this.checked);
      this.indeterminate = false;
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.color = undefined;
    this.name = this.inputId;
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.value = 'on';
    this.labelPlacement = 'start';
    this.justify = 'space-between';
    this.legacy = undefined;
  }
  // TODO(FW-3100): remove this
  connectedCallback() {
    this.legacyFormController = formController.createLegacyFormController(this.el);
  }
  componentWillLoad() {
    this.emitStyle();
    // TODO(FW-3100): remove check
    if (!this.legacyFormController.hasLegacyControl()) {
      this.inheritedAttributes = Object.assign({}, helpers.inheritAriaAttributes(this.el));
    }
  }
  styleChanged() {
    this.emitStyle();
  }
  emitStyle() {
    const style = {
      'interactive-disabled': this.disabled,
    };
    // TODO(FW-3100): remove this
    if (this.legacyFormController.hasLegacyControl()) {
      style['checkbox-checked'] = this.checked;
    }
    this.ionStyle.emit(style);
  }
  setFocus() {
    if (this.focusEl) {
      this.focusEl.focus();
    }
  }
  // TODO(FW-3100): run contents of renderCheckbox directly instead
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyCheckbox() : this.renderCheckbox();
  }
  renderCheckbox() {
    const { color, checked, disabled, el, getSVGPath, indeterminate, inheritedAttributes, inputId, justify, labelPlacement, name, value, } = this;
    const mode = ionicGlobal.getIonMode(this);
    const path = getSVGPath(mode, indeterminate);
    helpers.renderHiddenInput(true, el, name, checked ? value : '', disabled);
    return (index.h(index.Host, { class: theme.createColorClasses(color, {
        [mode]: true,
        'in-item': theme.hostContext('ion-item', el),
        'checkbox-checked': checked,
        'checkbox-disabled': disabled,
        'checkbox-indeterminate': indeterminate,
        interactive: true,
        [`checkbox-justify-${justify}`]: true,
        [`checkbox-label-placement-${labelPlacement}`]: true,
      }) }, index.h("label", { class: "checkbox-wrapper" }, index.h("input", Object.assign({ type: "checkbox", checked: checked ? true : undefined, disabled: disabled, id: inputId, onChange: this.toggleChecked, onFocus: () => this.onFocus(), onBlur: () => this.onBlur(), ref: (focusEl) => (this.focusEl = focusEl) }, inheritedAttributes)), index.h("div", { class: {
        'label-text-wrapper': true,
        'label-text-wrapper-hidden': el.textContent === '',
      } }, index.h("slot", null)), index.h("div", { class: "native-wrapper" }, index.h("svg", { class: "checkbox-icon", viewBox: "0 0 24 24", part: "container" }, path)))));
  }
  // TODO(FW-3100): remove this
  renderLegacyCheckbox() {
    if (!this.hasLoggedDeprecationWarning) {
      index$1.printIonWarning(`ion-checkbox now requires providing a label with either the default slot or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the component or the "aria-label" attribute.

Example: <ion-checkbox>Label</ion-checkbox>
Example with aria-label: <ion-checkbox aria-label="Label"></ion-checkbox>

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
      if (this.legacy) {
        index$1.printIonWarning(`ion-checkbox is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.
Developers can dismiss this warning by removing their usage of the "legacy" property and using the new checkbox syntax.`, this.el);
      }
      this.hasLoggedDeprecationWarning = true;
    }
    const { color, checked, disabled, el, getSVGPath, indeterminate, inputId, name, value } = this;
    const mode = ionicGlobal.getIonMode(this);
    const { label, labelId, labelText } = helpers.getAriaLabel(el, inputId);
    const path = getSVGPath(mode, indeterminate);
    helpers.renderHiddenInput(true, el, name, checked ? value : '', disabled);
    return (index.h(index.Host, { "aria-labelledby": label ? labelId : null, "aria-checked": `${checked}`, "aria-hidden": disabled ? 'true' : null, role: "checkbox", class: theme.createColorClasses(color, {
        [mode]: true,
        'in-item': theme.hostContext('ion-item', el),
        'checkbox-checked': checked,
        'checkbox-disabled': disabled,
        'checkbox-indeterminate': indeterminate,
        'legacy-checkbox': true,
        interactive: true,
      }) }, index.h("svg", { class: "checkbox-icon", viewBox: "0 0 24 24", part: "container" }, path), index.h("label", { htmlFor: inputId }, labelText), index.h("input", { type: "checkbox", "aria-checked": `${checked}`, disabled: disabled, id: inputId, onChange: this.toggleChecked, onFocus: () => this.onFocus(), onBlur: () => this.onBlur(), ref: (focusEl) => (this.focusEl = focusEl) })));
  }
  getSVGPath(mode, indeterminate) {
    let path = indeterminate ? (index.h("path", { d: "M6 12L18 12", part: "mark" })) : (index.h("path", { d: "M5.9,12.5l3.8,3.8l8.8-8.8", part: "mark" }));
    if (mode === 'md') {
      path = indeterminate ? (index.h("path", { d: "M2 12H22", part: "mark" })) : (index.h("path", { d: "M1.73,12.91 8.1,19.28 22.79,4.59", part: "mark" }));
    }
    return path;
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["styleChanged"],
    "disabled": ["styleChanged"]
  }; }
};
let checkboxIds = 0;
Checkbox.style = {
  ios: checkboxIosCss,
  md: checkboxMdCss
};

const listIosCss = "ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-ios{background:var(--ion-item-background, var(--ion-background-color, #fff))}.list-ios.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:10px}.list-ios.list-inset ion-item:last-child{--border-width:0;--inner-border-width:0}.list-ios.list-inset+ion-list.list-inset{margin-top:0}.list-ios-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-ios-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 0.55px 0}.list-ios-lines-inset .item-lines-default{--inner-border-width:0 0 0.55px 0;--border-width:0px}ion-card .list-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const listMdCss = "ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;background:var(--ion-item-background, var(--ion-background-color, #fff))}@supports (inset-inline-start: 0){.list-md>.input:last-child::after{inset-inline-start:0}}@supports not (inset-inline-start: 0){.list-md>.input:last-child::after{left:0}:host-context([dir=rtl]) .list-md>.input:last-child::after{left:unset;right:unset;right:0}[dir=rtl] .list-md>.input:last-child::after{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){.list-md>.input:last-child::after:dir(rtl){left:unset;right:unset;right:0}}}.list-md.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:2px}.list-md.list-inset ion-item:first-child{--border-radius:2px 2px 0 0}.list-md.list-inset ion-item:last-child{--border-radius:0 0 2px, 2px;--border-width:0;--inner-border-width:0}.list-md.list-inset+ion-list.list-inset{margin-top:0}.list-md-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-md-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 1px 0}.list-md-lines-inset .item-lines-default{--inner-border-width:0 0 1px 0;--border-width:0px}ion-card .list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const List = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.lines = undefined;
    this.inset = false;
  }
  /**
   * If `ion-item-sliding` are used inside the list, this method closes
   * any open sliding item.
   *
   * Returns `true` if an actual `ion-item-sliding` is closed.
   */
  async closeSlidingItems() {
    const item = this.el.querySelector('ion-item-sliding');
    if (item === null || item === void 0 ? void 0 : item.closeOpened) {
      return item.closeOpened();
    }
    return false;
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    const { lines, inset } = this;
    return (index.h(index.Host, { role: "list", class: {
        [mode]: true,
        // Used internally for styling
        [`list-${mode}`]: true,
        'list-inset': inset,
        [`list-lines-${lines}`]: lines !== undefined,
        [`list-${mode}-lines-${lines}`]: lines !== undefined,
      } }));
  }
  get el() { return index.getElement(this); }
};
List.style = {
  ios: listIosCss,
  md: listMdCss
};

const listHeaderIosCss = ":host{--border-style:solid;--border-width:0;--inner-border-width:0;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:flex;align-items:center;justify-content:space-between;width:100%;min-height:40px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);overflow:hidden}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.list-header-inner{display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);overflow:inherit;box-sizing:border-box}::slotted(ion-label){flex:1 1 auto}:host(.list-header-lines-inset),:host(.list-header-lines-none){--border-width:0}:host(.list-header-lines-full),:host(.list-header-lines-none){--inner-border-width:0}:host{--background:transparent;--color:var(--ion-color-step-850, #262626);--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));-webkit-padding-start:calc(var(--ion-safe-area-left, 0px) + 16px);padding-inline-start:calc(var(--ion-safe-area-left, 0px) + 16px);position:relative;align-items:flex-end;font-size:22px;font-weight:700;letter-spacing:0}::slotted(ion-button),::slotted(ion-label){margin-top:29px;margin-bottom:6px}::slotted(ion-button){-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:3px;margin-inline-end:3px;height:1.4em}:host(.list-header-lines-full){--border-width:0 0 0.55px 0}:host(.list-header-lines-inset){--inner-border-width:0 0 0.55px 0}";

const listHeaderMdCss = ":host{--border-style:solid;--border-width:0;--inner-border-width:0;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:flex;align-items:center;justify-content:space-between;width:100%;min-height:40px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);overflow:hidden}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.list-header-inner{display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);overflow:inherit;box-sizing:border-box}::slotted(ion-label){flex:1 1 auto}:host(.list-header-lines-inset),:host(.list-header-lines-none){--border-width:0}:host(.list-header-lines-full),:host(.list-header-lines-none){--inner-border-width:0}:host{--background:transparent;--color:var(--ion-text-color, #000);--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));-webkit-padding-start:calc(var(--ion-safe-area-left, 0) + 16px);padding-inline-start:calc(var(--ion-safe-area-left, 0) + 16px);min-height:45px;font-size:14px}:host(.list-header-lines-full){--border-width:0 0 1px 0}:host(.list-header-lines-inset){--inner-border-width:0 0 1px 0}";

const ListHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.color = undefined;
    this.lines = undefined;
  }
  render() {
    const { lines } = this;
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: theme.createColorClasses(this.color, {
        [mode]: true,
        [`list-header-lines-${lines}`]: lines !== undefined,
      }) }, index.h("div", { class: "list-header-inner" }, index.h("slot", null))));
  }
};
ListHeader.style = {
  ios: listHeaderIosCss,
  md: listHeaderMdCss
};

const radioIosCss = ":host{--inner-border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;max-width:100%;min-height:inherit;user-select:none;z-index:2}:host(:not(.legacy-radio)){cursor:pointer}:host(.radio-disabled){pointer-events:none}.radio-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{box-sizing:border-box}:host(.legacy-radio) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-radio) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-radio) label{left:0}:host-context([dir=rtl]):host(.legacy-radio) label,:host-context([dir=rtl]).legacy-radio label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-radio) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-radio) label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item:not(.legacy-radio)){width:100%;height:100%}:host([slot=start]:not(.legacy-radio)),:host([slot=end]:not(.legacy-radio)){width:auto}.radio-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{justify-content:start}:host(.radio-justify-end) .radio-wrapper{justify-content:end}:host(.radio-label-placement-start) .radio-wrapper{flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.radio-label-placement-end) .radio-wrapper{flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.radio-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px}:host{--color-checked:var(--ion-color-primary, #3880ff)}:host(.legacy-radio){width:15px;height:24px}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{-webkit-margin-start:0;margin-inline-start:0}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:0.3}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #4c8dff);content:\"\";opacity:0.2}@supports (inset-inline-start: 0){:host(.ion-focused) .radio-icon::after{inset-inline-start:-9px}}@supports not (inset-inline-start: 0){:host(.ion-focused) .radio-icon::after{left:-9px}:host-context([dir=rtl]):host(.ion-focused) .radio-icon::after,:host-context([dir=rtl]).ion-focused .radio-icon::after{left:unset;right:unset;right:-9px}@supports selector(:dir(rtl)){:host(.ion-focused) .radio-icon::after:dir(rtl){left:unset;right:unset;right:-9px}}}:host(.in-item.legacy-radio){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:11px;margin-inline-end:11px;margin-top:8px;margin-bottom:8px;display:block;position:static}:host(.in-item.legacy-radio[slot=start]){-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:21px;margin-inline-end:21px;margin-top:8px;margin-bottom:8px}.native-wrapper .radio-icon{width:15px;height:24px}";

const radioMdCss = ":host{--inner-border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;max-width:100%;min-height:inherit;user-select:none;z-index:2}:host(:not(.legacy-radio)){cursor:pointer}:host(.radio-disabled){pointer-events:none}.radio-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{box-sizing:border-box}:host(.legacy-radio) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-radio) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-radio) label{left:0}:host-context([dir=rtl]):host(.legacy-radio) label,:host-context([dir=rtl]).legacy-radio label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-radio) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-radio) label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item:not(.legacy-radio)){width:100%;height:100%}:host([slot=start]:not(.legacy-radio)),:host([slot=end]:not(.legacy-radio)){width:auto}.radio-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{justify-content:start}:host(.radio-justify-end) .radio-wrapper{justify-content:end}:host(.radio-label-placement-start) .radio-wrapper{flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.radio-label-placement-end) .radio-wrapper{flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.radio-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px}:host{--color:rgb(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--color-checked:var(--ion-color-primary, #3880ff);--border-width:2px;--border-style:solid;--border-radius:50%}:host(.legacy-radio){width:20px;height:20px}:host(.ion-color) .radio-inner{background:var(--ion-color-base)}:host(.ion-color.radio-checked) .radio-icon{border-color:var(--ion-color-base)}.radio-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--color)}.radio-inner{border-radius:var(--inner-border-radius);width:calc(50% + var(--border-width));height:calc(50% + var(--border-width));transform:scale3d(0, 0, 0);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);background:var(--color-checked)}:host(.radio-checked) .radio-icon{border-color:var(--color-checked)}:host(.radio-checked) .radio-inner{transform:scale3d(1, 1, 1)}:host(.legacy-radio.radio-disabled),:host(.radio-disabled) .label-text-wrapper{opacity:0.38}:host(.radio-disabled) .native-wrapper{opacity:0.63}:host(.ion-focused.legacy-radio) .radio-icon::after{top:-12px}@supports (inset-inline-start: 0){:host(.ion-focused.legacy-radio) .radio-icon::after{inset-inline-start:-12px}}@supports not (inset-inline-start: 0){:host(.ion-focused.legacy-radio) .radio-icon::after{left:-12px}:host-context([dir=rtl]):host(.ion-focused.legacy-radio) .radio-icon::after,:host-context([dir=rtl]).ion-focused.legacy-radio .radio-icon::after{left:unset;right:unset;right:-12px}@supports selector(:dir(rtl)){:host(.ion-focused.legacy-radio) .radio-icon::after:dir(rtl){left:unset;right:unset;right:-12px}}}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #4c8dff);content:\"\";opacity:0.2}:host(.in-item.legacy-radio){margin-left:0;margin-right:0;margin-top:9px;margin-bottom:9px;display:block;position:static}:host(.in-item.legacy-radio[slot=start]){-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px;margin-top:11px;margin-bottom:10px}.native-wrapper .radio-icon{width:20px;height:20px}";

const Radio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionStyle = index.createEvent(this, "ionStyle", 7);
    this.ionFocus = index.createEvent(this, "ionFocus", 7);
    this.ionBlur = index.createEvent(this, "ionBlur", 7);
    this.inputId = `ion-rb-${radioButtonIds++}`;
    this.radioGroup = null;
    this.inheritedAttributes = {};
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    this.updateState = () => {
      if (this.radioGroup) {
        this.checked = this.radioGroup.value === this.value;
      }
    };
    this.onClick = () => {
      this.checked = this.nativeInput.checked;
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.checked = false;
    this.buttonTabindex = -1;
    this.color = undefined;
    this.name = this.inputId;
    this.disabled = false;
    this.value = undefined;
    this.labelPlacement = 'start';
    this.legacy = undefined;
    this.justify = 'space-between';
  }
  valueChanged() {
    /**
     * The new value of the radio may
     * match the radio group's value,
     * so we see if it should be checked.
     */
    this.updateState();
  }
  /** @internal */
  async setFocus(ev) {
    // TODO(FW-2832): type (using Event triggers a build error due to conflict with Stencil Event import)
    ev.stopPropagation();
    ev.preventDefault();
    const element = this.legacyFormController.hasLegacyControl() ? this.el : this.nativeInput;
    element.focus();
  }
  /** @internal */
  async setButtonTabindex(value) {
    this.buttonTabindex = value;
  }
  connectedCallback() {
    this.legacyFormController = formController.createLegacyFormController(this.el);
    if (this.value === undefined) {
      this.value = this.inputId;
    }
    const radioGroup = (this.radioGroup = this.el.closest('ion-radio-group'));
    if (radioGroup) {
      this.updateState();
      helpers.addEventListener(radioGroup, 'ionValueChange', this.updateState);
    }
  }
  disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      helpers.removeEventListener(radioGroup, 'ionValueChange', this.updateState);
      this.radioGroup = null;
    }
  }
  componentWillLoad() {
    this.emitStyle();
    if (!this.legacyFormController.hasLegacyControl()) {
      this.inheritedAttributes = Object.assign({}, helpers.inheritAriaAttributes(this.el));
    }
  }
  styleChanged() {
    this.emitStyle();
  }
  emitStyle() {
    const style = {
      'interactive-disabled': this.disabled,
    };
    if (this.legacyFormController.hasLegacyControl()) {
      style['radio-checked'] = this.checked;
    }
    this.ionStyle.emit(style);
  }
  get hasLabel() {
    return this.el.textContent !== '';
  }
  renderRadioControl() {
    return (index.h("div", { class: "radio-icon", part: "container" }, index.h("div", { class: "radio-inner", part: "mark" }), index.h("div", { class: "radio-ripple" })));
  }
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyRadio() : this.renderRadio();
  }
  renderRadio() {
    const { checked, disabled, inputId, color, el, justify, labelPlacement, inheritedAttributes, hasLabel, buttonTabindex, } = this;
    const mode = ionicGlobal.getIonMode(this);
    const inItem = theme.hostContext('ion-item', el);
    return (index.h(index.Host, { onClick: this.onClick, class: theme.createColorClasses(color, {
        [mode]: true,
        'in-item': inItem,
        'radio-checked': checked,
        'radio-disabled': disabled,
        [`radio-justify-${justify}`]: true,
        [`radio-label-placement-${labelPlacement}`]: true,
        // Focus and active styling should not apply when the radio is in an item
        'ion-activatable': !inItem,
        'ion-focusable': !inItem,
      }) }, index.h("label", { class: "radio-wrapper" }, index.h("input", Object.assign({ type: "radio", checked: checked, disabled: disabled, id: inputId, tabindex: buttonTabindex, ref: (nativeEl) => (this.nativeInput = nativeEl) }, inheritedAttributes)), index.h("div", { class: {
        'label-text-wrapper': true,
        'label-text-wrapper-hidden': !hasLabel,
      } }, index.h("slot", null)), index.h("div", { class: "native-wrapper" }, this.renderRadioControl()))));
  }
  renderLegacyRadio() {
    if (!this.hasLoggedDeprecationWarning) {
      index$1.printIonWarning(`ion-radio now requires providing a label with either the default slot or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the component or the "aria-label" attribute.

Example: <ion-radio>Option Label</ion-radio>
Example with aria-label: <ion-radio aria-label="Option Label"></ion-radio>

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
      if (this.legacy) {
        index$1.printIonWarning(`ion-radio is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.

Developers can dismiss this warning by removing their usage of the "legacy" property and using the new radio syntax.`, this.el);
      }
      this.hasLoggedDeprecationWarning = true;
    }
    const { inputId, disabled, checked, color, el, buttonTabindex } = this;
    const mode = ionicGlobal.getIonMode(this);
    const { label, labelId, labelText } = helpers.getAriaLabel(el, inputId);
    return (index.h(index.Host, { "aria-checked": `${checked}`, "aria-hidden": disabled ? 'true' : null, "aria-labelledby": label ? labelId : null, role: "radio", tabindex: buttonTabindex, onFocus: this.onFocus, onBlur: this.onBlur, onClick: this.onClick, class: theme.createColorClasses(color, {
        [mode]: true,
        'in-item': theme.hostContext('ion-item', el),
        interactive: true,
        'radio-checked': checked,
        'radio-disabled': disabled,
        'legacy-radio': true,
      }) }, this.renderRadioControl(), index.h("label", { htmlFor: inputId }, labelText), index.h("input", { type: "radio", checked: checked, disabled: disabled, tabindex: "-1", id: inputId, ref: (nativeEl) => (this.nativeInput = nativeEl) })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"],
    "checked": ["styleChanged"],
    "color": ["styleChanged"],
    "disabled": ["styleChanged"]
  }; }
};
let radioButtonIds = 0;
Radio.style = {
  ios: radioIosCss,
  md: radioMdCss
};

const RadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionChange = index.createEvent(this, "ionChange", 7);
    this.ionValueChange = index.createEvent(this, "ionValueChange", 7);
    this.inputId = `ion-rg-${radioGroupIds++}`;
    this.labelId = `${this.inputId}-lbl`;
    this.setRadioTabindex = (value) => {
      const radios = this.getRadios();
      // Get the first radio that is not disabled and the checked one
      const first = radios.find((radio) => !radio.disabled);
      const checked = radios.find((radio) => radio.value === value && !radio.disabled);
      if (!first && !checked) {
        return;
      }
      // If an enabled checked radio exists, set it to be the focusable radio
      // otherwise we default to focus the first radio
      const focusable = checked || first;
      for (const radio of radios) {
        const tabindex = radio === focusable ? 0 : -1;
        radio.setButtonTabindex(tabindex);
      }
    };
    this.onClick = (ev) => {
      ev.preventDefault();
      /**
       * The Radio Group component mandates that only one radio button
       * within the group can be selected at any given time. Since `ion-radio`
       * is a shadow DOM component, it cannot natively perform this behavior
       * using the `name` attribute.
       */
      const selectedRadio = ev.target && ev.target.closest('ion-radio');
      if (selectedRadio) {
        const currentValue = this.value;
        const newValue = selectedRadio.value;
        if (newValue !== currentValue) {
          this.value = newValue;
          this.emitValueChange(ev);
        }
        else if (this.allowEmptySelection) {
          this.value = undefined;
          this.emitValueChange(ev);
        }
      }
    };
    this.allowEmptySelection = false;
    this.name = this.inputId;
    this.value = undefined;
  }
  valueChanged(value) {
    this.setRadioTabindex(value);
    this.ionValueChange.emit({ value });
  }
  componentDidLoad() {
    this.setRadioTabindex(this.value);
  }
  async connectedCallback() {
    // Get the list header if it exists and set the id
    // this is used to set aria-labelledby
    const header = this.el.querySelector('ion-list-header') || this.el.querySelector('ion-item-divider');
    if (header) {
      const label = (this.label = header.querySelector('ion-label'));
      if (label) {
        this.labelId = label.id = this.name + '-lbl';
      }
    }
  }
  getRadios() {
    return Array.from(this.el.querySelectorAll('ion-radio'));
  }
  /**
   * Emits an `ionChange` event.
   *
   * This API should be called for user committed changes.
   * This API should not be used for external value changes.
   */
  emitValueChange(event) {
    const { value } = this;
    this.ionChange.emit({ value, event });
  }
  onKeydown(ev) {
    const inSelectPopover = !!this.el.closest('ion-select-popover');
    if (ev.target && !this.el.contains(ev.target)) {
      return;
    }
    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter((radio) => !radio.disabled);
    // Only move the radio if the current focus is in the radio group
    if (ev.target && radios.includes(ev.target)) {
      const index = radios.findIndex((radio) => radio === ev.target);
      const current = radios[index];
      let next;
      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.key)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1];
      }
      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
      }
      if (next && radios.includes(next)) {
        next.setFocus(ev);
        if (!inSelectPopover) {
          this.value = next.value;
          this.emitValueChange(ev);
        }
      }
      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
      if ([' '].includes(ev.key)) {
        const previousValue = this.value;
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value;
        if (previousValue !== this.value || this.allowEmptySelection) {
          /**
           * Value change should only be emitted if the value is different,
           * such as selecting a new radio with the space bar or if
           * the radio group allows for empty selection and the user
           * is deselecting a checked radio.
           */
          this.emitValueChange(ev);
        }
        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }
    }
  }
  render() {
    const { label, labelId, el, name, value } = this;
    const mode = ionicGlobal.getIonMode(this);
    helpers.renderHiddenInput(true, el, name, value, false);
    return index.h(index.Host, { role: "radiogroup", "aria-labelledby": label ? labelId : null, onClick: this.onClick, class: mode });
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
};
let radioGroupIds = 0;

exports.ion_checkbox = Checkbox;
exports.ion_list = List;
exports.ion_list_header = ListHeader;
exports.ion_radio = Radio;
exports.ion_radio_group = RadioGroup;

//# sourceMappingURL=ion-checkbox_5.cjs.entry.js.map