import pino, { Logger as PinoLogger } from "pino";
import { LOG_LEVEL } from "./env.js";

const logLevel = LOG_LEVEL || "info";

export type Logger = PinoLogger;

export const logger = pino.default({
  level: logLevel,
});

logger.info(`Logger created with level ${logLevel}`);

export function makeFeatureLogger(featureName: string) {
  return logger.child({ feature: featureName });
}
