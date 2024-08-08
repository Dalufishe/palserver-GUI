/* eslint-disable no-use-before-define */

import {
  AlertDialog,
  Button,
  Select,
  Spinner,
  Switch,
  Text,
  TextField,
  Theme,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import _ from 'lodash';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import SecureEye from '../../SecureEye';
import SaveBackup from './ServerBackup/ServerBackup';
import Link from '../../Link';
import useServerInfo from '../../../hooks/server/info/useServerInfo';
import Channels from '../../../../main/ipcs/channels';
import PalguardSettings from './PalguardSettings/PalguardSettings';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';

export default function ServerSettings() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { worldSettings, setWorldSettings } = useWorldSettings(
    selectedServerInstance,
  );
  const { serverInfo, setServerInfo } = useServerInfo(selectedServerInstance);

  const { includeRunningServers } = useIsRunningServers();

  const isServerRunning = includeRunningServers(selectedServerInstance);

  const [isServerUpdating, setIsServerUpdating] = useState(false);

  const [openSaveBackup, setOpenSaveBackup] = useState(false);
  const [openPalguardSettings, setOpenPalguardSettings] = useState(false);

  const settingOptions = {
    ServerUpgrade: {
      ServerNeedUpgrade: {
        id: 'ServerNeedUpdate',
        disabled: isServerRunning,
        title: t('ServerNeedUpgrade'),
        desciption: (
          <span>
            {t('ServerNeedUpgradeDesc')}{' '}
            <Theme
              appearance="dark"
              style={{ background: 'inherit', display: 'inline-block' }}
            >
              {/* <Text color="blue">
                <span className="underline">v0.2.1</span> {'> '}
                <span className="underline">v0.6.0</span>
              </Text> */}
            </Theme>
          </span>
        ),
        type: 'button',
        buttonText: isServerUpdating ? (
          <>
            <Spinner /> {t('Update')}
          </>
        ) : (
          t('Update')
        ),
        action() {
          window.electron.ipcRenderer.sendMessage(
            Channels.updateServerInstance,
            selectedServerInstance,
          );

          setIsServerUpdating(true);

          window.electron.ipcRenderer.once(
            Channels.updateServerInstanceReply.DONE,
            () => {
              setIsServerUpdating(false);
              window.electron.ipcRenderer.sendMessage(
                'alert',
                t('ServerUpdateDone'),
              );
            },
          );
        },
      },
      UE4SSNeedUpgrade: {
        id: 'UE4SSNeedUpgrade',
        disabled: isServerRunning,
        title: t('UE4SSNeedUpgrade'),
        desciption: (
          <span>
            {t('UE4SSNeedUpgradeDesc')}{' '}
            <Theme
              appearance="dark"
              style={{ background: 'inherit', display: 'inline-block' }}
            >
              <Text color="blue">
                <span className="underline">
                  v
                  {window.electron.constant.SERVER_UE4SS_VERSION(
                    selectedServerInstance,
                  ) || '???'}
                </span>{' '}
                {'> '}
                <span className="underline">
                  v {window.electron.constant.SYSTEM_UE4SS_VERSION() || '???'}
                </span>
              </Text>
            </Theme>
          </span>
        ),
        type: 'button',
        buttonText: t('Update'),
        action() {
          window.electron.ipcRenderer.sendMessage(
            Channels.updateUE4SS,
            selectedServerInstance,
          );
        },
        hidden:
          window.electron.constant.SERVER_UE4SS_VERSION(
            selectedServerInstance,
          ) === window.electron.constant.SYSTEM_UE4SS_VERSION(),
      },
      PalguardNeedUpgrade: {
        id: 'PalguardNeedUpgrade',
        disabled: isServerRunning,
        title: t('PalguardNeedUpgrade'),
        desciption: (
          <span>
            {t('PalguardNeedUpgradeDesc')}{' '}
            <Theme
              appearance="dark"
              style={{ background: 'inherit', display: 'inline-block' }}
            >
              <Text color="blue">
                <span className="underline">
                  v
                  {window.electron.constant.SERVER_PALGUARD_VERSION(
                    selectedServerInstance,
                  ) || '???'}
                </span>{' '}
                {'> '}
                <span className="underline">
                  v{' '}
                  {window.electron.constant.SYSTEM_PALGUARD_VERSION() || '???'}
                </span>
              </Text>
            </Theme>
          </span>
        ),
        type: 'button',
        buttonText: t('Update'),
        action() {
          window.electron.ipcRenderer.sendMessage(
            Channels.updatePalguard,
            selectedServerInstance,
          );
        },
        hidden:
          window.electron.constant.SERVER_PALGUARD_VERSION(
            selectedServerInstance,
          ) === window.electron.constant.SYSTEM_PALGUARD_VERSION(),
      },
    },
    Performance: {
      PerformanceOptimizationEnabled: {
        disabled: isServerRunning,
        id: 'PerformanceOptimizationEnabled',
        title: t('PerformanceOptimizationEnabled'),
        desciption: t('PerformanceOptimizationEnabledDesc'),
        value: serverInfo?.performanceOptimizationEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            performanceOptimizationEnabled: v,
          });
        },
      },
      PerformanceMonitorEnabled: {
        // hidden: serverInfo?.UseIndependentProcess,
        id: 'PerformanceMonitorEnabled',
        title: t('PerformanceMonitorEnabled'),
        desciption: t('PerformanceMonitorEnabledDesc'),
        value: serverInfo?.performanceMonitorEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            performanceMonitorEnabled: v,
          });
        },
      },
      PerformanceMonitorAnimationEnabled: {
        id: 'PerformanceMonitorAnimationEnabled',
        title: t('PerformanceMonitorAnimationEnabled'),
        desciption: t('PerformanceMonitorAnimationEnabledDesc'),
        value: serverInfo?.performanceMonitorAnimationEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            performanceMonitorAnimationEnabled: v,
          });
        },
      },
    },
    Internet: {
      RCONEnabled: {
        disabled: isServerRunning,
        id: 'RCONEnabled',
        title: t('RCONEnabled'),
        desciption: t('RCONEnabledDesc'),
        value: worldSettings.RCONEnabled,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RCONEnabled: v });
        },
      },
      RESTAPIEnabled: {
        disabled: isServerRunning,
        id: 'RESTAPIEnabled',
        title: t('RESTAPIEnabled'),
        desciption: t('RESTAPIEnabledDesc'),
        value: worldSettings.RESTAPIEnabled,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RESTAPIEnabled: v });
        },
      },
      PublicPort: {
        id: 'PublicPort',
        disabled: isServerRunning,
        title: t('PublicPort'),
        desciption: t('PublicPortDesc'),
        type: 'input',
        value: worldSettings.PublicPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, PublicPort: v });
        },
      },

      RCONPort: {
        id: 'RCONPort',
        disabled: isServerRunning,
        title: t('RCONPort'),
        desciption: t('RCONPortDesc'),
        type: 'input',
        value: worldSettings.RCONPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RCONPort: v });
        },
      },
      RESTAPIPort: {
        id: 'RESTAPIPort',
        disabled: isServerRunning,
        title: t('RESTAPIPort'),
        desciption: t('RESTAPIPortDesc'),
        type: 'input',
        value: worldSettings.RESTAPIPort,
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, RESTAPIPort: v });
        },
      },
      OpenToCommunity: {
        id: 'OpenToCommunity',
        disabled: isServerRunning,
        title: t('OpenToCommunity'),
        desciption: t('OpenToCommunityDesc'),

        value: serverInfo?.openToCommunity,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            openToCommunity: v,
          });
        },
      },
    },
    Mod: {
      ModManagementEnabled: {
        id: 'ModManagementEnabled',
        title: t('ModManagementEnabled'),
        desciption: t('ModManagementEnabledDesc'),
        value: serverInfo?.modManagementEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            modManagementEnabled: v,
          });
        },
      },
      UE4SSEnabled: {
        id: 'UE4SSEnabled',
        disabled: isServerRunning,
        title: t('UE4SSEnabled'),
        desciption: (
          <span>
            {t('UE4SSEnabledDesc')}
            <Link href="https://github.com/UE4SS-RE/RE-UE4SS">
              {t('OfficalWebsite')}
            </Link>
          </span>
        ),
        value: serverInfo?.ue4ssEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            ue4ssEnabled: v,
          });
        },
      },
      PalguardEnabled: {
        id: 'PalguardEnabled',
        disabled: isServerRunning,
        title: t('PalguardEnabled'),
        desciption: (
          <span>
            {t('PalguardEnabledDesc')}
            <Link href="https://www.nexusmods.com/palworld/mods/451/">
              {t('OfficalWebsite')}
            </Link>
          </span>
        ),
        value: serverInfo?.palguardEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            palguardEnabled: v,
          });
        },
      },
      PalguardSettings: {
        hidden: !serverInfo?.palguardEnabled,
        id: 'PalguardSettings',
        title: t('PalguardSettings'),
        desciption: t('PalguardSettingsDesc'),
        type: 'button',
        buttonText: t('Open'),
        action() {
          window.electron.openExplorer(
            window.electron.node
              .path()
              .join(
                window.electron.constant.USER_SERVER_INSTANCES_PATH(),
                selectedServerInstance,
                'server/Pal/Binaries/Win64/palguard.json',
              ),
          );
          // setOpenPalguardSettings(true);
        },
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
        desciption: t('ServerBackupDesc'),
        type: 'button',
        action() {
          setOpenSaveBackup(true);
        },
      },
      ServerPassword: {
        disabled: isServerRunning,
        id: 'ServerPassword',
        title: t('ServerPassword'),
        desciption: t('ServerPasswordDesc'),
        type: 'input',
        value: trimWorldSettingsString(worldSettings.ServerPassword),
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, ServerPassword: `"${v}"` });
        },
        secure: true,
      },
      AdminPassword: {
        disabled: isServerRunning,
        id: 'AdminPassword',
        title: t('AdminPassword'),
        desciption: t('AdminPasswordDesc'),
        type: 'input',
        value: trimWorldSettingsString(worldSettings.AdminPassword),
        onValueChange(v) {
          setWorldSettings({ ...worldSettings, AdminPassword: `"${v}"` });
        },
        secure: true,
      },
      // WhiteListEnbaled: {
      //   hidden: !serverInfo?.palguardEnabled,
      //   id: 'WhiteListEnbaled',
      //   title: '啟用白名單',
      //   desciption: '啟用白名單系統。非邀請的用戶無法進入伺服器。',
      //   value: false,
      // },
    },
    Restart: {
      AutoRestart: {
        disabled: isServerRunning,
        id: 'AutoRestart',
        title: t('AutoRestart'),
        desciption: t('AutoRestartDesc'),
        type: 'options',
        values: [0, 6, 12, 24],
        labels: [
          t('SwitchOff'),
          '6 ' + t('HourPerTime'),
          '12 ' + t('HourPerTime'),
          '24 ' + t('HourPerTime'),
        ],
        value: serverInfo?.AutoRestart,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            AutoRestart: v,
          });
        },
      },
      CrashRestart: {
        id: 'CrashRestart',
        title: t('CrashRestart'),
        desciption: t('CrashRestartDesc'),
        value: serverInfo?.CrashRestart,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            CrashRestart: v,
          });
        },
      },
      // OverRamRestart: {
      //   id: 'OverRamRestart',
      //   title: t('OverRamRestart'),
      //   desciption: t('OverRamRestartDesc'),
      //   value: serverInfo?.OverRamRestart,
      //   onValueChange(v) {
      //     setServerInfo({
      //       ...serverInfo!,
      //       OverRamRestart: v,
      //     });
      //   },
      // },
    },
    Process: {
      UseIndependentProcess: {
        disabled: isServerRunning,
        id: 'UseIndependentProcess',
        title: t('UseIndependentProcess'),
        desciption: t('UseIndependentProcessDesc'),
        value: serverInfo?.UseIndependentProcess,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            UseIndependentProcess: v,
          });
        },
      },
    },
    OtherExtensions: {
      LogEnabled: {
        id: 'LogEnabled',
        title: t('LogEnabled'),
        desciption: t('LogEnabledDesc'),
        value: serverInfo?.LogEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            LogEnabled: v,
          });
        },
      },
      OnlineMap: {
        id: 'OnlineMap',
        title: t('OnlineMap'),
        desciption: t('OnlineMapDesc'),
        value: serverInfo?.OnlineMapEnabled,
        onValueChange(v) {
          setServerInfo({
            ...serverInfo!,
            OnlineMapEnabled: v,
          });
        },
      },
    },
  };

  return (
    <AlertDialog.Root>
      <div className="mx-4 pt-6 w-full h-screen overflow-y-scroll">
        <div className=" flex flex-col gap-4 pb-40">
          <Theme appearance="dark" style={{ background: 'inherit' }}>
            <Text color="gray" size="2">
              {t('SomeMightRestartToApplyChange')}
            </Text>
          </Theme>
          {_.map(settingOptions, (group, groupId) => (
            <SettingGroup title={t(groupId)} key={groupId}>
              {_.map(
                group,
                (option: any, optionId) =>
                  option.hidden || (
                    <SettingsItem
                      title={option.title}
                      desc={option.desciption}
                      type={option.type}
                      value={option.value}
                      values={option.values}
                      labels={option.labels}
                      onValueChange={option.onValueChange}
                      secure={option.secure}
                      action={option.action}
                      buttonText={option.buttonText}
                      disabled={option.disabled}
                    />
                  ),
              )}
            </SettingGroup>
          ))}
        </div>
        {openSaveBackup && <SaveBackup />}
        {/* {openPalguardSettings && <PalguardSettings />} */}
      </div>
    </AlertDialog.Root>
  );
}

function SettingsItem({
  title,
  desc,
  type,
  values,
  labels,
  value,
  onValueChange,
  secure,
  action,
  buttonText,
  disabled,
}: {
  title: string;
  desc: string;
  type?: 'input' | 'button' | 'options';
  values?: any[];
  labels?: string[];
  value: any;
  onValueChange: (v: any) => void;
  secure?: boolean;
  action?: () => void;
  buttonText?: string;
  disabled?: boolean;
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
                disabled={disabled}
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
            <Button size="2" onClick={action} disabled={disabled}>
              {buttonText || t('Open')}
            </Button>
          </AlertDialog.Trigger>
        )}
        {type === 'options' && (
          <Select.Root
            disabled={disabled}
            size="2"
            value={value}
            onValueChange={onValueChange}
          >
            <Select.Trigger />
            <Select.Content>
              {values?.map((v, i) => (
                <Select.Item value={v}>{labels?.[i]}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
        {!type && (
          <Switch
            disabled={disabled}
            checked={value}
            onCheckedChange={onValueChange}
          />
        )}
      </div>
    </Theme>
  );
}

function SettingGroup({ title, children }: { title: string; children: any }) {
  return (
    <div className="pb-2">
      <Text weight="bold" size="6">
        {title}
      </Text>
      <div className="flex flex-col gap-4 py-4">{children}</div>
    </div>
  );
}
