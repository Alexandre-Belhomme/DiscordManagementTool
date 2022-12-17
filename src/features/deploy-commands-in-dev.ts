import { commands } from "../commands/index.js";
import { makeFeatureLogger } from "../utils/logger.js";
import { REST, Routes } from "discord.js";
import {
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_DEV_GUID_ID,
} from "../utils/env.js";

const logger = makeFeatureLogger("deploy-commands-in-dev");
const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);

export async function deployCommandsInDev() {
  try {
    logger.info(
      `Started refreshing ${commands.size} (/) application commands.`
    );
    const body = commands.map((command) => command.commandBuilder);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_DEV_GUID_ID),
      { body }
    );

    logger.info(
      `Successfully reloaded (/) application commands on dev server.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    logger.error(error);
  }
}
