import { Client, Events } from "discord.js";
import { logger } from "../utils/logger.js";
import { DISCORD_BOT_TOKEN } from "./env.js";

export const client = new Client({
  intents: [],
});

export async function loginClient() {
  await client.login(DISCORD_BOT_TOKEN);

  // Confirm bot logged in
  client.once(Events.ClientReady, (client) => {
    logger.info(`Ready! Logged in as ${client.user.tag}`);
  });
}
