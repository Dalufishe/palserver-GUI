import useLatestVersion from '../hooks/firebase/useLatestVersion';
import { ENV, PLATFORM, SERVER_URL, VERSION } from '../../constant/app';
import useTranslation from '../hooks/translation/useTranslation';
import formatLocale from '../utils/formatLocale';
import versionToValue from '../utils/versionToValue';
import Link from './Link';
import useOnlineLinksMap from '../hooks/firebase/useOnlineLinksMap';

export default function Version() {
  const { t, language } = useTranslation();

  const { version: latestVersion, versionValue: latestVersionValue } =
    useLatestVersion();
  const currentVersionValue = versionToValue(VERSION);

  const GUIFAQs = useOnlineLinksMap('GUIFAQs');

  return (
    <div className="absolute bottom-3 text-xs w-[100%] flex justify-between items-end">
      <div>
        {/* created by */}
        <div>
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
          <Link
            appearance="dark"
            href={`${SERVER_URL}/data/links/${language}/FAQS`}
          >
            {t('FAQ')}
          </Link>
        </div>
        {/* version */}
        <div>
          <span className="font-mono">
            {ENV} - {VERSION} ({PLATFORM}){' '}
          </span>
          , made by{' '}
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
      {/* ads */}
      <div>
        <div
          className="w-60 h-[60px] bg-transparent -translate-x-7 cursor-pointer hover:scale-110 transition-all"
          onClick={() => {
            window.electron.openLink(
              `${SERVER_URL}/data/links/${language}/Ads`,
            );
          }}
          id="ads-link"
          style={{ display: 'none' }} // 預設隱藏
        >
          <img
            src={`${SERVER_URL}/static/ads/${language}.png`}
            alt=""
            className="w-full h-full"
            onLoad={(e) =>
              (e.target.parentElement.style.display = 'block')
            }
            onError={(e) =>
              (e.target.parentElement.style.display = 'none')
            }
          />
        </div>
      </div>
    </div>
  );
}
