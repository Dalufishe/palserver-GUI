import React, { useRef } from 'react';

export default function PlayerAvatar({
  icons,
}: {
  icons: { id: string; image: string };
}) {
  const randomNumber = useRef(_.random(0, icons.length));

  const icon = icons[randomNumber.current]?.image;
  return <img className="w-12 h-12 rounded-full" src={icon} alt="" />;
}
