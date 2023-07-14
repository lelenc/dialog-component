import { Fragment } from '../../interfaces/dialog-interfaces';
export declare class StepQuestion {
  fragment: Fragment;
  isActiveQuestion: boolean;
  showContent: boolean;
  isTooltipOpened: boolean;
  handleFragmentValueChange(): void;
  hasTooltip(): boolean;
  componentWillLoad(): Promise<void>;
  presentPopover(ev: Event): Promise<void>;
  render(): any;
}
