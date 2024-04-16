import { createContext } from 'react';
import { ServerInstanceSetting } from '../../../../../types/ServerInstanceSetting.types';

export default createContext<ServerInstanceSetting | null>(null);
