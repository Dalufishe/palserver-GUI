/* eslint-disable camelcase */

import en from './en/translation';
import zh_tw from './zh_tw/translation';
import zh_cn from './zh_cn/translation';

const LOCALES = { zh_tw, zh_cn, en };

export type Language = keyof typeof LOCALES;

export default LOCALES as any;
