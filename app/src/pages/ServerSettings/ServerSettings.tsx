import React from "react";
import useWorldSettings from "../../hooks/useWorldSettings";
import GameSaveBtn from "./GameSaveButton/GameSaveButton";
import styles from "./ServerSettings.module.css";
import AddSaveButton from "./AddSaveButton/AddSaveButton";
import useSaveMeta from "../../hooks/useSaveMeta";

export default function ServerSettings() {
  const worldSettings = useWorldSettings();
  const { metaData } = useSaveMeta();

  return (
    <div className={styles.container}>
      <div className="flex flex-row items-start gap-3 flex-wrap">
        {metaData?.map((save: any) => (
          <GameSaveBtn key={save.id} saveMetaData={save} />
        ))}
        <AddSaveButton />
      </div>
      <div className="absolute bottom-2 left-2 text-xs">0.0.5 (BETA) </div>
    </div>
  );
}
