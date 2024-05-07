import React from 'react';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import { LuExternalLink } from 'react-icons/lu';

export default function OnlineMap() {
  const { selectedServerInstance } = useSelectedServerInstance();

  return (
    <div className="relative w-full">
      <iframe
        className="pt-4 w-full h-[calc(100vh-160px)]"
        src={`http://127.0.0.1:3434/?id=${selectedServerInstance}`}
      />
      <div
        onClick={() => {
          window.electron.openLink(
            `http://127.0.0.1:3434/?id=${selectedServerInstance}`,
          );
        }}
        className="absolute top-6 right-2 z-10 hover:scale-110 transition-all opacity-75 hover:opacity-100"
      >
        <LuExternalLink size={32} />
      </div>
    </div>
  );
}
