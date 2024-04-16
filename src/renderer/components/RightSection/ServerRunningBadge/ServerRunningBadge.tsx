import { Badge } from '@radix-ui/themes';
import React from 'react';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';

export default function ServerRunningBadge() {
  const { selectedServerInstance } = useSelectedServerInstance();
  const { includeRunningServers } = useIsRunningServers();

  return (
    <div className="self-end">
      {includeRunningServers(selectedServerInstance) ? (
        <Badge color="grass" size="3" variant="solid">
          Online
        </Badge>
      ) : (
        <Badge color="red" size="3" variant="solid">
          Offline
        </Badge>
      )}
    </div>
  );
}
