import { SlashCommandBuilder } from "discord.js";
import { getWatchedUsers } from "../features/storage.js";
import { Command } from "../utils/types.js";

export const GetWatchList: Command = {
  commandBuilder: new SlashCommandBuilder()
    .setName("get-watch-list")
    .setDescription("Will return the list of watched users."),

  commandProcessor: async (interaction) => {
    const watchList = getWatchedUsers();

    let response = "Here is the list:";
    Object.values(watchList).forEach((watch) => {
      response += `\nUser: <@${watch.userId}>`;
      response += `; By <@${watch.callerId}>`;
      if (watch.reason) {
        response += `; Reason: "${watch.reason}"`;
      }
    });

    await interaction.reply(response);
  },
};
