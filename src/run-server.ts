import { loginClient } from "./utils/client.js";
import { makeFeatureLogger } from "./utils/logger.js";

import { deployCommandsInDev } from "./features/deploy-commands-in-dev.js";
import { addCommandEventListener } from "./features/add-command-event-listener.js";
import { _flushDatabase, _loadDatabase } from "./features/storage.js";

const logger = makeFeatureLogger("server-runner");

logger.info("Bot is starting...");

_loadDatabase();

process.on("exit", () => {
  logger.info("Bot is exiting...");
  _flushDatabase();
});

await loginClient();

await deployCommandsInDev();

addCommandEventListener();

//gracefull exit method
logger.info("Waiting for a keyPress to exit");
const wasRaw = process.stdin.isRaw;
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.once("data", () => {
  process.stdin.pause();
  process.stdin.setRawMode(wasRaw);
  process.exit(0);
});
