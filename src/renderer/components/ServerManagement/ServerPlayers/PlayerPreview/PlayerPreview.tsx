/* eslint-disable global-require */

import { Box, Button, IconButton, Text, Theme } from '@radix-ui/themes';
import React from 'react';
import useServerOnlinePlayers from '../../../../hooks/server/players/useServerOnlinePlayers';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';
import _ from 'lodash';
import useTranslation from '../../../../hooks/useTranslation';
import { MdOutlineMoreVert } from 'react-icons/md';

export default function PlayerPreview({
  playerIndex,
}: {
  playerIndex: number;
}) {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const players = useServerOnlinePlayers(selectedServerInstance);

  const player = players[playerIndex] || {};

  return (
    _.isEmpty(player) || (
      <div className="flex-1 p-4">
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
                  {player.playerId}
                </Text>
              </div>
              <Text as="div" size="2" color="gray">
                Lv {player.level} .{' '}
                <span className="cursor-pointer" title={t('PublicIP')}>
                  {player.ip}
                </span>{' '}
                .{' '}
                <span className="cursor-pointer" title={t('PlayerLocation')}>
                  ({player.location_x?.toFixed(0)},{' '}
                  {player.location_y?.toFixed(0)})
                </span>
              </Text>
            </Box>
          </Theme>
        </div>
        <div className="mt-2 ml-16 flex gap-2">
          <Button size="1">踢出</Button>
          <Button size="1" color="red">
            封鎖
          </Button>
          {/* <IconButton size={'1'} color="gray">
            <MdOutlineMoreVert />
          </IconButton> */}
          <Button size="1" color="gray">
            其他操作
          </Button>
        </div>
      </div>
    )
  );
}
