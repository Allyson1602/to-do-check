import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './theme';
import NavigationConfig from './src/helpers/navigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationConfig />
      </NativeBaseProvider>
    </Provider>
  );
}
