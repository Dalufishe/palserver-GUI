import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../../../../hooks/translation/useTranslation';

export default function PalguardSettings() {
  const { t } = useTranslation();

  return (
    <AlertDialog.Content style={{ maxWidth: 500 }}>
      <AlertDialog.Title>{t('ServerBackupRecord')}</AlertDialog.Title>
      <AlertDialog.Description></AlertDialog.Description>
      <Flex gap="3" mt="4" justify="between">
        <Button
          color="yellow"
          // variant="soft"
          size="2"
        >
          {t('EditFromSourceFile')}
        </Button>
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
}
