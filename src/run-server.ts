import { loginClient } from "./utils/client.js";
import { makeFeatureLogger } from "./utils/logger.js";

import { deployCommandsInDev } from "./features/deploy-commands-in-dev.js";
import { addCommandEventListener } from "./features/add-command-event-listener.js";

const logger = makeFeatureLogger("server-runner");

logger.info("Bot is starting...");

await loginClient();

await deployCommandsInDev();

addCommandEventListener();
