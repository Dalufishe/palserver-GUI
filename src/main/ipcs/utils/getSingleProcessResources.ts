import { ipcMain } from 'electron';
import Channels from '../channels';
import pidusage from 'pidusage';
import osu from 'node-os-utils';

ipcMain.handle(Channels.getSingleProcessResources, async (event, processId) => {
  let cpuUsage;
  let memUsage;

  try {
    const stats = await pidusage(processId);
    const memInfo = await osu.mem.used();

    // console.log(stats);

    cpuUsage = stats.cpu;
    memUsage = (stats.memory / 1024 / 1024 / memInfo.totalMemMb) * 100;
  } catch (e) {
    cpuUsage = 0;
    memUsage = 0;
  }
  return { cpuUsage, memUsage };
});
