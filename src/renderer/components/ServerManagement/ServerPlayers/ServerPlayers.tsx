import { Badge, Box, Text, Theme } from '@radix-ui/themes';
import useServerOnlinePlayers from '../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import PlayerItem from './PlayerItem/PlayerItem';
import PlayerPreview from './PlayerPreview/PlayerPreview';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import useTranslation from '../../../hooks/translation/useTranslation';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';

export default function ServerPlayers() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { worldSettings } = useWorldSettings(selectedServerInstance);

  const players = useServerOnlinePlayers(selectedServerInstance);

  return (
    <div className="w-full h-full mt-4 flex">
      {players.length ? (
        <div className="w-full flex justify-between pr-4">
          <div className="w-full h-[calc(100vh-180px)] overflow-y-scroll flex flex-col gap-4">
            {players.map((player, i) => (
              <PlayerPreview playerIndex={i} />
            ))}
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
