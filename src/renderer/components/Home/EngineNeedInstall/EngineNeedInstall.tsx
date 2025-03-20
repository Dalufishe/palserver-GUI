import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import useServerEngineVersion from '../../../hooks/server/useServerEngineVersion';
import Channels from '../../../../main/ipcs/channels';
import useLatestGameVersion from '../../../hooks/firebase/useLatestGameVersion';
import electronAlert from '../../../utils/electronAlert';
import useServerEngineHasError from '../../../hooks/server/useServerEngineHasError';

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

  console.log(serverEnginehasInstall, engineHasError)

  return (
    <AlertDialog.Root open={openDialog}>
      <AlertDialog.Content maxWidth="650px">
        {/* 應用程式設定 */}
        <AlertDialog.Title>
          {engineHasError &&
            (serverEnginehasInstall ? '修復完成！' : '伺服器存在異常')}
          {engineNeedInstall &&
            (serverEnginehasInstall ? '安裝完成！' : '初次見面，歡迎您！')}
          {engineNeedUpdate &&
            (serverEnginehasInstall
              ? '更新完成！'
              : '遊戲存在新版本，伺服器需要更新')}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          <div className="flex gap-8 mt-8 mb-4">
            {engineHasError &&
              (serverEnginehasInstall
                ? '專用伺服器檔案修復完成。'
                : '專用伺服器檔案存在缺失，可能是因為安裝過程中斷或檔案損毀。請嘗試修復專用伺服器。')}

            {engineNeedInstall &&
              (serverEnginehasInstall
                ? '專用伺服器已安裝完成。'
                : '專用伺服器尚未安裝。您必須先安裝專用伺服器，才能使用 Palserver-GUI。（初次安裝時間約 7 ~ 10 分鐘）。')}

            {engineNeedUpdate &&
              (serverEnginehasInstall
                ? '所有專用伺服器均已更新至最新版本。'
                : 'Palworld 釋出新版本後，palserver-GUI 管理的專用伺服器（並非 palserver-GUI 本身）也需要更新。您可以選擇一次性更新所有伺服器，或逐一手動更新（可在伺服器管理頁面選擇）。')}
          </div>
          <div className="flex gap-8 mt-8 mb-4">{serverInstallMessage}</div>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          {engineHasError &&
            (serverEnginehasInstall ? (
              <AlertDialog.Cancel>
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  關閉
                </Button>
              </AlertDialog.Cancel>
            ) : (
              <AlertDialog.Action>
                <Button
                  onClick={() => {
                    runServerReInstall();
                  }}
                  loading={serverEngineStartInstall}
                >
                  修復
                </Button>
              </AlertDialog.Action>
            ))}

          {engineNeedInstall &&
            (serverEnginehasInstall ? (
              <AlertDialog.Cancel>
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  關閉
                </Button>
              </AlertDialog.Cancel>
            ) : (
              <AlertDialog.Action>
                <Button
                  onClick={() => {
                    runServerInstall();
                  }}
                  loading={serverEngineStartInstall}
                >
                  安裝
                </Button>
              </AlertDialog.Action>
            ))}
          {engineNeedUpdate && (
            <AlertDialog.Cancel>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
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
                onClick={() => {
                  runServerReInstall();
                }}
                loading={serverEngineStartInstall}
              >
                一次更新
              </Button>
            </AlertDialog.Action>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
