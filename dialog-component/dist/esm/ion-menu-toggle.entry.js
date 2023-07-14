import { r as registerInstance, h, H as Host } from './index-55cc1141.js';
import { g as getIonMode } from './ionic-global-ba51740c.js';
import { m as menuController } from './index-ec20ad67.js';
import { u as updateVisibility } from './menu-toggle-util-92e02378.js';
import './hardware-back-button-fa04d6e9.js';
import './helpers-c9d23327.js';
import './animation-61504bbe.js';
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