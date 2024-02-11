import { Tabs } from "@radix-ui/themes";
import PakMods from "./PakMods/PakMods";
import LuaMods from "./LuaMods/LuaMods";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";

export default function ModSettings() {
  const { appLanguage } = useAppLanguage();

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <Tabs.Root defaultValue="lua">
        <Tabs.List>
          <Tabs.Trigger value="lua" style={{ color: "white", fontWeight: 500 }}>
            {LOCALES[appLanguage].LuaMods}
          </Tabs.Trigger>

          <Tabs.Trigger value="pak" style={{ color: "white", fontWeight: 500 }}>
            {LOCALES[appLanguage].PakMods}
          </Tabs.Trigger>
        </Tabs.List>
        <div className="py-4">
          <Tabs.Content value="lua">
            {/* Lua 模組 */}
            <LuaMods />
          </Tabs.Content>
          <Tabs.Content value="pak">
            {/* Pak 模組 */}
            <PakMods />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
