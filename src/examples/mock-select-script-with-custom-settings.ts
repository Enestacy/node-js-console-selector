import { list } from "../index";

async function bootstrap() {
  await list({
    message: "First question: Select your favourite vegetable",
    options: ["tomato", "cucumber", "potato", "carrot"],
    settings: {
      selector: "*",
      selectionColor: "red",
      terminateProcess: false,
    },
  });
  await list({
    message: "Second question: Select your favourite fruit",
    options: ["apple", "mango", "banana", "kiwi", "orange"],
    settings: {
      selector: ">",
      selectionColor: "yellow",
      terminateProcess: false,
    },
  });
}

bootstrap();
