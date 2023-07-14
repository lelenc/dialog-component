import type { Components, JSX } from "../types/components";

interface StepComponent extends Components.StepComponent, HTMLElement {}
export const StepComponent: {
  prototype: StepComponent;
  new (): StepComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
