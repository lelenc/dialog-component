import type { Components, JSX } from "../types/components";

interface ResultComponent extends Components.ResultComponent, HTMLElement {}
export const ResultComponent: {
  prototype: ResultComponent;
  new (): ResultComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
