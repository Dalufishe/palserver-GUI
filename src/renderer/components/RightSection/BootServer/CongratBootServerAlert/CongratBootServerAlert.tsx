import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../../../../hooks/translation/useTranslation';

export default function CongratBootServerAlert() {
  const { t } = useTranslation();

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('ImportServer')}</AlertDialog.Title>
      <div className="flex flex-col py-2"></div>
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
