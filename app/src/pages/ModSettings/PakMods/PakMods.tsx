import React from "react";
import usePakMods from "../../../hooks/usePakMods";
import PakModItem from "./PakModItem/PakModItem";
import AddButton from "../../../components/global/AddButton";
import AddPakModButton from "./AddPakModButton/AddPakModButton";

export default function PakMods() {
  const { mods: pakMods } = usePakMods();
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {pakMods
        ?.sort((a, b) => b.isDirectory - a.isDirectory)
        ?.map((mod, i) => (
          <PakModItem
            key={i}
            name={mod.name}
            rename={mod.rename}
            isDirectory={mod.isDirectory}
          />
        ))}
      <AddPakModButton button={<AddButton />} />
    </div>
  );
}
