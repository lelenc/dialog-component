import { r as registerInstance, h, H as Host, i as getElement } from './index-55cc1141.js';
import { n as caretBackSharp, o as arrowDown } from './index-d51af250.js';
import { c as config, g as getIonMode, a as isPlatform } from './ionic-global-ba51740c.js';
import { E as ENABLE_HTML_CONTENT_DEFAULT, s as sanitizeDOMString } from './config-bb224a5e.js';
import { S as SPINNERS } from './spinner-configs-e1b7c36a.js';

const RefresherContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.customHTMLEnabled = config.get('innerHTMLTemplatesEnabled', ENABLE_HTML_CONTENT_DEFAULT);
    this.pullingIcon = undefined;
    this.pullingText = undefined;
    this.refreshingSpinner = undefined;
    this.refreshingText = undefined;
  }
  componentWillLoad() {
    if (this.pullingIcon === undefined) {
      const mode = getIonMode(this);
      const overflowRefresher = this.el.style.webkitOverflowScrolling !== undefined ? 'lines' : arrowDown;
      this.pullingIcon = config.get('refreshingIcon', mode === 'ios' && isPlatform('mobile') ? config.get('spinner', overflowRefresher) : 'circular');
    }
    if (this.refreshingSpinner === undefined) {
      const mode = getIonMode(this);
      this.refreshingSpinner = config.get('refreshingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'circular'));
    }
  }
  renderPullingText() {
    const { customHTMLEnabled, pullingText } = this;
    if (customHTMLEnabled) {
      return h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(pullingText) });
    }
    return h("div", { class: "refresher-pulling-text" }, pullingText);
  }
  renderRefreshingText() {
    const { customHTMLEnabled, refreshingText } = this;
    if (customHTMLEnabled) {
      return h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(refreshingText) });
    }
    return h("div", { class: "refresher-refreshing-text" }, refreshingText);
  }
  render() {
    const pullingIcon = this.pullingIcon;
    const hasSpinner = pullingIcon != null && SPINNERS[pullingIcon] !== undefined;
    const mode = getIonMode(this);
    return (h(Host, { class: mode }, h("div", { class: "refresher-pulling" }, this.pullingIcon && hasSpinner && (h("div", { class: "refresher-pulling-icon" }, h("div", { class: "spinner-arrow-container" }, h("ion-spinner", { name: this.pullingIcon, paused: true }), mode === 'md' && this.pullingIcon === 'circular' && (h("div", { class: "arrow-container" }, h("ion-icon", { icon: caretBackSharp, "aria-hidden": "true" })))))), this.pullingIcon && !hasSpinner && (h("div", { class: "refresher-pulling-icon" }, h("ion-icon", { icon: this.pullingIcon, lazy: false, "aria-hidden": "true" }))), this.pullingText !== undefined && this.renderPullingText()), h("div", { class: "refresher-refreshing" }, this.refreshingSpinner && (h("div", { class: "refresher-refreshing-icon" }, h("ion-spinner", { name: this.refreshingSpinner }))), this.refreshingText !== undefined && this.renderRefreshingText())));
  }
  get el() { return getElement(this); }
};

export { RefresherContent as ion_refresher_content };

//# sourceMappingURL=ion-refresher-content.entry.js.map