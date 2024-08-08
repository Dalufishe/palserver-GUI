/* eslint-disable no-nested-ternary */

import { Select, Slider, Switch, TextField, Theme } from '@radix-ui/themes';
import { isBoolean } from 'lodash';
import useTranslation from '../../../hooks/translation/useTranslation';
import { worldSettingsOptions } from '../settings';
function WorldSettingsItem({ id, worldSettings, setWorldSettings }) {
  const { t } = useTranslation();

  return (
    <div key={id} className="w-full flex items-center gap-4">
      <label className="w-80">{t(id)}：</label>
      <div className="w-14">
        {worldSettingsOptions[id]?.type === 'options' ? (
          t(`${id}_${worldSettings[id]}`)
        ) : worldSettingsOptions[id].type === 'switch' ? (
          t(
            worldSettings[id] || worldSettingsOptions[id]?.default
              ? 'SwitchOn'
              : 'SwitchOff',
          )
        ) : (
          <div className="font-mono">
            <Theme
              appearance="dark"
              style={{ background: 'inherit', fontFamily: 'inherit' }}
            >
              <TextField.Root
                style={{
                  fontFamily: 'inherit',
                  fontSize: 16,
                  width: 60,
                }}
                size="1"
                type="number"
                value={
                  worldSettings[id] ||
                  (worldSettingsOptions[id].type === 'num'
                    ? worldSettingsOptions[id]?.default
                    : (worldSettingsOptions[id]?.default || 0) / 10)
                }
                onChange={(e) => {
                  setWorldSettings({
                    ...worldSettings,
                    [id]: Number(e.target.value),
                  });
                }}
              />
            </Theme>
          </div>
        )}
      </div>
      {worldSettingsOptions[id]?.type === 'switch' && (
        <Switch
          variant="classic"
          checked={worldSettings[id] || worldSettingsOptions[id]?.default}
          onCheckedChange={(v) => {
            setWorldSettings({
              ...worldSettings,
              [id]: v,
            });
          }}
        />
      )}
      {worldSettingsOptions[id]?.type === 'options' && (
        <Select.Root
          size="2"
          value={worldSettings[id] || worldSettingsOptions[id]?.default}
          onValueChange={(v) => {
            setWorldSettings({
              ...worldSettings,
              [id]: v,
            });
          }}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {worldSettingsOptions[id].range.map((option) => (
                <Select.Item value={option}>
                  {worldSettingsOptions[id]?.type === 'options' &&
                    t(`${id}_${option}`)}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      {(worldSettingsOptions[id]?.type === 'num' ||
        worldSettingsOptions[id]?.type === 'num_10') && (
        <Slider
          size="1"
          defaultValue={[1]}
          min={worldSettingsOptions[id].range[0]}
          max={worldSettingsOptions[id].range[1]}
          value={[
            (worldSettingsOptions[id].type === 'num'
              ? worldSettings[id]
              : worldSettings[id] * 10) || worldSettingsOptions[id]?.default,
          ]}
          onValueChange={(v) => {
            setWorldSettings({
              ...worldSettings,
              [id]: worldSettingsOptions[id].type === 'num' ? v[0] : v[0] / 10,
            });
          }}
          className="flex-1"
        />
      )}
    </div>
  );
}
export default WorldSettingsItem;
