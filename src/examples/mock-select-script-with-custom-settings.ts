import { list } from "../index";

async function bootstrap() {
  await list({
    message: "Select your favourite fruit",
    options: ["apple", "mango", "banana", "kiwi", "orange"],
    settings: {
      selector: ">",
      selectionColor: "yellow",
      terminateProcess: true,
    },
  });
}

bootstrap();
