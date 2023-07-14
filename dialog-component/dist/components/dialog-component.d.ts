import type { Components, JSX } from "../types/components";

interface DialogComponent extends Components.DialogComponent, HTMLElement {}
export const DialogComponent: {
  prototype: DialogComponent;
  new (): DialogComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
