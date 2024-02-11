import React, { useEffect, useState } from "react";
import { electron, ipcRenderer } from "../constant/contextBridge";
import {
  Button,
  IconButton,
  Select,
  Slider,
  Switch,
  TextFieldInput,
  Tooltip,
} from "@radix-ui/themes";
import { isBoolean, isEmpty, map, range } from "lodash";
import zh_tw from "../locales/zh_tw";
import useGameSave from "../hooks/useGameSave";
import useSelectedGameSave from "../redux/selectGameSave/useSelectedGameSave";
import { useHistory } from "react-router-dom";
import { MdEditDocument, MdSettings } from "react-icons/md";
import useAppLanguage from "../redux/appLanguage/useAppLanguage";
import LOCALES from "../locales";

const settingsOptions: any = {
  DayTimeSpeedRate: { range: [1, 50], type: "num_10" },
  NightTimeSpeedRate: { range: [1, 50], type: "num_10" },
  ExpRate: { range: [1, 200], type: "num_10" },
  PalCaptureRate: { range: [5, 20], type: "num_10" },
  PalSpawnNumRate: { range: [5, 30], type: "num_10" },
  PalDamageRateAttack: { range: [1, 50], type: "num_10" },
  PalDamageRateDefense: { range: [1, 50], type: "num_10" },
  PalStomachDecreaceRate: { range: [1, 50], type: "num_10" },
  PalStaminaDecreaceRate: { range: [1, 50], type: "num_10" },
  PalAutoHPRegeneRate: { range: [1, 50], type: "num_10" },
  PalAutoHpRegeneRateInSleep: { range: [1, 50], type: "num_10" },
  PlayerDamageRateAttack: { range: [1, 50], type: "num_10" },
  PlayerDamageRateDefense: { range: [1, 50], type: "num_10" },
  PlayerStomachDecreaceRate: { range: [1, 50], type: "num_10" },
  PlayerStaminaDecreaceRate: { range: [1, 50], type: "num_10" },
  PlayerAutoHPRegeneRate: { range: [1, 50], type: "num_10" },
  PlayerAutoHpRegeneRateInSleep: { range: [1, 50], type: "num_10" },
  BuildObjectDamageRate: { range: [1, 50], type: "num_10" },
  BuildObjectDeteriorationDamageRate: { range: [1, 50], type: "num_10" },
  DropItemMaxNum: { range: [0, 5000], type: "num" },
  CollectionObjectHpRate: { range: [5, 30], type: "num_10" },
  CollectionObjectRespawnSpeedRate: { range: [5, 30], type: "num_10" },
  CollectionDropRate: { range: [5, 30], type: "num_10" },
  EnemyDropItemRate: { range: [5, 30], type: "num_10" },
  PalEggDefaultHatchingTime: { range: [0, 100], type: "num" },
  GuildPlayerMaxNum: { range: [1, 100], type: "num" },

  DeathPenalty: {
    range: ["All", "None", "Item", "ItemAndEquipment"],
    type: "options",
  },
  bEnablePlayerToPlayerDamage: { type: "switch" },
  bEnableFriendlyFire: { type: "switch" },
  bEnableInvaderEnemy: { type: "switch" },
  bEnableAimAssistPad: { type: "switch" },
  bEnableAimAssistKeyboard: { type: "switch" },

  BaseCampMaxNum: { range: [0, 1024], type: "num" },
  BaseCampWorkerMaxNum: { range: [1, 20], type: "num" },
  DropItemAliveMaxHours: { range: [0, 50], type: "num_10" },
  bAutoResetGuildNoOnlinePlayers: { type: "switch" },
  AutoResetGuildTimeNoOnlinePlayers: { range: [0, 24 * 7], type: "num" },
  WorkSpeedRate: { range: [1, 100], type: "num_10" },
  bIsMultiplay: { type: "switch" },
  bIsPvP: { type: "switch" },
  bCanPickupOtherGuildDeathPenaltyDrop: { type: "switch" },
  bEnableNonLoginPenalty: { type: "switch" },
  bEnableFastTravel: { type: "switch" },
  bIsStartLocationSelectByMap: { type: "switch" },
  bExistPlayerAfterLogout: { type: "switch" },
  bEnableDefenseOtherGuildPlayer: { type: "switch" },
  CoopPlayerMaxNum: { range: [1, 32], type: "num" },
  ServerPlayerMaxNum: { range: [1, 32], type: "num" },
};

export default function WorldSettings() {
  const history = useHistory();
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();
  const gameSave = useGameSave(selectedGameSave);

  const [worldSettings, setWorldSettings] = useState<any>({});
  useEffect(() => {
    !isEmpty(gameSave.settings) && setWorldSettings(gameSave.settings);
  }, [gameSave.settings]);

  const handleRecoverSave = () => {
    !isEmpty(gameSave.settings) && setWorldSettings(gameSave.settings);
  };

  const handleSetSave = () => {
    ipcRenderer.send("request-set-save", selectedGameSave, {
      settings: worldSettings,
    });
    history.push("/");
  };

  const handleOpenSource = () => {
    history.push("/");
    electron.openExplorer(
      `./saves/${selectedGameSave}/Config/WindowsServer/PalWorldSettings.ini`
    );
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll">
      <div className="flex flex-col justify-center gap-2 p-2">
        {map(settingsOptions, (v, k) => (
          <div key={k} className="w-full flex items-center gap-4">
            <label className="w-60">{zh_tw[k]}：</label>
            <div className="w-14">
              {k === "DeathPenalty" ? (
                zh_tw["DeathPenalty_" + worldSettings[k]]
              ) : isBoolean(worldSettings[k]) ? (
                zh_tw[worldSettings[k] ? "SwitchOn" : "SwitchOff"]
              ) : (
                <TextFieldInput
                  color="blue"
                  style={{
                    background: "#1b1421",
                    color: "white",
                    fontSize: 16,
                  }}
                  size="1"
                  type="number"
                  value={worldSettings[k]}
                  onChange={(e) => {
                    setWorldSettings({
                      ...worldSettings,
                      [k]: e.target.value,
                    });
                  }}
                />
              )}
            </div>
            {settingsOptions[k].type === "switch" && (
              <Switch
                variant="classic"
                checked={worldSettings[k]}
                onCheckedChange={(v) => {
                  setWorldSettings({
                    ...worldSettings,
                    [k]: v,
                  });
                }}
              />
            )}
            {settingsOptions[k].type === "options" && (
              <Select.Root
                size="2"
                value={worldSettings[k]}
                onValueChange={(v) => {
                  setWorldSettings({
                    ...worldSettings,
                    [k]: v,
                  });
                }}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {settingsOptions[k].range.map((option) => (
                      <Select.Item value={option}>
                        {k === "DeathPenalty" &&
                          zh_tw["DeathPenalty_" + option]}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
            {(settingsOptions[k].type === "num" ||
              settingsOptions[k].type === "num_10") && (
              <Slider
                size="1"
                defaultValue={[1]}
                min={settingsOptions[k].range[0]}
                max={settingsOptions[k].range[1]}
                value={[
                  settingsOptions[k].type === "num"
                    ? worldSettings[k]
                    : worldSettings[k] * 10,
                ]}
                onValueChange={(v) => {
                  setWorldSettings({
                    ...worldSettings,
                    [k]: settingsOptions[k].type === "num" ? v[0] : v[0] / 10,
                  });
                }}
                className="flex-1"
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-4 relative">
        <Tooltip content={LOCALES[appLanguage].EditFromSourceFile}>
          <IconButton onClick={handleOpenSource} color="gray" radius="full">
            <MdEditDocument />
          </IconButton>
        </Tooltip>
        <Button color="gray" onClick={handleRecoverSave}>
          {LOCALES[appLanguage].Reset}
        </Button>
        <Button onClick={handleSetSave}>{LOCALES[appLanguage].Confirm}</Button>
      </div>
    </div>
  );
}
