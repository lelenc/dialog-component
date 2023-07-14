import { r as registerInstance, h, i as Host } from './index-998b260f.js';
import { g as getIonMode } from './ionic-global-58d19ecb.js';
import { m as menuController } from './index-683e05ac.js';
import { u as updateVisibility } from './menu-toggle-util-91f8cc8b.js';
import './hardware-back-button-fa04d6e9.js';
import './helpers-2eaa1b44.js';
import './animation-e301e38b.js';
import './index-6e17926c.js';

const menuToggleCss = ":host(.menu-toggle-hidden){display:none}";

const MenuToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onClick = () => {
      return menuController.toggle(this.menu);
    };
    this.visible = false;
    this.menu = undefined;
    this.autoHide = true;
  }
  connectedCallback() {
    this.visibilityChanged();
  }
  async visibilityChanged() {
    this.visible = await updateVisibility(this.menu);
  }
  render() {
    const mode = getIonMode(this);
    const hidden = this.autoHide && !this.visible;
    return (h(Host, { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: {
        [mode]: true,
        'menu-toggle-hidden': hidden,
      } }, h("slot", null)));
  }
};
MenuToggle.style = menuToggleCss;

export { MenuToggle as ion_menu_toggle };

//# sourceMappingURL=ion-menu-toggle.entry.js.map