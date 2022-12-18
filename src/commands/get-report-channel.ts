import { SlashCommandBuilder } from "discord.js";
import { getTargetReportChannel } from "../features/storage.js";
import { Command } from "../utils/types.js";

export const GetReportChannel: Command = {
  commandBuilder: new SlashCommandBuilder()
    .setName("get-report-channel")
    .setDescription(
      "Will respond what channel is currently used for reporting."
    ),

  commandProcessor: async (interaction) => {
    const channel = getTargetReportChannel();

    if (channel === null) {
      await interaction.reply({
        content:
          "The target channel isn't configured yet. Use the /change-report-channel command.",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `The target channel configured is <#${channel}>`,
      ephemeral: true,
    });
  },
};
