/* eslint-disable global-require */

import { Box, Button, IconButton, Text, Theme } from '@radix-ui/themes';
import React from 'react';
import useServerOnlinePlayers from '../../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';
import _ from 'lodash';
import useTranslation from '../../../../hooks/useTranslation';
import { MdOutlineMoreVert } from 'react-icons/md';
import PlayerMoreAction from '../PlayerMoreAction/PlayerMoreAction';
import Channels from '../../../../../main/ipcs/channels';

export default function PlayerPreview({
  playerIndex,
}: {
  playerIndex: number;
}) {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const players = useServerOnlinePlayers(selectedServerInstance);
  const player = players[playerIndex] || {};

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

  const location = getInGameLocation(player.location_x, player.location_y);

  return (
    _.isEmpty(player) || (
      <div className="flex flex-col p-4">
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
                  {player.userId
                    ?.replace(player.userId.substring(11, 18), '*******')
                    .slice(6)}
                </Text>
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
