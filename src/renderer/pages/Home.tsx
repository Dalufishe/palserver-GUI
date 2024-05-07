/* eslint-disable no-nested-ternary */
import { AlertDialog } from '@radix-ui/themes';
import Version from '../components/Version';
import ServerInstance from '../components/Home/ServerInstance/ServerInstance';
import {  useState } from 'react';
import CreateServerAlert from '../components/Home/CreateServer/CreateServerAlert';
import CreateRemoteServerAlert from '../components/Home/CreateRemoteServer/CreateRemoteServerAlert';
import useAllServerInfo from '../hooks/server/info/useAllServerInfo';
import ContextMenu, { ContextMenuOptions } from '../components/ContextMenu';
import NoServerHint from '../components/Home/NoServerHint/NoServerHint';

export default function Home() {
  // const { t } = useTranslation();

  const serverInfos = useAllServerInfo();

  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const rightClickOptions: ContextMenuOptions = [
    //* 建立伺服器 (未完成)
    {
      id: 'CreateServer',
      type: 'action',
      action() {
        setCurrentAction('CreateServer');
      },
    },
    {
      id: 'ImportServer',
      type: 'sub',
      sub: [
        {
          id: 'FourPlayerSave',
          type: 'action',
        },
        {
          id: 'DedicatedServer',
          type: 'action',
        },
        {
          id: 'ServerInstance',
          type: 'action',
        },
      ],
    },
    {
      id: '',
      type: 'seperator',
    },
    //* 建立遠端連接 (未完成)
    {
      id: 'CreateRemoteServer',
      type: 'action',
      shortcut: '⇗',
      action() {
        setCurrentAction('CreateRemoteServer');
      },
    },
  ];

  return (
    <AlertDialog.Root>
      <ContextMenu
        trigger={
          <div className="page-container">
            {serverInfos.length ? (
              <div className="flex flex-row items-start gap-3 flex-wrap">
                {serverInfos
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((info) => (
                    <ServerInstance info={info} />
                  ))}
              </div>
            ) : (
              <NoServerHint />
            )}
            <Version />
          </div>
        }
        content={rightClickOptions}
      />

      {currentAction === 'CreateServer' && <CreateServerAlert />}
      {currentAction === 'CreateRemoteServer' && <CreateRemoteServerAlert />}
    </AlertDialog.Root>
  );
}
