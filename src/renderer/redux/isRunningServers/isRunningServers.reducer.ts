import { IsRunningServersAction } from './isRunningServers.types';

export const isRunningServers = (
  prevSate: { serverId: string; processId: number }[] = [],
  action: IsRunningServersAction,
) => {
  let newState = prevSate;
  if (action.type === 'set_is_running_servers') {
    newState = action.payload;
    return newState;
  }
  return prevSate;
};
