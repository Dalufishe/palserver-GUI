/* eslint-disable global-require */

import { Badge, Box, Text, Theme } from '@radix-ui/themes';
import React from 'react';

export default function PlayerItem({
  player,
  onClick,
}: {
  player: {
    name: string;
    playerId: string;
    userId: string;
    ip: string;
    ping: number;
    location_x: number;
    location_y: number;
    level: number;
  };
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-[200px] rounded-md flex items-center gap-4 p-4 cursor-pointer hover:bg-bg1"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={require('../../../../../../assets/icon.png')}
        alt=""
      />
      <Theme appearance="dark" style={{ background: 'inherit' }}>
        <Box>
          <div className="flex items-center gap-2">
            <Text as="div" size="2" weight="bold">
              {player.name}
            </Text>
            <Badge size="1" color="grass" variant="surface">
              Online
            </Badge>
          </div>
          <Text as="div" size="2" color="gray">
            Lv. {player.level}
          </Text>
        </Box>
      </Theme>
    </div>
  );
}
