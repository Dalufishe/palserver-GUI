import { Button, ScrollArea, Separator } from "@radix-ui/themes";
import { ipcRenderer } from "../../../../constant/contextBridge";
import { useEffect, useLayoutEffect, useState } from "react";
import useRconOptions from "../../../../hooks/useRconOptions";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";

const commandsList = [
  {
    cmd: "Shutdown",
  },
  {
    cmd: "DoExit",
  },
  {
    cmd: "Broadcast",
  },
  { cmd: "KickPlayer" },
  { cmd: "BanPlayer" },
  { cmd: "ShowPlayers" },
  { cmd: "Info" },
  { cmd: "Save" },
];

export default function ServerBoardcast({
  onTextEnter,
}: {
  onTextEnter: (v: string) => void;
}) {
  const { appLanguage } = useAppLanguage();

  const rconOptions = useRconOptions();

  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    onTextEnter(input);
  }, [input]);

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
    <div
      style={{ height: input ? 48 * 6 : 48 }}
      className="w-full mt-6 bg-bg1 rounded-lg flex flex-col gap-1 justify-end pb-2"
    >
      {input && (
        <div className="pl-6 pr-2">
          {/* command list */}
          <div
            style={{
              height: 48 * 5 - 12,
            }}
            className="flex flex-col-reverse gap-2 overflow-auto bg-scroll"
          >
            {commandsList.map(
              (command) =>
                LOCALES[appLanguage][command.cmd + "Cmd"]
                  .split(" ")[0]
                  .toUpperCase()
                  .startsWith(input.split(" ")[0].toUpperCase()) && (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setInput("/" + command.cmd);
                    }}
                  >
                    <div className="font-mono">
                      {LOCALES[appLanguage][command.cmd + "Cmd"]}
                    </div>
                    <div className="text-xs text-gray-300">
                      {LOCALES[appLanguage][command.cmd + "CmdDesc"]}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {/* input */}
      <div className="flex items-center pl-6 pr-2">
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
        <Button onClick={handleSendBoardCast}>
          {LOCALES[appLanguage].Send}
        </Button>
      </div>
    </div>
  );
}
