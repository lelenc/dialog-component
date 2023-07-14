import type { Components, JSX } from "../types/components";

interface StepQuestion extends Components.StepQuestion, HTMLElement {}
export const StepQuestion: {
  prototype: StepQuestion;
  new (): StepQuestion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
