let targetReportChannel: string | null = null;

export function saveTargetReportChannel(newTarget: string) {
  targetReportChannel = newTarget;
}

export function getTargetReportChannel() {
  return targetReportChannel;
}
