import { Button } from "@radix-ui/themes";
import { ipcRenderer } from "../../../../constant/contextBridge";
import { useState } from "react";
import useRconOptions from "../../../../hooks/useRconOptions";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";

export default function ServerBoardcast() {
  const { appLanguage } = useAppLanguage();

  const rconOptions = useRconOptions();

  const [input, setInput] = useState("");

  const handleSendBoardCast = () => {
    // 輸入指令
    if (input.startsWith("/")) {
      ipcRenderer.send("request-rcon-command", rconOptions, input.slice(1));
    }
    // 廣播
    else {
      ipcRenderer.send(
        "request-rcon-command",
        rconOptions,
        `Broadcast ${input}`
      );
    }

    setInput("");
  };

  return (
    <div className="w-full h-12 mt-6 bg-bg1 rounded-lg flex items-center pl-6 pr-2">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendBoardCast();
          }
        }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={LOCALES[appLanguage].EnterCommandOrBoardCast}
        spellCheck={false}
        type="text"
        className="bg-bg1 text-text outline-none rounded-lg flex-1 h-full font-mono"
      />
      <Button onClick={handleSendBoardCast}>{LOCALES[appLanguage].Send}</Button>
    </div>
  );
}
