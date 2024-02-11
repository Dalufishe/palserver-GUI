import React from "react";
import { Box, Button, IconButton, Tabs, Text, Tooltip } from "@radix-ui/themes";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import PakMods from "./PakMods/PakMods";
import LuaMods from "./LuaMods/LuaMods";

export default function ModSettings() {
  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <Tabs.Root defaultValue="lua">
        <Tabs.List>
          <Tabs.Trigger value="lua" style={{ color: "white", fontWeight: 500 }}>
            Lua 模組
          </Tabs.Trigger>

          <Tabs.Trigger value="pak" style={{ color: "white", fontWeight: 500 }}>
            Pak 模組
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
