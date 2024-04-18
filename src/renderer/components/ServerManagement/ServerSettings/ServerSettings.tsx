/* eslint-disable no-use-before-define */

import {
  AlertDialog,
  Button,
  Switch,
  Text,
  TextField,
  Theme,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import _ from 'lodash';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import SecureEye from '../../SecureEye';
import SaveBackup from './ServerBackup/ServerBackup';
import Link from '../../Link';

export default function ServerSettings() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { worldSettings, setWorldSettings } = useWorldSettings(
    selectedServerInstance,
  );

  const [openSaveBackup, setOpenSaveBackup] = useState(false);

  const settingOptions = {
    Performance: {
      PerformanceOptimization: {
        id: 'PerformanceOptimization',
        title: '效能最佳化',
        desciption: '解除幀率限制，加強網路，並提高多執行緒 CPU 環境中的效能。',
        value: true,
      },
      PerformanceMonitor: {
        id: 'PerformanceMonitor',
        title: '啟用效能監測',
        desciption:
          '對伺服器及電腦的效能、數值監測系統及顯示畫面。開啟後會稍微占用效能。',
        value: false,
      },
      PerformanceMonitorAnimation: {
        id: 'PerformanceMonitorAnimation',
        title: '效能監測動畫',
        desciption:
          '是否對效能監測啟用動畫。會稍微占用效能。開啟後會稍微占用效能。',
        value: true,
      },
    },
    Internet: {
      RCONEnabled: {
        id: 'RCONEnabled',
        title: t('RCONEnabled'),
        desciption: '啟用遠端控制 RCON。我們強烈建議您打開以體驗完整功能。',
        value: worldSettings.RCONEnabled,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RCONEnabled: v });
        },
      },
      RESTAPIEnabled: {
        id: 'RESTAPIEnabled',
        title: t('RESTAPIEnabled'),
        desciption: '啟用 REST API 伺服器。我們強烈建議您打開以體驗完整功能。',
        value: worldSettings.RESTAPIEnabled,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RESTAPIEnabled: v });
        },
      },
      PublicPort: {
        id: 'PublicPort',
        title: t('PublicPort'),
        desciption: '伺服器公開端口號。',
        type: 'input',
        value: worldSettings.PublicPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, PublicPort: v });
        },
      },

      RCONPort: {
        id: 'RCONPort',
        title: t('RCONPort'),
        desciption: '遠端控制 RCON 端口號。',
        type: 'input',
        value: worldSettings.RCONPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RCONPort: v });
        },
      },
      RESTAPIPort: {
        id: 'RESTAPIPort',
        title: t('RESTAPIPort'),
        desciption: 'REST API 網路端口號。',
        type: 'input',
        value: worldSettings.RESTAPIPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RESTAPIPort: v });
        },
      },
    },
    Mod: {
      ModManagementEnabled: {
        id: 'ModManagementEnabled',
        title: '啟用模組選單',
        desciption:
          '啟用 palserver GUI 的伺服器模組管理器。支援 Lua、Pak 及 dll 檔管理，並支援匯出到客戶端 (遊戲)。',
        value: false,
      },
      UE4SSEnabled: {
        id: 'UE4SSEnabled',
        title: '啟用 UE4SS',
        desciption: (
          <span>
            UE4/5 的可注入的 Lua 腳本系統、SDK
            生成器、即時屬性編輯器。部分模組依賴 UE4SS。
            <Link herf="https://github.com/UE4SS-RE/RE-UE4SS">官方網站</Link>
          </span>
        ),
        value: false,
      },
      PalguardEnabled: {
        id: 'PalguardEnabled',
        title: '啟用 Palguard',
        desciption: (
          <span>
            Palguard
            插件提供防作弊檢測、伺服器日誌及更多管理員指令。我們建議您將他開啟以體驗完整功能。
            <Link herf="https://www.nexusmods.com/palworld/mods/451/">
              官方網站
            </Link>
          </span>
        ),
        value: true,
      },
      // EnableCoffee: {
      //   id: 'EnableCoffee',
      //   title: '啟用咖哩棒套裝',
      //   desciption: '啟用咖哩棒套裝的完美模組造型啟動畫面，兄弟，你好香。',
      //   value: false,
      // },
    },
    Security: {
      ServerBackupRecord: {
        id: 'ServerBackupRecord',
        title: t('ServerBackupRecord'),
        desciption: '伺服器備份存檔位置，復原遊玩紀錄。',
        type: 'button',
        action() {
          setOpenSaveBackup(true);
        },
      },
      ServerPassword: {
        id: 'ServerPassword',
        title: t('ServerPassword'),
        desciption: '為伺服器設置密碼。',
        type: 'input',
        value: trimWorldSettingsString(worldSettings.ServerPassword),
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, ServerPassword: `"${v}"` });
        },
        secure: true,
      },
      AdminPassword: {
        id: 'AdminPassword',
        title: t('AdminPassword'),
        desciption: '設置管理員密碼。',
        type: 'input',
        value: trimWorldSettingsString(worldSettings.AdminPassword),
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, AdminPassword: `"${v}"` });
        },
        secure: true,
      },
      WhiteListEnbaled: {
        id: 'WhiteListEnbaled',
        title: '啟用白名單',
        desciption: '啟用白名單系統。非邀請的用戶無法進入伺服器。',
        value: false,
      },
    },
  };

  return (
    <AlertDialog.Root>
      <div className="mx-4 pt-6 w-full h-screen overflow-y-scroll">
        <div className=" flex flex-col gap-4 pb-40">
          {_.map(settingOptions, (group, groupId) => (
            <SettingGroup title={t(groupId)} key={groupId}>
              {_.map(group, (option: any, optionId) => (
                <SettingsItem
                  title={option.title}
                  desc={option.desciption}
                  type={option.type}
                  value={option.value}
                  onValueChange={option.onValueChange}
                  secure={option.secure}
                  action={option.action}
                />
              ))}
            </SettingGroup>
          ))}
        </div>
        {openSaveBackup && <SaveBackup />}
      </div>
    </AlertDialog.Root>
  );
}

function SettingsItem({
  title,
  desc,
  type,
  value,
  onValueChange,
  secure,
  action,
}: {
  title: string;
  desc: string;
  type?: 'input' | 'button';
  value: any;
  onValueChange: (v: any) => void;
  secure?: boolean;
  action?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Theme appearance="dark" style={{ background: 'inherit' }}>
      <div className="flex items-center justify-between w-[80%]">
        <div className="flex flex-col w-[80%]">
          <Text weight="bold">{title}</Text>
          <Text color="gray" size="2">
            {desc}
          </Text>
        </div>
        {type === 'input' && (
          <div className="flex items-center gap-2">
            <div className="font-mono">
              <TextField.Root
                type={secure ? 'password' : 'text'}
                value={value || ''}
                onChange={(e) => {
                  onValueChange(e.target.value);
                }}
                style={{ fontFamily: 'inherit', fontSize: 16, width: 120 }}
              />
            </div>
          </div>
        )}
        {type === 'button' && (
          <AlertDialog.Trigger>
            <Button size="2" onClick={action}>
              {t('Open')}
            </Button>
          </AlertDialog.Trigger>
        )}
        {!type && <Switch checked={value} onCheckedChange={onValueChange} />}
      </div>
    </Theme>
  );
}

function SettingGroup({ title, children }: { title: string; children: any }) {
  return (
    <div className="pb-4">
      <Text weight="bold" size="6">
        {title}
      </Text>
      <div className="flex flex-col gap-4 py-3">{children}</div>
    </div>
  );
}
