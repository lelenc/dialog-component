import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as isPlatform, g as getIonMode } from './ionic-global.js';
import { b as raf, g as getElementRoot } from './helpers.js';
import { a as hapticSelectionStart, b as hapticSelectionChanged, h as hapticSelectionEnd } from './haptic.js';
import { c as createColorClasses } from './theme.js';

const pickerColumnInternalIosCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}";

const pickerColumnInternalMdCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}";

const PickerColumnInternal = /*@__PURE__*/ proxyCustomElement(class PickerColumnInternal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ionChange = createEvent(this, "ionChange", 7);
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
      const enableHaptics = isPlatform('ios');
      const { el } = this;
      let timeout;
      let activeEl = this.activeItem;
      const scrollCallback = () => {
        raf(() => {
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
          if (!this.isScrolling) {
            enableHaptics && hapticSelectionStart();
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
            enableHaptics && hapticSelectionChanged();
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
            enableHaptics && hapticSelectionEnd();
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
      raf(() => {
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
        const oldActive = getElementRoot(this.el).querySelector(`.${PICKER_COL_ACTIVE}`);
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
    return getElementRoot(this.el).querySelector(`.picker-item[data-value="${this.value}"]:not([disabled])`);
  }
  render() {
    const { items, color, isActive, numericInput } = this;
    const mode = getIonMode(this);
    return (h(Host, { tabindex: 0, class: createColorClasses(color, {
        [mode]: true,
        ['picker-column-active']: isActive,
        ['picker-column-numeric-input']: numericInput,
      }) }, h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), items.map((item, index) => {
      return (h("button", { tabindex: "-1", class: {
          'picker-item': true,
          'picker-item-disabled': item.disabled || false,
        }, "data-value": item.value, "data-index": index, onClick: (ev) => {
          this.centerPickerItemInView(ev.target, true);
        }, disabled: item.disabled }, item.text));
    }), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0")));
  }
  get el() { return this; }
  static get watchers() { return {
    "value": ["valueChange"]
  }; }
  static get style() { return {
    ios: pickerColumnInternalIosCss,
    md: pickerColumnInternalMdCss
  }; }
}, [33, "ion-picker-column-internal", {
    "items": [16],
    "value": [1032],
    "color": [513],
    "numericInput": [4, "numeric-input"],
    "isActive": [32],
    "scrollActiveItemIntoView": [64],
    "setValue": [64]
  }]);
const PICKER_COL_ACTIVE = 'picker-item-active';
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-picker-column-internal"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-picker-column-internal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PickerColumnInternal);
      }
      break;
  } });
}

export { PickerColumnInternal as P, defineCustomElement as d };

//# sourceMappingURL=picker-column-internal.js.map