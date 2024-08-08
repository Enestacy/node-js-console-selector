import { CONSOLE_COLORS } from "../constants";

export type SelectionColor = keyof typeof CONSOLE_COLORS;
export type SelectorType = "*" | ">";

export interface SelectOption {
  selectIndex: number;
  options: string[];
  selector: SelectorType;
  isFirstTimeShown: boolean;
  selectedOption?: string;
  selectionColor: SelectionColor;
  terminateProcess: boolean;
  createOptionMenu: () => void;
  close: () => void;
  resolveSelectOption: () => void | string;
}

export interface SelectorSettings {
  selector?: SelectorType;
  terminateProcess?: boolean;
  selectionColor?: SelectionColor;
}

export interface IList {
  options: string[];
  message: string;
  settings?: SelectorSettings;
}
