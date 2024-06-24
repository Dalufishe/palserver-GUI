/* eslint-disable global-require */

import { Box, Button, IconButton, Text, Theme } from '@radix-ui/themes';
import React, { useState } from 'react';
import useServerOnlinePlayers from '../../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';
import _ from 'lodash';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { MdOutlineMoreVert } from 'react-icons/md';
import PlayerMoreAction from '../PlayerMoreAction/PlayerMoreAction';
import Channels from '../../../../../main/ipcs/channels';
import { PiEye, PiEyeClosed } from 'react-icons/pi';

export default function PlayerPreview({
  playerIndex,
}: {
  playerIndex: number;
}) {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();

  const players = useServerOnlinePlayers(selectedServerInstance);
  const player = players[playerIndex] || {};

  // eslint-disable-next-line no-use-before-define
  const location = getInGameLocation(player.location_x, player.location_y);

  const [showPlayerSteamId, setShowPlayerSteamId] = useState(false);

  const handleKickPlayer = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `KickPlayer ${player.userId}`,
    );
  };
  const handleBanPlayer = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `BanPlayer ${player.userId}`,
    );
  };

  return (
    _.isEmpty(player) || (
      <div className="flex flex-col p-3.5 h-fit">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full"
            src={require('../../../../../../assets/icon.png')}
            alt=""
          />
          <Theme appearance="dark" style={{ background: 'inherit' }}>
            <Box>
              <div className="flex items-center gap-2">
                <Text as="div" size="3" weight="bold">
                  {player.name}
                </Text>
                <Text
                  className="cursor-pointer"
                  title={t('PlayerId')}
                  as="div"
                  size="2"
                  color="gray"
                >
                  {showPlayerSteamId
                    ? player.userId
                        ?.replace(player.userId.substring(11, 18), '*******')
                        .slice(6)
                    : player.userId.slice(6)}
                </Text>
                <div
                  onClick={() => {
                    setShowPlayerSteamId(!showPlayerSteamId);
                  }}
                >
                  {showPlayerSteamId ? <PiEye /> : <PiEyeClosed />}
                </div>
              </div>
              <Text as="div" size="2" color="gray">
                Lv {player.level} .{' '}
                <span className="cursor-pointer" title={t('PublicIP')}>
                  {player.ip}
                </span>{' '}
                .{' '}
                <span className="cursor-pointer" title={t('PlayerLocation')}>
                  ({location[0]?.toFixed(0)}, {location[1]?.toFixed(0)})
                </span>
              </Text>
            </Box>
          </Theme>
        </div>
        <div className="mt-2 ml-16 flex gap-2">
          <Button onClick={handleKickPlayer} size="1">
            {t('Kick')}
          </Button>
          <Button onClick={handleBanPlayer} size="1" color="red">
            {t('Ban')}
          </Button>
          {/* <IconButton size={'1'} color="gray">
            <MdOutlineMoreVert />
          </IconButton> */}
          <PlayerMoreAction
            name={player.name}
            playerId={player.playerId}
            steamId={player.userId}
          />
        </div>
      </div>
    )
  );
}

function getInGameLocation(x: number, y: number) {
  const x_loc = (y - 157664.55791065) / 462.962962963;
  const y_loc = (x + 123467.1611767) / 462.962962963;
  return [x_loc, y_loc];
}
