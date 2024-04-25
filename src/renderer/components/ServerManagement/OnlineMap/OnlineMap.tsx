import React from 'react';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';

export default function OnlineMap() {
  const { selectedServerInstance } = useSelectedServerInstance();
  const { worldSettings } = useWorldSettings(selectedServerInstance);

  return (
    <iframe
      className="pt-4 w-full h-[calc(100vh-160px)]"
      src={`http://127.0.0.1:3434?ip=127.0.0.1&port=${
        worldSettings.RESTAPIPort
      }&password=${trimWorldSettingsString(worldSettings.AdminPassword)}`}
    />
  );
}
