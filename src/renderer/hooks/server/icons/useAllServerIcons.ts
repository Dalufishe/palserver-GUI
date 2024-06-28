import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useAllServerIcons = () => {
  const [icons, setIcons] = useState<{ id: string; image: string }[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getAllServerIcons)
      .then((icons) => {
        setIcons(icons);
      });
  }, []);

  return icons;
};

export default useAllServerIcons;
