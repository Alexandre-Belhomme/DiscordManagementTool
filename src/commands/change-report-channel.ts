import { SlashCommandBuilder } from "discord.js";
import { saveTargetReportChannel } from "../features/storage.js";
import { client } from "../utils/client.js";
import { Command } from "../utils/types.js";

const reportChannelKey = "report-channel";

export const ChangeReportChannel: Command = {
  commandBuilder: new SlashCommandBuilder()
    .setName("change-report-channel")
    .addChannelOption((option) =>
      option
        .setRequired(true)
        .setName(reportChannelKey)
        .setDescription("The channel where the report data will be posted.")
    )
    .setDescription("Will change the report target channel."),

  commandProcessor: async (interaction, logger) => {
    const reportChannel = interaction.options.get(reportChannelKey)?.value;
    logger.info(`Follow report called with channel ID ${reportChannel}`);

    try {
      if (!reportChannel) {
        throw new Error(`The "${reportChannelKey}" option is required`);
      }
      if (typeof reportChannel !== "string") {
        throw new Error(`The "${reportChannelKey}" has to be a valid channel`);
      }

      const channel = await client.channels.fetch(reportChannel);
      logger.info(`Found channel is of type ${channel?.type}`);

      if (!channel?.isTextBased()) {
        throw new Error(
          `The "${reportChannelKey}" has to be a valid text based channel`
        );
      }

      saveTargetReportChannel(channel.id);

      await interaction.reply({
        content: `Confirmation: All new reports will be written in <#${channel.id}>`,
        ephemeral: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        await interaction.reply({
          content: `Sorry, i cannot do that. ${error.message}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `Sorry, something strange happend.`,
          ephemeral: true,
        });
      }
      logger.error(error);
    }
  },
};
