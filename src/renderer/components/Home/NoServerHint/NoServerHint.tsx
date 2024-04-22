import { AlertDialog } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../../../hooks/useTranslation';
import { LuServer } from 'react-icons/lu';

export default function NoServerHint() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center opacity-60">
      <div className="flex flex-col items-center -translate-y-2">
        <LuServer size={48} />
        <div className="text-2xl  p-4">{t('NoServer')}</div>
      </div>
    </div>
  );
}
