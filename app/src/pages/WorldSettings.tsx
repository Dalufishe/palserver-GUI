import React, { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";
import { Button, Select, Slider } from "@radix-ui/themes";
import { isEmpty, map } from "lodash";
import zh_tw from "../locales/zh_tw";
import useGameSave from "../hooks/useGameSave";
import useSelectedGameSave from "../redux/selectGameSave/useSelectedGameSave";
import { useHistory } from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";

const settingsOptions = {
  DayTimeSpeedRate: [1, 50],
  NightTimeSpeedRate: [1, 50],
  ExpRate: [1, 200],
  PalCaptureRate: [5, 20],
  PalSpawnNumRate: [5, 30],
  PalDamageRateAttack: [1, 50],
  PalDamageRateDefense: [1, 50],
  PalStomachDecreaceRate: [1, 50],
  PalStaminaDecreaceRate: [1, 50],
  PalAutoHPRegeneRate: [1, 50],
  PalAutoHpRegeneRateInSleep: [1, 50],
  PlayerDamageRateAttack: [1, 50],
  PlayerDamageRateDefense: [1, 50],
  PlayerStomachDecreaceRate: [1, 50],
  PlayerStaminaDecreaceRate: [1, 50],
  PlayerAutoHPRegeneRate: [1, 50],
  PlayerAutoHpRegeneRateInSleep: [1, 50],
  BuildObjectDamageRate: [1, 50],
  BuildObjectDeteriorationDamageRate: [1, 50],
  DropItemMaxNum: [0, 5000],
  //
  CollectionObjectHpRate: [5, 30],
  CollectionObjectRespawnSpeedRate: [5, 30],
  CollectionDropRate: [5, 30],
  // PalEggDefaultHatchingTime: [0, 2400],
  //
  //
  GuildPlayerMaxNum: [1, 100],
  BaseCampWorkerMaxNum: [1, 20],
};

export default function WorldSettings() {
  const history = useHistory();

  const { selectedGameSave } = useSelectedGameSave();
  const gameSave = useGameSave(selectedGameSave);

  const [worldSettings, setWorldSettings] = useState({});
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
    history.push("/server-settings");
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll">
      <div className="flex flex-col justify-center gap-2 p-2">
        {/* 難度 */}
        {/* <div className="w-full flex items-center gap-4">
                <label>難度：</label>
                <Select.Root size="1" defaultValue="normal">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="easy">休閒</Select.Item>
                    <Select.Item value="normal">普通</Select.Item>
                    <Select.Item value="hard">困難</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div> */}
        {map(settingsOptions, (v, k) => (
          <div key={k} className="w-full flex items-center gap-4">
            <label className="w-60">{zh_tw[k]}：</label>
            <div className="w-10">{worldSettings[k]}</div>
            <Slider
              size="1"
              defaultValue={[1]}
              min={settingsOptions[k][0]}
              max={settingsOptions[k][1]}
              value={[
                k === "DropItemMaxNum" ||
                k === "GuildPlayerMaxNum" ||
                k === "BaseCampWorkerMaxNum"
                  ? worldSettings[k]
                  : worldSettings[k] * 10,
              ]}
              onValueChange={(v) => {
                setWorldSettings({
                  ...worldSettings,
                  [k]:
                    k === "DropItemMaxNum" ||
                    k === "GuildPlayerMaxNum" ||
                    k === "BaseCampWorkerMaxNum"
                      ? v[0]
                      : v[0] / 10,
                });
              }}
              className="flex-1"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button color="gray" onClick={handleRecoverSave}>
          復原
        </Button>
        <Button onClick={handleSetSave}>確定</Button>
      </div>
    </div>
  );
}
