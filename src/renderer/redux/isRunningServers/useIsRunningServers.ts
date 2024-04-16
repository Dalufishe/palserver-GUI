import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { isRunningServersAction } from './isRunningServers.action';
import _ from 'lodash';

const useIsRunningServers = () => {
  const dispatch = useDispatch();

  const isRunningServers = useSelector<
    RootState,
    { serverId: string; processId: number }[]
  >((state) => state.isRunningServers);

  const addIsRunningServers = (serverId: string, processId: number) => {
    dispatch(
      isRunningServersAction(
        _.unionBy(isRunningServers, [{ serverId, processId }], 'serverId'),
      ),
    );
  };

  const removeIsRunningServers = (serverId: string) => {
    dispatch(
      isRunningServersAction(
        isRunningServers.filter((s) => s.serverId !== serverId),
      ),
    );
  };

  const includeRunningServers = (serverId: string) => {
    return !!isRunningServers.filter(
      (server) => server.serverId === serverId,
    )[0];
  };

  return {
    isRunningServers,
    isRunningServerIds: isRunningServers.map((server) => server.serverId),
    isRunningServerProcessIds: isRunningServers.map(
      (server) => server.processId,
    ),
    addIsRunningServers,
    removeIsRunningServers,
    includeRunningServers,
  };
};

export default useIsRunningServers;
