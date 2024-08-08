import { Flex, RadioCards, Tabs, Text, Theme } from '@radix-ui/themes';
import { useState } from 'react';
import PerformanceMonitor from '../components/ServerManagement/PerformanceMonitor/PerformanceMonitor';
import { cn } from '../../utils/cn';
import Display from '../components/Display';
import ServerLog from '../components/ServerManagement/ServerLog/ServerLog';
import ServerPlayers from '../components/ServerManagement/ServerPlayers/ServerPlayers';
import ServerSettings from '../components/ServerManagement/ServerSettings/ServerSettings';
import useServerInfo from '../hooks/server/info/useServerInfo';
import useSelectedServerInstance from '../redux/selectedServerInstance/useSelectedServerInstance';
import useTranslation from '../hooks/translation/useTranslation';
import useIsRunningServers from '../redux/isRunningServers/useIsRunningServers';
import OnlineMap from '../components/ServerManagement/OnlineMap/OnlineMap';

export default function ServerManagement() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const { serverInfo } = useServerInfo(selectedServerInstance);

  const [managementMode, setManagementMode] = useState<
    'log' | 'performance' | 'players' | 'settings' | 'map'
  >('settings');

  // 效能監控相關
  const [performanceMonitorMode, setPerformanceMonitorMode] = useState<
    'computer' | 'process'
  >('computer');

  const [computerResources, setComputerResources] = useState<any>({});
  const [singleProcessResources, setSingleProcessResources] = useState<any>({});

  const [newLogCount, setNewLogCount] = useState(0);

  const { includeRunningServers } = useIsRunningServers();

  return (
    <div className={cn('page-container', 'overflow-y-hidden')}>
      {/* 頂部選單 */}
      <div className="w-[600px]">
        {/* <Theme appearance="dark"> */}
        {/* <RadioCards.Root
            value={managementMode}
            onValueChange={(v: any) => {
              setManagementMode(v);
            }}
            columns={{ initial: '1', sm: '3' }}
            size="1"
            style={{ backgroundColor: '#2d2633' }}
          >
            <RadioCards.Item value="log">
              <Flex direction="column" width="100%">
                <Text weight="bold">伺服器日誌</Text>
                <Text>{newLogCount} 條新訊息</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="performance">
              <Flex direction="column" width="100%">
                <Text weight="bold">
                  伺服器效能監測{' '}
                  {performanceMonitorMode === 'computer'
                    ? '(整體)'
                    : '(伺服器)'}
                </Text>
                <Text>
                  CPU{' '}
                  {performanceMonitorMode === 'computer'
                    ? computerResources.cpuUsage?.toFixed(0)
                    : singleProcessResources.cpuUsage?.toFixed(0)}
                  % / RAM{' '}
                  {performanceMonitorMode === 'computer'
                    ? computerResources.memUsage?.toFixed(0)
                    : singleProcessResources.memUsage?.toFixed(0)}
                  %
                </Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="players">
              <Flex direction="column" width="100%">
                <Text weight="bold">伺服器在線玩家</Text>
                <Text>4 人在線</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root> */}
        {/* </Theme> */}
      </div>
      <Tabs.Root
        value={managementMode}
        onValueChange={(v: any) => {
          setManagementMode(v);
        }}
      >
        <Tabs.List>
          {serverInfo?.LogEnabled && (
            <Tabs.Trigger
              value="log"
              style={{ color: 'white', fontWeight: 500 }}
            >
              {t('ServerLog')}
            </Tabs.Trigger>
          )}
          <Tabs.Trigger
            value="players"
            style={{ color: 'white', fontWeight: 500 }}
          >
            {t('ServerPlayers')}
          </Tabs.Trigger>
          {serverInfo?.OnlineMapEnabled && (
            <Tabs.Trigger
              value="map"
              style={{ color: 'white', fontWeight: 500 }}
            >
              {t('OnlineMap')}
            </Tabs.Trigger>
          )}
          { serverInfo?.performanceMonitorEnabled && (
              <Tabs.Trigger
                value="performance"
                style={{ color: 'white', fontWeight: 500 }}
              >
                {t('PerformanceMonitor')}
              </Tabs.Trigger>
            )}
          <Tabs.Trigger
            value="settings"
            style={{ color: 'white', fontWeight: 500 }}
          >
            {t('ServerSettings')}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Display display={managementMode === 'players'}>
        <ServerPlayers />
      </Display>
      <Display display={managementMode === 'log'}>
        <ServerLog
          managementMode={managementMode}
          onNewLog={(c) => {
            setNewLogCount(c);
          }}
        />
      </Display>
      <Display display={managementMode === 'map'}>
        <OnlineMap />
      </Display>
      <Display display={managementMode === 'performance'}>
        <PerformanceMonitor
          onMainChartIsChange={(chart, c, p) => {
            setPerformanceMonitorMode(chart);
            setComputerResources(c);
            setSingleProcessResources(p);
          }}
        />
      </Display>
      <Display display={managementMode === 'settings'}>
        <ServerSettings />
      </Display>
    </div>
  );
}
