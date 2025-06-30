import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import english from '../../languages/en-US.json';
import hungarian from '../../languages/hu-Hu.json';

interface AppContextInterface {
  locale: string;
  // eslint-disable-next-line no-unused-vars
  selectLanguage: (event: string) => void;
}

export const Context = React.createContext<AppContextInterface | null>(null);

export const LanguageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const local = navigator.language;
  const language = local === 'hu-HU' ? hungarian : english;

  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(language);

  const selectLanguage = (newLocale: string) => {
    setLocale(newLocale);
    if (newLocale === 'hu-HU') {
      setMessages(hungarian);
    } else {
      setMessages(english);
    }
  };

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};
