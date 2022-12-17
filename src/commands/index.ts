import { Collection } from "discord.js";
import { Command } from "../utils/types.js";
import { ChangeReportChannel } from "./change-report-channel.js"
import { GetReportChannel } from "./get-report-channel.js";

const internalCommands: Command[] = [
    ChangeReportChannel,
    GetReportChannel
];

export const commands = new Collection<string, Command>();

internalCommands.forEach(command => {
    commands.set(command.commandBuilder.name, command);
})
