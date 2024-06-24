import { AlertDialog, ContextMenu } from '@radix-ui/themes';
import React, { useState } from 'react';
import { LuFileCog, LuFolderCog } from 'react-icons/lu';
import useTranslation from '../../../../hooks/translation/useTranslation';
import useSelectedServerInstance from '../../../../redux/selectedServerInstance/useSelectedServerInstance';
import Channels from '../../../../../main/ipcs/channels';

type Props = {
  name: string;
  isDirectory: boolean;
};

export default function PakLogicModsItem(props: Props) {
  const { t } = useTranslation();

  // const [modEnabled, setModEnabled] = useState(props.enabled);
  // const handleEnabledMod = () => {
  //   ipcRenderer.send("request-enabled-lua-mods", props.name, !modEnabled);
  //   setModEnabled(!modEnabled);
  // };

  const { selectedServerInstance } = useSelectedServerInstance();

  const handleViewSourceCode = () => {
    const filePath = window.electron.node
      .path()
      .join(
        window.electron.constant.USER_SERVER_INSTANCES_PATH(),
        selectedServerInstance,
        'server',
        `Pal/Content/Paks/LogicMods/${props.name}`,
      );
    window.electron.openExplorer(filePath);
  };

  const handleDeleteMod = () => {
    window.electron.ipcRenderer.invoke(
      Channels.deletePakLogicMods,
      selectedServerInstance,
      props.name,
    );
  };

  return (
    <AlertDialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            // style={{ opacity: modEnabled ? 1 : 0.3 }}
            className="flex flex-col gap-y-2 items-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1 relative"
          >
            {props.isDirectory ? (
              <LuFolderCog size={32} className="absolute top-4" />
            ) : (
              <LuFileCog size={32} className="absolute top-4" />
            )}
            <span className="absolute top-14 text-xs text-center w-24 break-words">
              {props.name}
            </span>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Group>
            {/* <AlertDialog.Trigger onClick={handleEnabledMod}>
              <ContextMenu.Item shortcut=" ">
                {modEnabled
                  ? LOCALES[appLanguage].Disabled
                  : LOCALES[appLanguage].Enabled}
                {LOCALES[appLanguage].Mod}
              </ContextMenu.Item>
            </AlertDialog.Trigger> */}
            {props.isDirectory && (
              <>
                <ContextMenu.Item onClick={handleViewSourceCode}>
                  {t('OpenFilePath')}
                </ContextMenu.Item>
                <ContextMenu.Separator />
              </>
            )}
            {/* 重新命名 */}
            {/* <AlertDialog.Trigger>
              <ContextMenu.Item>{LOCALES[appLanguage].Rename}</ContextMenu.Item>
            </AlertDialog.Trigger> */}
          </ContextMenu.Group>

          {/* 刪除模組 */}
          <ContextMenu.Item shortcut="⌫" color="red" onClick={handleDeleteMod}>
            {t('DeleteMod')}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      {/* <RenameLuaMod name={props.name} rename={props.rename} /> */}
    </AlertDialog.Root>
  );
}
