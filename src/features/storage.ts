import { existsSync, readFileSync, writeFileSync } from "fs";
import { DATABASE_PATH } from "../utils/env.js";
import { makeFeatureLogger } from "../utils/logger.js";

const logger = makeFeatureLogger("Storage");

type Watch = {
  userId: string;
  reason?: string;
  callerId: string;
};

let storageContent: {
  targetReportChannel: string | null;
  watchList: { [key: string]: Watch };
} = {
  targetReportChannel: null,
  watchList: {},
};

export function _loadDatabase() {
  logger.info("Loading database");
  if (!existsSync(DATABASE_PATH)) {
    logger.info("Database does not exist, creating");
    writeFileSync(DATABASE_PATH, JSON.stringify(storageContent));
  }
  const dbRaw = readFileSync(DATABASE_PATH, { encoding: "utf-8" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  storageContent = JSON.parse(dbRaw);
}

export function _flushDatabase() {
  logger.info("Flushing database");
  const dbRaw = JSON.stringify(storageContent);
  writeFileSync(DATABASE_PATH, dbRaw);
}

export function saveTargetReportChannel(newTarget: string) {
  logger.info("Store new target report channel to " + newTarget);
  storageContent.targetReportChannel = newTarget;
}

export function getTargetReportChannel() {
  logger.info("Fetch target report channel");
  return storageContent.targetReportChannel;
}

export function watchUser(watch: Watch) {
  logger.info("Watching user " + JSON.stringify(watch));

  if (storageContent.watchList[watch.userId]) {
    throw new Error("Someone already follows this user");
  }

  storageContent.watchList[watch.userId] = watch;
}

export function getWatchedUsers() {
  logger.info("Fetch user watchlist");
  return storageContent.watchList;
}
