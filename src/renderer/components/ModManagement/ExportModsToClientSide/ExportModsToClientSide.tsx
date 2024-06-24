import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';

export default function ExportModsToClientSide() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();

  const [isExporting, setIsExporting] = useState(false);

  const handleExportClientMods = () => {
    setIsExporting(true);

    window.electron.ipcRenderer
      .invoke(Channels.exportModsToClientSide, selectedServerInstance)
      .then(() => {
        setIsExporting(false);
      });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>
          {isExporting && <Spinner />}
          {t('ExportModsToClientSide')}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>{t('ExportModsToClientSide')}</AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{t('ExportModsToClientSideDesc1')}</div>
            <div>{t('ExportModsToClientSideDesc2')}</div>
            <div>
              <img
                className="select-none"
                src={require('./HowToImportClientSideMod.png')}
                alt=""
              />
            </div>
          </div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {t('Cancel')}
            </Button>
          </AlertDialog.Cancel>
          {isExporting || (
            <AlertDialog.Action>
              <Button
                onClick={handleExportClientMods}
                variant="solid"
                color="yellow"
              >
                {t('Export')}
              </Button>
            </AlertDialog.Action>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
