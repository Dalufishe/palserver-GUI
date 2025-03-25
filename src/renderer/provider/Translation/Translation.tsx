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
  const userLanguage = window.navigator.language.toLowerCase();

  if (userLanguage === 'zh-tw' || userLanguage === 'zh_TW') {
    return 'zh_tw';
  }
  if (userLanguage === 'zh-cn' || userLanguage === 'zh_CN') {
    return 'zh_cn';
  }
  if (userLanguage === 'ja' || userLanguage.startsWith('ja')) {
    return 'jp'; // For Japanese
  }
  if (userLanguage === 'fr' || userLanguage.startsWith('fr')) {
    return 'fr'; // For French
  }
  return 'en'; // Default to English
}
