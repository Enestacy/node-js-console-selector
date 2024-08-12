import { SelectOption } from "../types";

export const CONSOLE_COLORS = {
  red: 31,
  green: 32,
  blue: 34,
  yellow: 33,
};

export const SELECT_OPTIONS_DEFAULT_VALUES: Omit<
  SelectOption,
  "createOptionMenu" | "close" | "resolveSelectOption"
> = {
  selectIndex: 0,
  options: [],
  selector: "*",
  selectionColor: "green",
  isFirstTimeShown: true,
  terminateProcess: false,
};
