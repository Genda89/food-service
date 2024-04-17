import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { LanguageWrapper } from './components/LanguageWrapper/LanguageWrapper';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <LanguageWrapper>
        <App />
      </LanguageWrapper>
    </React.StrictMode>
  </BrowserRouter>
);
