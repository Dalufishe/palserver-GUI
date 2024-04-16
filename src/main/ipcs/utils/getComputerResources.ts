import { ipcMain } from 'electron';
import Channels from '../channels';
import osu from 'node-os-utils';

ipcMain.handle(Channels.getComputerResources, async (event) => {
  const [cpuUsage, memInfo] = await Promise.all([
    osu.cpu.usage(),
    osu.mem.used(),
  ]);

  const memUsage = (memInfo.usedMemMb / memInfo.totalMemMb) * 100;

  return { cpuUsage, memUsage };
});
