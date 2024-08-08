import fs from 'fs/promises';
import ini from 'ini';
import palServerSettingConverter from '../../utils/palServerSettingConverter';

export default async function writeWorldSettingsini(
  worldOptionsiniPath: string,
  worldOptionsiniJson: any,
) {
  let worldOptionsiniText = ini.stringify({
    '/Script/Pal': {
      PalGameWorldSettings: {
        OptionSettings: palServerSettingConverter.format(worldOptionsiniJson),
      },
    },
  });

  // 找到OptionSettings=后面的引号的位置
  const startIndex =
    worldOptionsiniText.indexOf('OptionSettings="') + 'OptionSettings="'.length;

  // 截取字符串
  worldOptionsiniText = `[/Script/Pal.PalGameWorldSettings]\nOptionSettings=${worldOptionsiniText.substring(
    startIndex,
  )}`;
  // worldOptionsiniText = worldOptionsiniText.substring(
  //   0,
  //   worldOptionsiniText.length - 1,
  // );
  worldOptionsiniText = worldOptionsiniText.replaceAll('\\', '').slice(0, -1);
  // .replaceAll(/\)+/gu, ')"');

  await fs.writeFile(worldOptionsiniPath, worldOptionsiniText, {
    encoding: 'utf-8',
  });
}
