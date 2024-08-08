import * as readline from "readline";

import { IList, SelectOption } from "./types";
import { changeTextColor } from "./helpers";

const selectOption: SelectOption = {
  selectIndex: 0,
  options: [],
  selector: "*",
  selectionColor: "green",
  isFirstTimeShown: true,
  terminateProcess: false,
  createOptionMenu: () => {
    const optionLength = selectOption.options.length;
    const cursorPointer = changeTextColor(
      selectOption.selector,
      selectOption.selectionColor
    );

    if (!selectOption.isFirstTimeShown)
      process.stdout.write(`\x1B[${optionLength}F`);

    for (let i = 0; i < optionLength; i++) {
      const option =
        i === selectOption.selectIndex
          ? `${cursorPointer} ${changeTextColor(
              selectOption.options[i],
              selectOption.selectionColor
            )}`
          : `  ${selectOption.options[i]}`;
      process.stdout.write(`\x1B[2K${option}\n`);
    }

    process.stdout.write(`\x1B[2K`);

    if (selectOption.isFirstTimeShown) {
      selectOption.isFirstTimeShown = false;
    }
  },
  resolveSelectOption: () => undefined,
  close: () => {
    process.stdin.setRawMode(false);
    selectOption.selectedOption =
      selectOption.options[selectOption.selectIndex];
    selectOption.resolveSelectOption();
    if (selectOption.terminateProcess) process.stdin.pause();
  },
};

const keyPressedHandler = (_: any, key: any) => {
  if (key) {
    const optionLength = selectOption.options.length - 1;
    if (key.name === "down" && selectOption.selectIndex < optionLength) {
      selectOption.selectIndex += 1;
      selectOption.createOptionMenu();
    } else if (key.name === "up" && selectOption.selectIndex > 0) {
      selectOption.selectIndex -= 1;
      selectOption.createOptionMenu();
    } else if (key.name === "return") {
      process.stdout.write(`\x1B[${optionLength + 1}E`);
      process.stdout.write(
        `Selected: ${selectOption.options[selectOption.selectIndex]}\n`
      );
      selectOption.close();
    } else if (key.name === "escape" || (key.name === "c" && key.ctrl)) {
      process.stdout.write(`\x1B[${optionLength + 1}E`);
      selectOption.close();
    }
  }
};

const setSelectionSettings = (settingList: IList["settings"] | undefined) => {
  if (!settingList) return;

  const { selectionColor, selector, terminateProcess } = settingList;

  if (selectionColor) {
    selectOption.selectionColor = selectionColor;
  }

  if (selector) {
    selectOption.selector = selector;
  }

  if (terminateProcess) {
    selectOption.terminateProcess = terminateProcess;
  }
};

export async function list({
  options,
  message,
  settings,
}: IList): Promise<string | undefined> {
  return new Promise((resolve) => {
    selectOption.resolveSelectOption = () =>
      resolve(selectOption.selectedOption || undefined);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    readline.emitKeypressEvents(process.stdin);

    process.stdout.write(`${message}\n`);

    setSelectionSettings(settings);
    selectOption.options = options;
    selectOption.createOptionMenu();

    process.stdin.on("keypress", keyPressedHandler);
  });
}
