import React from 'react';
import ServerInfoContext from './ServerInfoContext';
import { ServerInstanceSetting } from '../../../../../types/ServerInstanceSetting.types';

type Props = {
  info: ServerInstanceSetting;
  children: any;
};

export default function ServerInfoProvider(props: Props) {
  return (
    <ServerInfoContext.Provider value={props.info}>
      {props.children}
    </ServerInfoContext.Provider>
  );
}
