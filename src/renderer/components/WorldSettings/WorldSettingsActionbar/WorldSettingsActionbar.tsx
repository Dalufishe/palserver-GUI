import { Button } from '@radix-ui/themes';
import useTranslation from '../../../hooks/translation/useTranslation';
import { animated, useSpring, useTransition } from 'react-spring';
import _ from 'lodash';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import Channels from '../../../../main/ipcs/channels';

export default function WorldSettingsActionbar({
  prevWorldSettings,
  worldSettings,
  setWorldSettings,
}: {
  prevWorldSettings: any;
  worldSettings: any;
  setWorldSettings: any;
}) {
  const { t } = useTranslation();

  const transition = useTransition(
    !_.isEqual(prevWorldSettings, worldSettings),
    null,
    {
      from: {
        opacity: 0,
        transform: 'translateY(200%)',
      },
      enter: {
        opacity: 1,
        transform: 'translateY(0%)',
      },
      leave: {
        opacity: 0,
        transform: 'translateY(200%)',
      },
    },
  );

  const { selectedServerInstance } = useSelectedServerInstance();

  const handleResetSettings = () => {
    setWorldSettings(prevWorldSettings);
  };

  const handleSetSettings = () => {
    window.electron.ipcRenderer.invoke(
      Channels.setWorldSettings,
      selectedServerInstance,
      worldSettings,
    );
  };

  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          className="w-[90%] h-14 absolute left-[50%] bottom-4 translate-x-[-50%] flex items-center justify-between"
          key={key}
          style={{ opacity: props.opacity }}
        >
          <animated.div
            className="w-full h-full rounded-lg flex items-center justify-between px-4 bg-bg1"
            style={{ transform: props.transform }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            data-reach-dialog-content=""
            onClick={(event) => event.stopPropagation()}
          >
            <div>小心 ~ 您有變更尚未儲存！</div>
            <div className="flex items-center gap-3">
              <Button size="2" color="gray" onClick={handleResetSettings}>
                {t('Reset')}
              </Button>
              <Button size="2" onClick={handleSetSettings}>
                {t('VerifyChange')}
              </Button>
            </div>
          </animated.div>
        </animated.div>
      ),
  );
}
