import React from 'react';
import TheContextMenu, { ContextMenuOptions } from '../../ContextMenu';
import { AlertDialog } from '@radix-ui/themes';
import useLuaMods from '../../../hooks/server/mods/useLuaMods';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import PakLogicModsItem from './PakLogicModsItem/PakLogicModsItem';
import usePakLogicMods from '../../../hooks/server/mods/usePakLogicMods';

export default function PakLogicMods() {
  const { selectedServerInstance } = useSelectedServerInstance();

  const pakLogicMods = usePakLogicMods(selectedServerInstance);

  const rightClickOptions: ContextMenuOptions = [
    { id: 'ModsCount', type: 'disabled', value: pakLogicMods.length + ' Mods' },
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
            'Pal/Content/Paks/LogicMods',
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
              {pakLogicMods
                ?.sort((a, b) => b.isDirectory - a.isDirectory)
                ?.map((mod, i) => <PakLogicModsItem key={i} {...mod} />)}
            </div>
          </div>
        }
        content={rightClickOptions}
      />
    </AlertDialog.Root>
  );
}
