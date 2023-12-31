import { EventEmitter } from '../../stencil-public-runtime';
import { Answer, Fragment } from '../../interfaces/dialog-interfaces';
export declare class StepComponent {
  private messages;
  options: string[];
  stringAnswerValue: string;
  numberAnswerValue: string;
  dateAnswerValue: string;
  localNumberAnswerValue: string;
  localStringAnswerValue: string;
  localDateAnswerValue: string;
  private element;
  fragment: Fragment;
  answerValue: any;
  controlDisabled: boolean;
  locale: string;
  lastLocale: string;
  isActive: boolean;
  isDateActive: boolean;
  showContent: boolean;
  answer: EventEmitter<Answer>;
  revokeAnswer: EventEmitter<Answer>;
  loadMessages(): Promise<void>;
  handleAnswerValueChange(newValue: string): void;
  handleFragmentValueChange(newValue: any, oldValue: any): void;
  componentWillLoad(): Promise<void>;
  private datePicker;
  componentDidLoad(): void;
  handleButtonClick(): void;
  setFocus(): void;
  render(): any;
  handleDateChange(dateString: string): void;
  padZero(value: number): string;
  onDateInput(event: InputEvent): void;
  setDateActive(): void;
  onNumberInput(event: InputEvent): void;
  checkNumberInput(event: KeyboardEvent): void;
  onStringInput(event: InputEvent): void;
  setNumberActive(): void;
  setStringActive(): void;
  menuAnswer(index: number): void;
  yesNoAnswer(value: string): void;
  numberAnswer(): void;
  stringAnswer(): void;
  dateAnswer(): void;
  yesButtonClass(): boolean;
  noButtonClass(): boolean;
  okButtonClass(): "unselected-btn" | "selected-btn";
}
