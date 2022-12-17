/* eslint-disable @typescript-eslint/no-non-null-assertion */

function fetchEnv(key: string): string {
    const value = process.env[key];
    if(!value){
        throw new Error(`The env variable ${key} is not defined.`);
    }
    return value;
}

export const DISCORD_BOT_TOKEN = fetchEnv("DISCORD_BOT_TOKEN")

export const DISCORD_CLIENT_ID = fetchEnv("DISCORD_CLIENT_ID")

export const DISCORD_DEV_GUID_ID = fetchEnv("DISCORD_DEV_GUID_ID")

export const LOG_LEVEL = fetchEnv("LOG_LEVEL")

