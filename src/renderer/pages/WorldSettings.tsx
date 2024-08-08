import { useEffect, useState } from 'react';
import { IconButton, Tabs, Tooltip } from '@radix-ui/themes';
import useTranslation from '../hooks/translation/useTranslation';
import { MdEditDocument } from 'react-icons/md';
import _, { isEmpty, map, pickBy } from 'lodash';
import {
  GuildSettingsOptionsKey,
  OthersSettingsOptionsKey,
  PalSettingsOptionsKey,
  PlayerSettingsOptionsKey,
  worldSettingsOptions,
} from '../components/WorldSettings/settings';
import useSelectedServerInstance from '../redux/selectedServerInstance/useSelectedServerInstance';
import useWorldSettings from '../hooks/server/world-settings/useWorldSettings';
import WorldSettingsItem from '../components/WorldSettings/WorldSettingsItem/WorldSettingsItem';
import WorldSettingsJSONView from '../components/WorldSettings/WorldSettingsJSONView/WorldSettingsJSONView';
import WorldSettingsActionbar from '../components/WorldSettings/WorldSettingsActionbar/WorldSettingsActionbar';

export default function WorldSettings() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();

  const [hasInitWorldSettings, setHasInitWorldSettings] = useState(false);
  const { worldSettings: prevWorldSettings } = useWorldSettings(
    selectedServerInstance,
  );
  const [worldSettings, setWorldSettings] = useState<any>({});
  useEffect(() => {
    if (!isEmpty(prevWorldSettings) && !hasInitWorldSettings) {
      setWorldSettings(prevWorldSettings);
      setHasInitWorldSettings(true);
    }
  }, [prevWorldSettings, hasInitWorldSettings]);

  const [interfaceMode, setInterfaceMode] = useState<'gui' | 'json'>('gui');

  return (
    <div className="page-container overflow-y-scroll">
      <div className="flex flex-row items-start gap-3 flex-wrap overflow-y-scroll overflow-x-hidden">
        <div className="absolute right-6 top-6 flex gap-2">
          <Tooltip content={t('EditFromSourceFile')}>
            <IconButton
              onClick={() => {
                const worldSettingsPath = window.electron.node
                  .path()
                  .join(
                    window.electron.constant.USER_SERVER_INSTANCES_PATH(),
                    selectedServerInstance,
                    'server',
                    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
                  );

                window.electron.openExplorer(worldSettingsPath);
              }}
              color="gray"
            >
              <MdEditDocument />
            </IconButton>
          </Tooltip>
          {/* <SegmentedControl.Root
            value={interfaceMode}
            onValueChange={(v: any) => {
              setInterfaceMode(v);
            }}
            size="2"
            variant="classic"
          >
            <SegmentedControl.Item value="gui">
              <LuAppWindow size={16} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="json">
              <TbJson size={24} />
            </SegmentedControl.Item>
          </SegmentedControl.Root> */}
        </div>
        {interfaceMode === 'gui' ? (
          <Tabs.Root defaultValue="pal" style={{ width: '100%' }}>
            <Tabs.List>
              <Tabs.Trigger
                value="pal"
                style={{ color: 'white', fontWeight: 500 }}
              >
                {/* 帕魯設定 */}
                {t('PalSettings')}
              </Tabs.Trigger>
              <Tabs.Trigger
                value="player"
                style={{ color: 'white', fontWeight: 500 }}
              >
                {/* 玩家設定 */}
                {t('PlayerSettings')}
              </Tabs.Trigger>
              <Tabs.Trigger
                value="guild"
                style={{ color: 'white', fontWeight: 500 }}
              >
                {/* 公會設定 */}
                {t('GuildSettings')}
              </Tabs.Trigger>
              <Tabs.Trigger
                value="others"
                style={{ color: 'white', fontWeight: 500 }}
              >
                {/* 其他設定 */}
                {t('OthersSettings')}
              </Tabs.Trigger>
            </Tabs.List>
            <div className="py-4">
              <Tabs.Content value="pal">
                <div className="flex flex-col justify-center gap-2 p-2">
                  {map(
                    pickBy(worldSettingsOptions, (v, k) =>
                      PalSettingsOptionsKey.includes(k),
                    ),
                    (v, k) => (
                      <WorldSettingsItem
                        key={k}
                        id={k}
                        worldSettings={worldSettings}
                        setWorldSettings={setWorldSettings}
                      />
                    ),
                  )}
                </div>
              </Tabs.Content>
              <Tabs.Content value="player">
                <div className="flex flex-col justify-center gap-2 p-2">
                  {map(
                    pickBy(worldSettingsOptions, (v, k) =>
                      PlayerSettingsOptionsKey.includes(k),
                    ),
                    (v, k) => (
                      <WorldSettingsItem
                        key={k}
                        id={k}
                        worldSettings={worldSettings}
                        setWorldSettings={setWorldSettings}
                      />
                    ),
                  )}
                </div>
              </Tabs.Content>
              <Tabs.Content value="guild">
                <div className="flex flex-col justify-center gap-2 p-2">
                  {map(
                    pickBy(worldSettingsOptions, (v, k) =>
                      GuildSettingsOptionsKey.includes(k),
                    ),
                    (v, k) => (
                      <WorldSettingsItem
                        key={k}
                        id={k}
                        worldSettings={worldSettings}
                        setWorldSettings={setWorldSettings}
                      />
                    ),
                  )}
                </div>
              </Tabs.Content>
              <Tabs.Content value="others">
                <div className="flex flex-col justify-center gap-2 p-2">
                  {map(
                    pickBy(worldSettingsOptions, (v, k) =>
                      OthersSettingsOptionsKey.includes(k),
                    ),
                    (v, k) => (
                      <WorldSettingsItem
                        key={k}
                        id={k}
                        worldSettings={worldSettings}
                        setWorldSettings={setWorldSettings}
                      />
                    ),
                  )}
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        ) : (
          <WorldSettingsJSONView worldSettings={worldSettings} />
        )}
      </div>
      <WorldSettingsActionbar
        prevWorldSettings={prevWorldSettings}
        worldSettings={worldSettings}
        setWorldSettings={setWorldSettings}
      />
    </div>
  );
}
// <Button onClick={() => {}}>{t('VerifyChange')}</Button>;
