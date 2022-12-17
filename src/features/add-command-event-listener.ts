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
      commandName,
      interractionId: interaction.id,
    });

    const command = commands.get(commandName);

    if (!command) {
      commandLogger.error(`No command matching ${commandName} was found.`);
      return;
    }

    try {
      commandLogger.info(
        `Command /${commandName} called by ${interaction.user.tag}`
      );
      await command.commandProcessor(interaction, commandLogger);
    } catch (error) {
      commandLogger.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
}
