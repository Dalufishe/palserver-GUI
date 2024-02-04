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
      {metaData?.map((save: any) => (
        <GameSaveBtn key={save.id} saveMetaData={save} />
      ))}
      <AddSaveButton />
    </div>
  );
}
