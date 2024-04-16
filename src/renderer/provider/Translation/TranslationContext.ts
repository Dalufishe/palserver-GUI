import { createContext } from 'react';
import type { Language } from '../../../../locales';

const TranslationContext = createContext<{
  language?: Language;
  setLanguage?: (l: Language) => void;
}>({});
export default TranslationContext;
