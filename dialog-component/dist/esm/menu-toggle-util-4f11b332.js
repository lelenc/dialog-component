import { m as menuController } from './index-5021de08.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
// Given a menu, return whether or not the menu toggle should be visible
const updateVisibility = async (menu) => {
  const menuEl = await menuController.get(menu);
  return !!(menuEl && (await menuEl.isActive()));
};

export { updateVisibility as u };

//# sourceMappingURL=menu-toggle-util-4f11b332.js.map