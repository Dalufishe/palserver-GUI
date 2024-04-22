export type ServerInstanceSetting = {
  readonly palworldVersion?: string;
  readonly serverId: string;
  readonly instancePath: string;
  readonly serverPath: string;
  readonly iconId: string;
  readonly createdAt: number /* Date.now() */;
  readonly editedAt?: number;
  readonly performanceOptimizationEnabled: boolean;
  readonly performanceMonitorEnabled: boolean;
  readonly performanceMonitorAnimationEnabled: boolean;
  readonly ue4ssEnabled: boolean;
  readonly palguardEnabled: boolean;
  readonly modManagementEnabled: boolean;
  readonly AutoRestart: number;
  readonly CrashRestart: boolean;
  readonly OverRamRestart: boolean;
  readonly openToCommunity: boolean;
};
