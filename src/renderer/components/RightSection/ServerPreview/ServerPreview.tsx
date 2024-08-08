import { useHistory } from 'react-router-dom';
import useTranslation from '../../../hooks/translation/useTranslation';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import { useState } from 'react';
import useServerIcon from '../../../hooks/server/icons/useServerIcon';
import useServerInfo from '../../../hooks/server/info/useServerInfo';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import { Tooltip } from '@radix-ui/themes';
import _ from 'lodash';

export default function ServerPreview() {
  const { t } = useTranslation();
  const history = useHistory();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { serverInfo } = useServerInfo(selectedServerInstance!);
  const serverIcon = useServerIcon(serverInfo?.iconId!);
  const { worldSettings } = useWorldSettings(selectedServerInstance!);

  const serverPreviewInfo = {
    publicIP: {
      id: 'PublicIP',
      value: '',
      display: true,
      secure: true,
      showValue: false,
    },
    publicPort: {
      id: 'PublicPort',
      value: '',
      display: true,
      secure: false,
      showValue: true,
    },
    rconPort: {
      id: 'RCONPort',
      value: '',
      display: worldSettings.RCONEnabled,
      secure: false,
      showValue: true,
    },
    restApiPort: {
      id: 'RESTAPIPort',
      display: worldSettings.RESTAPIEnabled,
      value: '',
      secure: false,
      showValue: true,
    },
  };

  return (
    <div className="flex flex-col items-center gap-1 pt-4">
      <div
        className="cursor-pointer"
        onClick={() => {
          history.push('/');
        }}
      >
        <img src={serverIcon?.image} alt="" className="w-32 h-32 select-none" />
      </div>
      {/* 伺服器名稱 */}
      <span
        className="cursor-pointer text-[120%]"
        onClick={() => {
          handleCopyToClickboard(
            trimWorldSettingsString(worldSettings?.ServerName),
          );
        }}
      >
        {trimWorldSettingsString(worldSettings?.ServerName)}
      </span>
      <div className="w-full text-[90%] flex flex-col items-center">
        {_.map(
          serverPreviewInfo,
          (info, key) =>
            // <Tooltip style={{ background: '#1b1421', color: 'white' }}>
            info.display && (
              <div className="w-[75%] flex justify-between items-center flex-wrap text-sm relative text-slate-200">
                <span>{t(info.id)}：</span>
                <span
                  className="cursor-pointer hover:underline font-mono "
                  onClick={() => {
                    handleCopyToClickboard(
                      trimWorldSettingsString(worldSettings?.[info.id]),
                    );
                  }}
                >
                  {(info.secure
                    ? trimWorldSettingsString(
                        worldSettings?.[info.id],
                      )?.replace(/./gu, '*')
                    : trimWorldSettingsString(worldSettings?.[info.id])) ||
                    t('HaventSavedYet')}
                </span>
                {/* <div
              className="absolute -right-5 cursor-pointer"
              onClick={() => {
                setIsShowIP(!isShowIP);
              }}
            >
              {isShowIP ? <PiEyeBold /> : <PiEyeClosedBold />}
            </div> */}
              </div>
            ),
          // </Tooltip>
        )}
      </div>
    </div>
  );
}

export const handleCopyToClickboard = (v: string) => {
  navigator.clipboard.writeText(v);
};
