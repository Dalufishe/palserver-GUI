import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useServerIcon = (iconId: string) => {
  const [serverIcon, setServerIcon] = useState<{ id: string; image: string }>();
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getServerIcon, iconId)
      .then((icon) => {
        setServerIcon(icon);
      });
  }, [iconId]);

  return serverIcon;
};

export default useServerIcon;
