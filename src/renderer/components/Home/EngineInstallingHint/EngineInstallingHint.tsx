import { AlertDialog } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import { LuServer } from 'react-icons/lu';

export default function EngineInstallingHint({ installMessage }) {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="w-full h-full flex items-center justify-center opacity-60">
        <div className="flex flex-col items-center -translate-y-2">
          <LuServer size={48} />
          <div className="text-2xl p-4 text-center">
            {t('EngineInstalling')}
          </div>
          <div className="text-center">{installMessage}</div>
        </div>
      </div>
    </div>
  );
}
