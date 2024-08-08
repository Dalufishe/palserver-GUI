import useLatestVersion from '../hooks/firebase/useLatestVersion';
import { ENV, PLATFORM, VERSION } from '../../constant/app';
import useTranslation from '../hooks/translation/useTranslation';
import formatLocale from '../utils/formatLocale';
import versionToValue from '../utils/versionToValue';
import Link from './Link';
import useOnlineLinksMap from '../hooks/firebase/useOnlineLinksMap';

export default function Version() {
  const { t } = useTranslation();

  const { version: latestVersion, versionValue: latestVersionValue } =
    useLatestVersion();
  const currentVersionValue = versionToValue(VERSION);

  const GUIFAQs = useOnlineLinksMap('GUIFAQs');

  return (
    <div className="absolute bottom-2 left-2 text-xs flex w-[97%] justify-between">
      <div>
        <span className="font-mono">
          {ENV} - {VERSION} ({PLATFORM}){' '}
        </span>
        {latestVersionValue > currentVersionValue ? (
          <Link
            appearance="dark"
            href={`https://github.com/Dalufishe/palserver-GUI/releases/tag/${latestVersion}`}
          >
            {formatLocale(t('NewUpdate'), [latestVersion])}
          </Link>
        ) : (
          <Link
            appearance="dark"
            href={`https://github.com/Dalufishe/palserver-GUI/releases/tag/${VERSION}`}
          >
            {t('UpdateLog')}
          </Link>
        )}
        <Link appearance="dark" href={GUIFAQs}>
          {t('FAQ')}
        </Link>
      </div>
      <div>
        Made by{' '}
        <span
          className="text-xs underline cursor-pointer"
          style={{ color: 'white' }}
          onClick={() => {
            window.electron.openLink('https://github.com/Dalufishe');
          }}
          // dangerouslySetInnerHTML={{
          //   __html: formatLocale(LOCALES[appLanguage].SupportBy, ['TOC']),
          // }}
        >
          Dalufishe
        </span>
        , Supported by{' '}
        <span
          className="text-xs underline cursor-pointer"
          style={{ color: 'white' }}
          onClick={() => {
            window.electron.openLink('https://toc.icu/');
          }}
          // dangerouslySetInnerHTML={{
          //   __html: formatLocale(LOCALES[appLanguage].SupportBy, ['TOC']),
          // }}
        >
          TOC
        </span>
      </div>
    </div>
  );
}
