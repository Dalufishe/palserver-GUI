import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import useSaveMeta from "../../../hooks/useSaveMeta";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../locales";

export default function SetBackupTime() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();
  const { getSaveMetaData, setSaveMetaData } = useSaveMeta();
  const saveMetaData = getSaveMetaData(selectedGameSave);

  const [backupTimeDuration, setBackupTimeDuration] = useState<string>(
    String(1000 * 60 * 60)
  );

  useEffect(() => {
    if (saveMetaData?.backupTimeDuration)
      setBackupTimeDuration(String(saveMetaData?.backupTimeDuration));
  }, [saveMetaData?.backupTimeDuration]);

  const handleSetBackupTimeDuration = (v: string) => {
    setBackupTimeDuration(v);

    setSaveMetaData(selectedGameSave, {
      ...saveMetaData,
      backupTimeDuration: Number(v),
    });
  };

  return (
    <Select.Root
      value={backupTimeDuration}
      onValueChange={(v) => handleSetBackupTimeDuration(v)}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Item value={String(1000 * 60 * 60)}>
          1 {LOCALES[appLanguage].HourPerTime}
        </Select.Item>
        <Select.Item value={String(1000 * 60 * 60 * 3)}>
          3 {LOCALES[appLanguage].HourPerTime}
        </Select.Item>
        <Select.Item value={String(1000 * 60 * 60 * 12)}>
          12 {LOCALES[appLanguage].HourPerTime}
        </Select.Item>
        <Select.Item value={String(1000 * 60 * 60 * 24)}>
          24 {LOCALES[appLanguage].HourPerTime}
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
