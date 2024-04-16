import { IsRunningServersAction } from './isRunningServers.types';

export const isRunningServersAction = (
  data: { serverId: string; processId: number }[],
): IsRunningServersAction => {
  return {
    type: 'set_is_running_servers',
    payload: data,
  };
};
