import { Result } from '../../interfaces/dialog-interfaces';
export declare class ResultComponent {
  resultD: Result;
  result: string;
  details: string[];
  tag: string;
  resultFailTags: string[];
  resultSuccessTags: string[];
  private messages;
  resultData: Result;
  locale: string;
  lastLocale: string;
  isDetailOpen: boolean;
  showContent: boolean;
  private element;
  loadMessages(): Promise<void>;
  componentWillLoad(): Promise<void>;
  setFocus(): void;
  makeResultLabel(type: string): void;
  setTag(): void;
  handleResultValueChange(): void;
  toggleDetails(): void;
  render(): any;
}
