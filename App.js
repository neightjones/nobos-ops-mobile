import React from 'react';
import { Root } from 'native-base';
import { store, persistor } from './src/store/store';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Amplify from 'aws-amplify';
import Constants from 'expo-constants';
import { withAuthenticator } from 'aws-amplify-react-native'
import {
  CustomSignIn,
  CustomRequireNewPassword,
  CustomForgotPassword,
} from './src/auth';
import Entry from './src/Entry';

Amplify.configure({
  Auth: {
    region: Constants.manifest.extra.cognitoRegion,
    userPoolId: Constants.manifest.extra.cognitoUserPoolId,
    userPoolWebClientId: Constants.manifest.extra.cognitoWebClientId,
  },
  Analytics: {
    // re: https://github.com/aws-amplify/amplify-js/issues/3484#issuecomment-504891009
    // which was some uncaught promise issue related to Analytics
    disabled: true,
  },
});

const App = () => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={<View />}
    >
      <Root>
        <Entry />
      </Root>
    </PersistGate>
  </Provider>
);

export default withAuthenticator(App, false, [
  <CustomSignIn />,
  <CustomRequireNewPassword />,
  <CustomForgotPassword />,
]);