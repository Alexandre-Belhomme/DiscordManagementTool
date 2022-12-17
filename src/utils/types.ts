import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Logger } from "./logger.js";

export type Command = {
  commandBuilder: SlashCommandBuilder;
  commandProcessor: (
    interaction: CommandInteraction,
    logger: Logger
  ) => Promise<void>;
};
