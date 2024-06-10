import { AlertDialog, Button, Flex, Select, TextField } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../../../../../hooks/translation/useTranslation';
import useSelectedServerInstance from '../../../../../redux/selectedServerInstance/useSelectedServerInstance';
import useServerInfo from '../../../../../hooks/server/info/useServerInfo';

export default function Schedule() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { serverInfo, setServerInfo } = useServerInfo(selectedServerInstance);

  return (
    <AlertDialog.Content style={{ maxWidth: 500 }}>
      <AlertDialog.Title>排程</AlertDialog.Title>
      <AlertDialog.Description>
        <div className="flex flex-col gap-4">
          <TextField.Root placeholder="伺服器啟動時廣播" />
          {/* <div className="flex gap-2">
            <TextField.Root
              style={{ flex: 1 }}
              placeholder="伺服器啟動後定時廣播"
            />
            <Select.Root
              size="2"
              value={serverInfo?.AutoBoardcast}
              onValueChange={(v) => {
                // @ts-ignore
                setServerInfo({ ...serverInfo, AutoBoardcast: Number(v) });
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {[0, 6, 12, 24]?.map((v, i) => (
                  <Select.Item value={v}>{v}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div> */}
          <TextField.Root placeholder="伺服器關閉前廣播" />
        </div>
      </AlertDialog.Description>
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
