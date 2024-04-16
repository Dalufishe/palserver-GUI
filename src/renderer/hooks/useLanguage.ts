import { useContext } from 'react';
import TranslationContext from '../provider/Translation/TranslationContext';

const useLanguage = () => {
  return useContext(TranslationContext);
};

export default useLanguage;
