/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';
import type { Language } from '../../../../locales';
import TranslationContext from './TranslationContext';

export default function Translation({ children }: { children: any }) {
  const [language, setLanguage] = useState<Language>('zh_tw');

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
