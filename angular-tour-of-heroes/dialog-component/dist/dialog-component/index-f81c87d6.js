import { j as findItemLabel } from './helpers-2eaa1b44.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * Creates a controller that tracks whether a form control is using the legacy or modern syntax. This should be removed when the legacy form control syntax is removed.
 *
 * @internal
 * @prop el: The Ionic form component to reference
 */
const createLegacyFormController = (el) => {
  const controlEl = el;
  let legacyControl;
  const hasLegacyControl = () => {
    if (legacyControl === undefined) {
      /**
       * Detect if developers are using the legacy form control syntax
       * so a deprecation warning is logged. This warning can be disabled
       * by either using the new `label` property or setting `aria-label`
       * on the control.
       * Alternatively, components that use a slot for the label
       * can check to see if the component has slotted text
       * in the light DOM.
       */
      const hasLabelProp = controlEl.label !== undefined || hasLabelSlot(controlEl);
      const hasAriaLabelAttribute = controlEl.hasAttribute('aria-label') ||
        // Shadow DOM form controls cannot use aria-labelledby
        (controlEl.hasAttribute('aria-labelledby') && controlEl.shadowRoot === null);
      const legacyItemLabel = findItemLabel(controlEl);
      /**
       * Developers can manually opt-out of the modern form markup
       * by setting `legacy="true"` on components.
       */
      legacyControl =
        controlEl.legacy === true || (!hasLabelProp && !hasAriaLabelAttribute && legacyItemLabel !== null);
    }
    return legacyControl;
  };
  return { hasLegacyControl };
};
const hasLabelSlot = (controlEl) => {
  const root = controlEl.shadowRoot;
  if (root === null) {
    return false;
  }
  /**
   * Components that have a named label slot
   * also have other slots, so we need to query for
   * anything that is explicitly passed to slot="label"
   */
  if (NAMED_LABEL_SLOT_COMPONENTS.includes(controlEl.tagName) && controlEl.querySelector('[slot="label"]') !== null) {
    return true;
  }
  /**
   * Components that have an unnamed slot for the label
   * have no other slots, so we can check the textContent
   * of the element.
   */
  if (UNNAMED_LABEL_SLOT_COMPONENTS.includes(controlEl.tagName) && controlEl.textContent !== '') {
    return true;
  }
  return false;
};
const NAMED_LABEL_SLOT_COMPONENTS = ['ION-RANGE'];
const UNNAMED_LABEL_SLOT_COMPONENTS = ['ION-TOGGLE', 'ION-CHECKBOX', 'ION-RADIO'];

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */

export { createLegacyFormController as c };

//# sourceMappingURL=index-f81c87d6.js.map