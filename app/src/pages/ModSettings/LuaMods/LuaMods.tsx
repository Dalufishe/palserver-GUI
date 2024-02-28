import React from "react";
import LuaModItem from "./LuaModItem/LuaModItem";
import AddLuaModButton from "./AddLuaModButton/AddLuaModButton";
import AddButton from "../../../components/global/AddButton";
import useLuaMods from "../../../hooks/useLuaMods";

export default function LuaMods() {
  const { mods: luaMods } = useLuaMods();

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {luaMods
        ?.sort((a, b) => b.isDirectory - a.isDirectory)
        ?.map((mod, i) => (
          <LuaModItem key={i} {...mod} />
        ))}
      <AddLuaModButton button={<AddButton />} />
    </div>
  );
}
