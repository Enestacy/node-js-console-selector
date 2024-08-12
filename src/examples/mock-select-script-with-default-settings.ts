import { list } from "../list";

async function bootstrap() {
  await list({
    message: "Select your favourite pet",
    options: ["cat", "dog", "rat", "humster"],
  });
}

bootstrap();
