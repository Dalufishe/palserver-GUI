import React from "react";
import LuaModItem from "./LuaModItem/LuaModItem";
import AddLuaModButton from "./AddLuaModButton/AddLuaModButton";
import AddButton from "../../../components/global/AddButton";
import useLuaMods from "../../../hooks/useLuaMods";

export default function LuaMods() {
  const { mods: luaMods } = useLuaMods();

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {luaMods?.map((mod, i) => (
        <LuaModItem key={i} name={mod.name} enabled={mod.enabled} />
      ))}
      <AddLuaModButton button={<AddButton />} />
    </div>
  );
}
