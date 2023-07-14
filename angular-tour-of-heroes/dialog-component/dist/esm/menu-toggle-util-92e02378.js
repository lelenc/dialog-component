import { m as menuController } from './index-ec20ad67.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
// Given a menu, return whether or not the menu toggle should be visible
const updateVisibility = async (menu) => {
  const menuEl = await menuController.get(menu);
  return !!(menuEl && (await menuEl.isActive()));
};

export { updateVisibility as u };

//# sourceMappingURL=menu-toggle-util-92e02378.js.map