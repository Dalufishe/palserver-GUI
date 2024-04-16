import React from 'react';
import { ServerIcon as ServerIconType } from '../../../../../../types/ServerIcon.types';
import useTranslation from '../../../../../hooks/useTranslation';
import useThisServerInfo from '../../ServerInfoProvider/useThisServerInfo';
import { AlertDialog } from '@radix-ui/themes';

type Props = {
  icon: ServerIconType;
};

export default function ServerIcon(props: Props) {
  const { t } = useTranslation();

  const { serverInfo, setServerInfo } = useThisServerInfo();

  return (
    <AlertDialog.Action
      onClick={async () => {
        setServerInfo({ ...serverInfo!, iconId: props.icon.id });
      }}
    >
      <div className="flex flex-col items-center justify-center gap-1 w-24 h-24 p-2 cursor-pointer rounded-lg relative hover:bg-slate-100">
        <div className="relative">
          <img
            src={props.icon.image}
            alt=""
            className="w-10 h-10 select-none"
          />
        </div>
        <span className="text-xs font-bold text-center w-24 break-words">
          {t(props.icon.id.split('_').slice(1, -2).join('_'))}
        </span>
      </div>
    </AlertDialog.Action>
  );
}
