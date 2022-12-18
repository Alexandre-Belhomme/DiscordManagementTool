import { makeFeatureLogger } from "../utils/logger.js";

const logger = makeFeatureLogger("Storage");

let targetReportChannel: string | null = null;

type Watch = {
  userId: string;
  reason?: string;
  callerId: string;
};

const watchList: { [key: string]: Watch } = {};

export function saveTargetReportChannel(newTarget: string) {
  logger.info("Store new target report channel to " + newTarget);
  targetReportChannel = newTarget;
}

export function getTargetReportChannel() {
  logger.info("Fetch target report channel");
  return targetReportChannel;
}

export function watchUser(watch: Watch) {
  logger.info("Watching user " + JSON.stringify(watch));

  if (watchList[watch.userId]) {
    throw new Error("Someone already follows this user");
  }

  watchList[watch.userId] = watch;
}

export function getWatchedUsers() {
  logger.info("Fetch user watchlist");
  return watchList;
}
