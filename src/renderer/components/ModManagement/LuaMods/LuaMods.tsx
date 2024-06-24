import React from 'react';
import TheContextMenu, { ContextMenuOptions } from '../../ContextMenu';
import { AlertDialog } from '@radix-ui/themes';
import useLuaMods from '../../../hooks/server/mods/useLuaMods';
import LuaModItem from './LuaModsItem/LuaModsItem';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';

export default function LuaMods() {
  const { selectedServerInstance } = useSelectedServerInstance();

  const luaMods = useLuaMods(selectedServerInstance);

  const rightClickOptions: ContextMenuOptions = [
    { id: 'ModsCount', type: 'disabled', value: luaMods.length + ' Mods' },
    { id: '', type: 'seperator' },
    {
      id: 'OpenLuaModFolder',
      type: 'action',
      action() {
        const filePath = window.electron.node
          .path()
          .join(
            window.electron.constant.USER_SERVER_INSTANCES_PATH(),
            selectedServerInstance,
            'server',
            `/Pal/Binaries/Win64/Mods`,
          );
        window.electron.openExplorer(filePath);
      },
    },
  ];

  return (
    <AlertDialog.Root>
      <TheContextMenu
        trigger={
          <div className="w-full h-[calc(100vh-164px)]">
            <div className="flex flex-row gap-2 flex-wrap py-2">
              {luaMods
                ?.sort((a, b) => b.isDirectory - a.isDirectory)
                ?.map((mod, i) => <LuaModItem key={i} {...mod} />)}
            </div>
          </div>
        }
        content={rightClickOptions}
      />
    </AlertDialog.Root>
  );
}
