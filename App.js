import React from 'react';
import { Root } from 'native-base';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import Entry from './src/Entry';

export default function App() {
  return (
    <Provider store={store}>
      <Root>
        <Entry />
      </Root>
    </Provider>
  );
}