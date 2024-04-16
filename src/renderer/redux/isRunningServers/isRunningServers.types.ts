export type IsRunningServersAction = {
  type: 'set_is_running_servers';
  payload: { serverId: string; processId: number }[];
};
