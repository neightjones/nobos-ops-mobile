import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Entry from './Entry';

export default function App() {
  return (
    <Provider store={store}>
      <Entry />
    </Provider>
  );
}