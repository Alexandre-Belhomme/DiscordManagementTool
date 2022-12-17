import { SlashCommandBuilder } from "discord.js";
import { Command } from "../utils/types.js";

export const GetReportChannel: Command = {
  commandBuilder: new SlashCommandBuilder()
    .setName("get-report-channel")
    .setDescription(
      "Will respond what channel is currently used for reporting."
    ),

  commandProcessor: async (interaction, logger) => {
    logger.warn("Not implemented");
    await interaction.reply({
      content: "Not implemented yet",
      ephemeral: true,
    });
  },
};
