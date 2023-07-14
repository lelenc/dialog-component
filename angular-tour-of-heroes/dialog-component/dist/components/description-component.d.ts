import type { Components, JSX } from "../types/components";

interface DescriptionComponent extends Components.DescriptionComponent, HTMLElement {}
export const DescriptionComponent: {
  prototype: DescriptionComponent;
  new (): DescriptionComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
