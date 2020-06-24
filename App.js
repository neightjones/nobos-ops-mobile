import React from 'react';
import { Root } from 'native-base';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import { withAuthenticator, SignIn, ForgotPassword, RequireNewPassword } from 'aws-amplify-react-native'
import {
  CustomSignIn,
  CustomRequireNewPassword,
  CustomForgotPassword,
} from './src/auth';
import Entry from './src/Entry';

// Note web doesn't have the sub-Auth key -
// Version difference?
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_KOjGZCS7Y',
    userPoolWebClientId: '2mpcfrp8vktnoknajsvboat9un',
  },
  Analytics: {
    // re: https://github.com/aws-amplify/amplify-js/issues/3484#issuecomment-504891009
    // which was some uncaught promise issue related to Analytics
    disabled: true,
  },
});

const App = () => (
  <Provider store={store}>
    <Root>
      <Entry />
    </Root>
  </Provider>
);

export default withAuthenticator(App, false, [
  <CustomSignIn />,
  <CustomRequireNewPassword />,
  <CustomForgotPassword />,
]);