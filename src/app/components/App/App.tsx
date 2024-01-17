import React, { useEffect } from 'react';
import { RepositoriesPage } from '@components/Pages/RepositoriesPage/RepositoriesPage';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { applySystemScheme } from '@features/colorScheme/utils';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');
export const App = () => {
  useEffect(() => {
    const systemColorSchemeListener = () => {
      applySystemScheme();
    };
    matchMedia.addEventListener('change', systemColorSchemeListener);
    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <RepositoriesPage />
    </Provider>
  );
};
