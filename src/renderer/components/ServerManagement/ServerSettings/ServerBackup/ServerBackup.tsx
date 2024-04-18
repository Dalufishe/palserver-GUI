/* eslint-disable no-use-before-define */
import {
  AlertDialog,
  Button,
  Flex,
  Link,
  ScrollArea,
  Select,
  TextField,
} from '@radix-ui/themes';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';
import { useEffect, useState } from 'react';
import useTranslation from '../../../../hooks/useTranslation';
import Channels from '../../../../../main/ipcs/channels';
import useCorrectSaveGamesPath from '../../../../hooks/server/saved/useCorrectSaveGamesPath';

export default function SaveBackup() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();

  const [saveBackup, setSaveBackup] = useState<any>([]);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getOfficalServerBackup, selectedServerInstance)
      .then((data: string[]) => {
        setSaveBackup(data);
      });
  }, [selectedServerInstance]);

  return (
    <AlertDialog.Content style={{ maxWidth: 500 }}>
      <AlertDialog.Title>{t('ServerBackupRecord')}</AlertDialog.Title>
      <AlertDialog.Description>
        <ScrollArea
          scrollbars="vertical"
          style={{ height: 392 }}
          className="pt-2"
        >
          {saveBackup
            ?.slice(0, 20)
            ?.map((backupId: string) => <BackupItem backupId={backupId} />)}
        </ScrollArea>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        {/* <SetBackupTime /> */}
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
}

function BackupItem({ backupId }: { backupId: string }) {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const saveGamesPath = useCorrectSaveGamesPath(selectedServerInstance);

  const handleOpenPath = () => {
    const path = window.electron.node.path();
    window.electron.openExplorer(
      path.join(saveGamesPath, 'backup/world', backupId),
    );
  };

  return (
    <div className="flex items-center justify-between h-8 pr-4">
      <span>{backupId}</span>
      <div className="flex items-center gap-2">
        <Button
          color="yellow"
          // variant="soft"
          size="1"
          onClick={handleOpenPath}
        >
          {t('Open')}
        </Button>
        {/* <Button size="1" onClick={handleOpenPath}>
          套用
        </Button> */}
      </div>
    </div>
  );
}
