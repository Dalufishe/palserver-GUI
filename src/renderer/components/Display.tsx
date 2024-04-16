import React from 'react';

export default function Display({
  children,
  display,
}: {
  children: React.ReactNode;
  display: boolean;
}) {
  return (
    <div className={display ? '' : 'absolute translate-x-[1000px]'}>
      {children}
    </div>
  );
}
