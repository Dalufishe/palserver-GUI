/* eslint-disable camelcase */

import en from './en/translation';
import zh_tw from './zh_tw/translation';

const LOCALES = { zh_tw, en };

export type Language = keyof typeof LOCALES;

export default LOCALES as any;
