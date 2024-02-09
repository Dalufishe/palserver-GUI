import React from "react";
import useWorldSettings from "../../hooks/useWorldSettings";
import GameSaveBtn from "./GameSaveButton/GameSaveButton";
import styles from "./ServerSettings.module.css";
import AddSaveButton from "./AddSaveButton/AddSaveButton";
import useSaveMeta from "../../hooks/useSaveMeta";
import { ContextMenu } from "@radix-ui/themes";
import { MdAddCircle } from "react-icons/md";

export default function ServerSettings() {
  const worldSettings = useWorldSettings();
  const { metaData } = useSaveMeta();

  return (
    <div className={styles.container}>
      <div className="flex flex-row items-start gap-3 flex-wrap">
        {metaData?.map((save: any) => (
          <GameSaveBtn key={save.id} saveMetaData={save} />
        ))}
        <AddSaveButton button={<AddButton />} />
      </div>
      <div className="absolute bottom-2 left-2 text-xs">0.0.7 (BETA) </div>
    </div>
  );
}

const AddButton = (props: { onClick?: () => void }) => (
  <div
    onClick={props.onClick}
    className={
      "flex flex-col gap-1 w-28 h-24 p-1 cursor-pointer rounded-lg items-center justify-center hover:scale-110 transition-[transform]"
    }
  >
    <MdAddCircle size={32} />
  </div>
);
