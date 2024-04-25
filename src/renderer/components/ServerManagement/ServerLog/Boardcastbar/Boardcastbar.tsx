/* eslint-disable no-use-before-define */
import { Button, TextField, Theme } from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../../../../hooks/useTranslation';
import Channels from '../../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';

export default function Boardcastbar() {
  const { t } = useTranslation();
  const { selectedServerInstance } = useSelectedServerInstance();

  const [input, setInput] = useState('');

  const handleConfirm = () => {
    if (input.trim()) {
      if (input.startsWith('/')) {
        handleSendCommand();
      } else {
        handleSendBoardCast();
      }
    }
    setInput('');
  };

  const handleSendCommand = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      input.slice(1),
    );
  };

  const handleSendBoardCast = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRestAPI,
      selectedServerInstance,
      '/announce',
      { body: { message: input }, method: 'post' },
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 設定 */}
      <div className="flex items-center justify-end gap-2">
        <Button size="1" color="gray">
          {t('Schedule')}
        </Button>
        <Button size="1" color="gray">
          {t('CommandsList')}
        </Button>
      </div>
      <div>
        {/* 輸入欄 */}
        <Theme
          appearance="dark"
          style={{ background: 'inherit', fontFamily: 'inherit' }}
        >
          <TextField.Root
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
            }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            size="3"
            placeholder={t('EnterCommandOrBoardCast')}
            style={{ fontFamily: 'inherit' }}
          />
        </Theme>
      </div>
    </div>
  );
}
