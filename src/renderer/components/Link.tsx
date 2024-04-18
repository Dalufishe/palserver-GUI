import React from 'react';
import { Link as RLink, Theme } from '@radix-ui/themes';
import { LuExternalLink } from 'react-icons/lu';

export default function Link(props: { children: any; herf: string }) {
  return (
    <Theme
      appearance="dark"
      style={{ background: 'inherit', display: 'inline-block' }}
    >
      <RLink
        onClick={() => {
          window.electron.openLink(props.herf);
        }}
        color="blue"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        {props.children}
        <LuExternalLink />
      </RLink>
    </Theme>
  );
}
