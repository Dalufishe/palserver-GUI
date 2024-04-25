import { Badge, Box, Text, Theme } from '@radix-ui/themes';
import useServerOnlinePlayers from '../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import PlayerItem from './PlayerItem/PlayerItem';
import PlayerPreview from './PlayerPreview/PlayerPreview';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import useTranslation from '../../../hooks/useTranslation';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';

export default function ServerPlayers() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { worldSettings } = useWorldSettings(selectedServerInstance);

  const players = useServerOnlinePlayers(selectedServerInstance);

  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  return (
    <div className="w-full h-full mt-4 flex">
      {players.length ? (
        <div className="w-full flex justify-between pr-4">
          <div className="w-full h-[calc(100vh-180px)] overflow-y-scroll flex flex-col gap-1">
            {players.map((player, i) => (
              <PlayerPreview playerIndex={i} />
            ))}
            {/* <div className="flex flex-col gap-1">
            {players.map((player, i) => (
              <PlayerItem
                player={player}
                onClick={() => {
                  setSelectedPlayerIndex(i);
                }}
              />
            ))}
          </div> */}
          </div>
          <div>
            {/* <iframe
              className="w-[320px] h-[320px]"
              src={`http://127.0.0.1:3434?ip=127.0.0.1&port=${
                worldSettings.RESTAPIPort
              }&password=${trimWorldSettingsString(
                worldSettings.AdminPassword,
              )}`}
            /> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-2xl opacity-60 p-4">
            {t('ServerHasNoPlayers')}
          </div>
        </div>
      )}
    </div>
  );
}
