import { Badge, Box, Text, Theme } from '@radix-ui/themes';
import useServerOnlinePlayers from '../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import PlayerItem from './PlayerItem/PlayerItem';
import PlayerPreview from './PlayerPreview/PlayerPreview';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function ServerPlayers() {
  const { selectedServerInstance } = useSelectedServerInstance();

  const players = useServerOnlinePlayers(selectedServerInstance);

  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  return (
    <div className="w-full mt-4 flex">
      {!!players.length ? (
        <>
          <PlayerPreview playerIndex={selectedPlayerIndex} />
          <div className="flex flex-col gap-1">
            {players.map((player, i) => (
              <>
                <PlayerItem
                  player={player}
                  onClick={() => {
                    setSelectedPlayerIndex(i);
                  }}
                />
                <PlayerItem
                  player={player}
                  onClick={() => {
                    setSelectedPlayerIndex(i);
                  }}
                />
                <PlayerItem
                  player={player}
                  onClick={() => {
                    setSelectedPlayerIndex(i);
                  }}
                />
                <PlayerItem
                  player={player}
                  onClick={() => {
                    setSelectedPlayerIndex(i);
                  }}
                />
                <PlayerItem
                  player={player}
                  onClick={() => {
                    setSelectedPlayerIndex(i);
                  }}
                />
              </>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="text-2xl opacity-60">伺服器沒有玩家</div>
        </div>
      )}
    </div>
  );
}
