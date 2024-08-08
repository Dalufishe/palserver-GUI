/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';
import type { Language } from '../../../../locales';
import TranslationContext from './TranslationContext';
import useLocalState from '../../hooks/useLocalState';

export default function Translation({ children }: { children: any }) {
  const [language, setLanguage] = useLocalState<Language>(
    'language',
    getDefaultLanguage(),
  );

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

function getDefaultLanguage() {
  if (window.navigator.language === 'zh_TW') {
    return 'zh_tw';
  }
  if (window.navigator.language === 'zh-CN') {
    return 'zh_cn';
  }
  return 'en';
}
