import React from 'react';
import TheContextMenu, { ContextMenuOptions } from '../../ContextMenu';
import { AlertDialog } from '@radix-ui/themes';

export default function LuaMods() {
  const rightClickOptions: ContextMenuOptions = [
    //* 建立伺服器 (未完成)
    {
      id: 'AddLuaMod',
      type: 'action',
      action() {
        // setCurrentAction('CreateServer');
      },
    },
    {
      id: 'OpenLuaModFolder',
      type: 'action',
      action() {
        // setCurrentAction('CreateServer');
      },
    },
  ];

  return (
    <AlertDialog.Root>
      <TheContextMenu
        trigger={<div className="w-full h-[calc(100vh-164px)]"></div>}
        content={rightClickOptions}
      />
    </AlertDialog.Root>
  );
}
