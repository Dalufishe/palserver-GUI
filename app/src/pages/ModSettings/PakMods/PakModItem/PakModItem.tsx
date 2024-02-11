import { AlertDialog, ContextMenu } from "@radix-ui/themes";
import React, { useState } from "react";
import { LuFileCog } from "react-icons/lu";
import { __dirname } from "../../../../constant/contextBridge";

type Props = {
  name: string;
};

export default function PakModItem(props: Props) {
  return (
    <div
      className={
        "flex flex-col gap-y-2 items-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1 relative"
      }
    >
      <LuFileCog size={32} className="absolute top-4" />
      <span className="absolute top-14 text-xs text-center w-24 break-words">
        {props.name}
      </span>
    </div>
  );
}
 