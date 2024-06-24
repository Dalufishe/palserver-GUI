import { Tabs } from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../hooks/translation/useTranslation';
import LuaMods from '../components/ModManagement/LuaMods/LuaMods';
import PakMods from '../components/ModManagement/PakMods/PakMods';
import PakLogicMods from '../components/ModManagement/PakLogicMods/PakLogicMods';
import ExportModsToClientSide from '../components/ModManagement/ExportModsToClientSide/ExportModsToClientSide';

export default function ModManagement() {
  const { t } = useTranslation();

  const [modMode, setModMode] = useState('lua');

  return (
    <div className="page-container overflow-y-scroll">
      <div className="absolute right-6 top-6">
        <ExportModsToClientSide />
      </div>
      <Tabs.Root
        value={modMode}
        onValueChange={(v: any) => {
          setModMode(v);
        }}
      >
        <Tabs.List>
          <Tabs.Trigger value="lua" style={{ color: 'white', fontWeight: 500 }}>
            {t('LuaMods')}
          </Tabs.Trigger>
          <Tabs.Trigger value="pak" style={{ color: 'white', fontWeight: 500 }}>
            {t('PakMods')}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pak-l"
            style={{ color: 'white', fontWeight: 500 }}
          >
            {t('PakLogicMods')}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      {modMode === 'lua' && <LuaMods />}
      {modMode === 'pak' && <PakMods />}
      {modMode === 'pak-l' && <PakLogicMods />}
    </div>
  );
}
