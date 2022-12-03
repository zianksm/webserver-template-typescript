import { App } from "./app/app";

async function main() {
  const server = new App();
  await server.start();
}

main();
