import { RadioCards, Theme } from '@radix-ui/themes';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useComputerResources from '../../../hooks/server/resources/useComputerResources';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import useSingleProcessResources from '../../../hooks/server/resources/useSingleProcessResources';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useTranslation from '../../../hooks/translation/useTranslation';
import useServerMetrics from '../../../hooks/server/resources/useServerMetrics';
import useServerInfo from '../../../hooks/server/info/useServerInfo';

const defaultRecord: any = _.range(60);
defaultRecord.fill({ cpuUsage: 0, memUsage: 0 });

type Props = {
  onMainChartIsChange: (
    chart: 'computer' | 'process',
    { cpuUsage, memUsage }: any,
    { processCpuUsage, processMemUsage }: any,
  ) => void;
};

export default function PerformanceMonitor(props: Props) {
  const { t } = useTranslation();

  const [chartMode, setChartMode] = useState<'cpu' | 'ram'>('cpu');
  const [mainChartIs, setMainChartIs] = useState<'computer' | 'process'>(
    'computer',
  );

  const { selectedServerInstance } = useSelectedServerInstance();
  const { isRunningServers } = useIsRunningServers();
  const { serverInfo } = useServerInfo(selectedServerInstance);

  const processId = isRunningServers.find(
    (server) => server.serverId === selectedServerInstance,
  )?.processId as number;

  const [record, setRecord] =
    useState<{ cpuUsage: number; memUsage: number }[]>(defaultRecord);

  const [processRecord, setProcessRecord] =
    useState<{ cpuUsage: number; memUsage: number }[]>(defaultRecord);

  const { cpuUsage: processCpuUsage, memUsage: processMemUsage } =
    useSingleProcessResources(processId);

  const { cpuUsage, memUsage } = useComputerResources(() => {
    setRecord([...record, { cpuUsage, memUsage }].slice(-60));
    setProcessRecord(
      [
        ...processRecord,
        { cpuUsage: processCpuUsage, memUsage: processMemUsage },
      ].slice(-60),
    );
  });

  const serverMetrics = useServerMetrics(selectedServerInstance);

  useEffect(() => {
    props.onMainChartIsChange(
      mainChartIs,
      { cpuUsage, memUsage },
      { cpuUsage: processCpuUsage, memUsage: processMemUsage },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainChartIs, cpuUsage, memUsage, processCpuUsage, processMemUsage]);

  return (
    <div className="pt-4 w-full">
      <div className="relative">
        <ResponsiveContainer height={280}>
          <AreaChart
            data={mainChartIs === 'computer' ? record : processRecord}
            margin={{
              top: 10,
              right: 10,
              left: -26,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              animationDuration={
                serverInfo?.performanceMonitorAnimationEnabled ? 1000 : 0
              }
              type="monotone"
              dataKey={chartMode === 'cpu' ? 'cpuUsage' : 'memUsage'}
              stroke={chartMode === 'cpu' ? '#6761de' : '#a784d8'}
              fill={chartMode === 'cpu' ? '#534bc2' : '#8a65be'}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="absolute bottom-9 right-6 text-2xl opacity-60">
          {mainChartIs === 'computer' ? t('All') : t('Server')}
        </div>
      </div>
      <div className="flex gap-4">
        <Theme appearance="dark" style={{ backgroundColor: '#2d2633' }}>
          <div className="mt-2 w-[400px] flex flex-col gap-3">
            <RadioCards.Root
              columns={{ initial: '1', sm: '2' }}
              size="1"
              color="gray"
              value={chartMode}
              onValueChange={(v: any) => {
                setChartMode(v);
              }}
            >
              <RadioCards.Item value="cpu">
                CPU -{' '}
                {mainChartIs === 'computer'
                  ? cpuUsage.toFixed(2)
                  : processCpuUsage.toFixed(2)}
                %
              </RadioCards.Item>
              <RadioCards.Item value="ram">
                RAM -{' '}
                {mainChartIs === 'computer'
                  ? memUsage.toFixed(2)
                  : processMemUsage.toFixed(2)}
                %
              </RadioCards.Item>
            </RadioCards.Root>
            <RadioCards.Root
              columns={{ initial: '1', sm: '2' }}
              size="1"
              color="gray"
              value="e"
            >
              <RadioCards.Item value="fps">
                {serverMetrics.serverfps} FPS
              </RadioCards.Item>
              <RadioCards.Item value="ms">
                {serverMetrics.serverframetime.toFixed(2)} ms
              </RadioCards.Item>
            </RadioCards.Root>
            <RadioCards.Root
              columns={{ initial: '1', sm: '1' }}
              size="1"
              color="gray"
              value="e"
            >
              <RadioCards.Item value="uptime">
                {t('UpTime')} -{' '}
                {new Date(serverMetrics.uptime * 1000)
                  .toISOString()
                  .slice(11, 19)
                  .replaceAll(':', ' : ')}
              </RadioCards.Item>
            </RadioCards.Root>
          </div>
        </Theme>
        <div
          className="w-full h-[280px] hover:scale-105 transition-all"
          onClick={
            serverInfo?.UseIndependentProcess
              ? () => {}
              : () => {
                  setMainChartIs(
                    mainChartIs === 'computer' ? 'process' : 'computer',
                  );
                }
          }
        >
          <div className="relative">
            <ResponsiveContainer height={140}>
              <AreaChart
                style={{ cursor: 'pointer' }}
                data={mainChartIs === 'computer' ? processRecord : record}
                title={
                  mainChartIs === 'computer'
                    ? t('SwitchToServer')
                    : t('SwitchToAll')
                }
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <Area
                  animationDuration={1000}
                  type="monotone"
                  dataKey={chartMode === 'cpu' ? 'cpuUsage' : 'memUsage'}
                  stroke={chartMode === 'cpu' ? '#6761de' : '#a784d8'}
                  fill={chartMode === 'cpu' ? '#534bc2' : '#8a65be'}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute bottom-1 right-6 text-md opacity-60">
              {mainChartIs === 'computer'
                ? serverInfo?.UseIndependentProcess
                  ? t('ServerCantUse')
                  : t('Server')
                : t('All')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
