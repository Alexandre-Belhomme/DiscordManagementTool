import { Collection } from "discord.js";
import { Command } from "../utils/types.js";
import { ChangeReportChannel } from "./change-report-channel.js";
import { GetReportChannel } from "./get-report-channel.js";
import { GetWatchList } from "./get-watch-list.js";
import { WatchUser } from "./watch-user.js";

const internalCommands: Command[] = [
  ChangeReportChannel,
  GetReportChannel,
  WatchUser,
  GetWatchList,
];

export const commands = new Collection<string, Command>();

internalCommands.forEach((command) => {
  commands.set(command.commandBuilder.name, command);
});
