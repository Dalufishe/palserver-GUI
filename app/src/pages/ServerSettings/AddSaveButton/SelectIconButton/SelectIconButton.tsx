import { IconButton } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PalIcons from "../../../../constant/palIcons";

type Props = {
  onIconChange: (iconId: number) => void;
};

export default function SelectIconButton(props: Props) {
  const [iconId, setIconId] = useState(0);

  const handleChangeIcon = () => {
    if (iconId === 2) setIconId(0);
    else setIconId(iconId + 1);
  };

  useEffect(() => {
    props.onIconChange(iconId);
  }, [iconId]);

  return (
    <IconButton
      onClick={handleChangeIcon}
      radius="large"
      style={{
        width: 72,
        height: 72,
        backgroundColor: "#F2F1F2",
      }}
    >
      <img src={PalIcons[iconId]} className="w-14 h-14" />
    </IconButton>
  );
}
