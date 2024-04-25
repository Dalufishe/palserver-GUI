import { Link } from '@radix-ui/themes';

export default function Version() {
  return (
    <div className="absolute bottom-2 left-2 text-xs flex w-[97%] justify-between font-mono">
      <div>Beta - 0.4.3 (windows)</div>
      <div>
        Made by Dalufishe, Supported by{' '}
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
