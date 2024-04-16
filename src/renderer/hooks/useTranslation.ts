/* eslint-disable consistent-return */

import LOCALES from '../../../locales';
import useLanguage from './useLanguage';

const useTranslation = () => {
  const { language } = useLanguage();
  return {
    t: (key: string) => {
      if (language) return LOCALES[language][key];
    },
  };
};

export default useTranslation;
