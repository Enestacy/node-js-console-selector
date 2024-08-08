import { CONSOLE_COLORS } from "../constants";
import { SelectionColor } from "../types";

export const changeTextColor = (text: string, color: SelectionColor) =>
  `\x1b[${CONSOLE_COLORS[color]}m${text}\x1b[0m`;
