export type ServerInstanceSetting = {
  readonly serverId: string;
  readonly instancePath: string;
  readonly serverPath: string;
  iconId: string;
  readonly createdAt: number /* Date.now() */;
  editedAt?: number;
};
