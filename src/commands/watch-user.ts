import { SlashCommandBuilder } from "discord.js";
import { watchUser } from "../features/storage.js";
import { Command } from "../utils/types.js";

const followedUserKey = "followed-user";

const followedReason = "followed-reason";

export const WatchUser: Command = {
  commandBuilder: new SlashCommandBuilder()
    .setName("watch-user")
    .addUserOption((option) =>
      option
        .setRequired(true)
        .setName(followedUserKey)
        .setDescription("User that will be followed")
    )
    .addStringOption((option) =>
      option
        .setName(followedReason)
        .setDescription(
          "This is the reason to watch, will be given back as something happend."
        )
    )
    .setDescription(
      "Will watch user operations and post news in reporting channel."
    ),

  commandProcessor: async (interaction, logger) => {
    const user = interaction.options.get(followedUserKey)?.user;
    if (!user) {
      throw new Error("User parameter has to be defined");
    }

    const reason = interaction.options.get(followedReason)?.value?.toString();

    logger.info(`Command will watch user ${user?.tag} for reason "${reason}"`);

    watchUser({
      callerId: interaction.user.id,
      userId: user?.id,
      reason,
    });

    await interaction.reply({
      content: "User is now watched.",
      ephemeral: true,
    });
  },
};
