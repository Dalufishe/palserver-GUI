import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import useServerEngineVersion from '../../../hooks/server/useServerEngineVersion';
import Channels from '../../../../main/ipcs/channels';
import useLatestGameVersion from '../../../hooks/firebase/useLatestGameVersion';
import electronAlert from '../../../utils/electronAlert';
import useServerEngineHasError from '../../../hooks/server/useServerEngineHasError';
import useAllServerInfo from '../../../hooks/server/info/useAllServerInfo';

export default function EngineNeedInstall() {
  const { t } = useTranslation();

  // 版本資訊
  const { versionValue: latestGameVersion } = useLatestGameVersion();
  const [serverEngineVersion, setServerEngineVersion] =
    useServerEngineVersion();

  // 狀態
  const engineNeedInstall = serverEngineVersion === 0;
  const engineHasError = useServerEngineHasError();
  const engineNeedUpdate =
    !engineHasError && // @ts-ignore
    latestGameVersion > serverEngineVersion &&
    serverEngineVersion !== 0;

  const serverInfos = useAllServerInfo();

  console.log();

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    // @ts-ignore
    setOpenDialog(engineNeedInstall || engineNeedUpdate || engineHasError);
  }, [engineNeedInstall, engineNeedUpdate, engineHasError]);

  const [serverEngineStartInstall, setServerEngineStartInstall] =
    useState(false);
  const [serverEnginehasInstall, setServerEngineHasInstall] = useState(false);
  const [serverInstallMessage, setServerInstallMessage] = useState('');

  function runServerInstall() {
    // 執行伺服器安裝
    setServerEngineStartInstall(true);
    window.electron.ipcRenderer.sendMessage(Channels.runServerInstall);
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.DONE,
      () => {
        setServerEngineHasInstall(true);
        setServerEngineStartInstall(false);
        setServerEngineVersion(latestGameVersion);
        // electronAlert(t('EngineInstallFinish'));
      },
    );
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.ERROR,
      (data) => {
        setServerEngineStartInstall(false);
        if (data.errorMessage === 'ASCII') {
          electronAlert(
            // eslint-disable-next-line no-underscore-dangle
            t('HasNotASCIIPath') + window.electron.node.__dirname(),
          );
        }
      },
    );
    window.electron.ipcRenderer.on(
      Channels.runServerInstallReply.PROGRESS,
      (data) => {
        if (data.message) {
          setServerInstallMessage(data.message);
        }
      },
    );
  }

  function runServerInstallandUpdate() {
    // 執行伺服器安裝
    setServerEngineStartInstall(true);
    window.electron.ipcRenderer.sendMessage(Channels.runServerInstall);
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.DONE,
      async () => {
        await Promise.all(
          serverInfos.map((serverId) =>
            window.electron.ipcRenderer.invoke(
              Channels.updateServerInstance,
              serverId,
            ),
          ),
        );

        // 確保所有的更新完成後才執行以下的狀態更新
        setServerEngineHasInstall(true);
        setServerEngineStartInstall(false);
        setServerEngineVersion(latestGameVersion);
      },
    );
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.ERROR,
      (data) => {
        setServerEngineStartInstall(false);
        if (data.errorMessage === 'ASCII') {
          electronAlert(
            // eslint-disable-next-line no-underscore-dangle
            t('HasNotASCIIPath') + window.electron.node.__dirname(),
          );
        }
      },
    );
    window.electron.ipcRenderer.on(
      Channels.runServerInstallReply.PROGRESS,
      (data) => {
        if (data.message) {
          setServerInstallMessage(data.message);
        }
      },
    );
  }

  async function runServerReInstall() {
    setServerEngineStartInstall(true);
    // 清除舊資料
    await window.electron.ipcRenderer.invoke(Channels.clearSystemCache);
    // 重新執行伺服器安裝
    window.electron.ipcRenderer.sendMessage(Channels.runServerInstall);
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.DONE,
      () => {
        setServerEngineHasInstall(true);
        setServerEngineStartInstall(false);
        setServerEngineVersion(latestGameVersion);
        // electronAlert(t('EngineInstallFinish'));
      },
    );
    window.electron.ipcRenderer.once(
      Channels.runServerInstallReply.ERROR,
      (data) => {
        setServerEngineStartInstall(false);
        if (data.errorMessage === 'ASCII') {
          electronAlert(
            // eslint-disable-next-line no-underscore-dangle
            t('HasNotASCIIPath') + window.electron.node.__dirname(),
          );
        }
      },
    );
    window.electron.ipcRenderer.on(
      Channels.runServerInstallReply.PROGRESS,
      (data) => {
        if (data.message) {
          setServerInstallMessage(data.message);
        }
      },
    );
  }

  return (
    <AlertDialog.Root open={openDialog}>
      <AlertDialog.Content maxWidth="650px">
        <AlertDialog.Title>
          {engineHasError &&
            (serverEnginehasInstall ? t('FixCompleted') : t('ServerError'))}
          {engineNeedInstall &&
            (serverEnginehasInstall
              ? t('InstallCompleted')
              : t('FirstTimeWelcome'))}
          {engineNeedUpdate &&
            (serverEnginehasInstall
              ? t('UpdateCompleted')
              : t('ServerNeedsUpdate'))}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          <div className="flex gap-8 mt-8 mb-4">
            {engineHasError &&
              (serverEnginehasInstall
                ? t('ServerFileFixCompleted')
                : t('ServerFileMissing'))}
            {engineNeedInstall &&
              (serverEnginehasInstall
                ? t('ServerInstalledCompleted')
                : t('InstallReminder'))}
            {engineNeedUpdate &&
              (serverEnginehasInstall
                ? t('AllServersUpdated')
                : t('UpdateReminder'))}
          </div>
          <div className="flex gap-8 mt-8 mb-4">{serverInstallMessage}</div>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          {engineHasError &&
            (serverEnginehasInstall ? (
              <AlertDialog.Cancel>
                <Button onClick={() => setOpenDialog(false)}>
                  {t('Close')}
                </Button>
              </AlertDialog.Cancel>
            ) : (
              <AlertDialog.Action>
                <Button
                  onClick={runServerReInstall}
                  loading={serverEngineStartInstall}
                >
                  {t('Fix')}
                </Button>
              </AlertDialog.Action>
            ))}
          {engineNeedInstall &&
            (serverEnginehasInstall ? (
              <AlertDialog.Cancel>
                <Button onClick={() => setOpenDialog(false)}>
                  {t('Close')}
                </Button>
              </AlertDialog.Cancel>
            ) : (
              <AlertDialog.Action>
                <Button
                  onClick={runServerInstall}
                  loading={serverEngineStartInstall}
                >
                  {t('Install')}
                </Button>
              </AlertDialog.Action>
            ))}
          {engineNeedUpdate && (
            <AlertDialog.Cancel>
              <Button
                onClick={() => setOpenDialog(false)}
                color="gray"
                variant="soft"
              >
                {t('Cancel')}
              </Button>
            </AlertDialog.Cancel>
          )}
          {engineNeedUpdate && !serverEnginehasInstall && (
            <AlertDialog.Action>
              <Button
                onClick={runServerReInstall}
                loading={serverEngineStartInstall}
              >
                {t('OneClickUpdate')}
              </Button>
            </AlertDialog.Action>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
