import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { setupStore } from '@feature/store';
import App from './App';


/**
 * https://vitejs.dev/guide/assets.html#the-public-directory
 * public directory is served as root path during dev and copied to the root of dist on build
 */
const themes = {
  dark: `http://localhost:3000/themes/dark-theme.css`,
  light: `http://localhost:3000/themes/light-theme.css`,
};

const store = setupStore();

const app = (
  <ThemeSwitcherProvider
    themeMap={themes}
    defaultTheme={'dark'}
    insertionPoint='styles-insertion-point'>
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </ThemeSwitcherProvider>
);

render(app, document.getElementById('root'));
