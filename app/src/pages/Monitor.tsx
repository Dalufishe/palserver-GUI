import React, { useEffect } from "react";
import { Terminal as Xterm } from "xterm";
import "xterm/css/xterm.css";

export default function Monitor() {
  //   useEffect(() => {
  //     var term = new Xterm();
  //     term.open(document.getElementById("terminal"));
  //     term.write("Setting breakpad minidump AppID = 1623730");
  //   }, []);

  return (
    <div className="bg-bg2 rounded-lg w-full p-4">
      <div id="terminal"></div>
    </div>
  );
}
