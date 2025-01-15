import fs from 'fs/promises';
import ini from 'ini';
import palServerSettingConverter from '../../utils/palServerSettingConverter';

export default async function readWorldSettingsini(
  worldOptionsiniPath: string,
): Promise<any> {
  const worldSettingsiniText = await fs.readFile(worldOptionsiniPath, {
    encoding: 'utf-8',
  });

  const worldSettingsiniJson = palServerSettingConverter.parse(
    ini.parse(worldSettingsiniText)['/Script/Pal'].PalGameWorldSettings
      .OptionSettings,
  );

  return worldSettingsiniJson;
}
