import { Events } from "discord.js";
import { commands } from "../commands/index.js";
import { makeFeatureLogger } from "../utils/logger.js";
import { client } from "../utils/client.js";

const logger = makeFeatureLogger("command-event-listener");

let onceLoad = false;

export function addCommandEventListener() {
  if (onceLoad) {
    throw new Error("Tried to load CommandEventListener multiple times");
  }
  onceLoad = true;

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const commandName = interaction.commandName;
    const commandLogger = logger.child({
      callerId: interaction.user.id,
      callerTag: interaction.user.tag,
      commandName,
      interractionId: interaction.id,
    });

    const command = commands.get(commandName);

    if (!command) {
      commandLogger.error(`No command matching ${commandName} was found.`);
      return;
    }

    try {
      commandLogger.info(`Command /${commandName} called`);
      await command.commandProcessor(interaction, commandLogger);
    } catch (error) {
      commandLogger.error(error);
      if (!interaction.replied) {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });
}
