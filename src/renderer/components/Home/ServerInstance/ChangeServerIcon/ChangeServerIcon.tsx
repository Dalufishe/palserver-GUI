import { AlertDialog, Button, Flex, ScrollArea } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../../hooks/useTranslation';
import Channels from '../../../../../main/ipcs/channels';
import ServerIcon from './ServerIcon/ServerIcon';
import { ServerIcon as ServerIconType } from '../../../../../types/ServerIcon.types';

export default function ChangeServerIcon() {
  const { t } = useTranslation();

  const [serverIcons, setServerIcons] = useState<ServerIconType[]>([]);

  const handleGetAllIcons = async () => {
    const icons = await window.electron.ipcRenderer.invoke(
      Channels.getAllServerIcons,
    );
    return icons;
  };

  useEffect(() => {
    handleGetAllIcons().then((icons) => {
      setServerIcons(icons);
    });
  }, []);

  return (
    <AlertDialog.Content style={{ maxWidth: 550 }}>
      <AlertDialog.Title>{t('ChangeServerIcon')}</AlertDialog.Title>

      <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
        <div className="flex flex-wrap w-full">
          {serverIcons.map((icon) => (
            <ServerIcon icon={icon} />
          ))}
        </div>
      </ScrollArea>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
}
