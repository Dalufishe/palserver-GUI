import React from 'react';
import JsonView from '@uiw/react-json-view';

const customTheme = {
  '--w-rjv-color': '#9cdcfe',
  '--w-rjv-key-number': '#268bd2',
  '--w-rjv-key-string': '#9cdcfe',
  '--w-rjv-background-color': '#1e1e1e',
  '--w-rjv-line-color': '#36334280',
  '--w-rjv-arrow-color': '#838383',
  '--w-rjv-edit-color': '#9cdcfe',
  '--w-rjv-info-color': '#9c9c9c7a',
  '--w-rjv-update-color': '#9cdcfe',
  '--w-rjv-copied-color': '#9cdcfe',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-colon-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',
  '--w-rjv-ellipsis-color': '#cb4b16',
  '--w-rjv-quotes-color': '#9cdcfe',
  '--w-rjv-quotes-string-color': '#ce9178',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#b5cea8',
  '--w-rjv-type-float-color': '#b5cea8',
  '--w-rjv-type-bigint-color': '#b5cea8',
  '--w-rjv-type-boolean-color': '#569cd6',
  '--w-rjv-type-date-color': '#b5cea8',
  '--w-rjv-type-url-color': '#3b89cf',
  '--w-rjv-type-null-color': '#569cd6',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#569cd6',
  fontFamily: '',
  fontSize: 16,
  letterSpacing: 1,
  backgroundColor: '#1b1421',
  padding: 16,
  borderRadius: 8,
};

export default function WorldSettingsJSONView({
  worldSettings,
}: {
  worldSettings: any;
}) {
  return (
    <div className="mt-[60px] w-full">
      <JsonView
        displayDataTypes={false}
        displayObjectSize={false}
        value={worldSettings}
        style={{ width: '100%', ...customTheme }}
      >
        <JsonView.Copied
          render={() => {
            return <span></span>;
          }}
        />
        <JsonView.Arrow
          render={() => {
            return <span></span>;
          }}
        />
        <JsonView.Colon
          render={() => {
            return <span className="mr-2">:</span>;
          }}
        />
      </JsonView>
    </div>
  );
}
