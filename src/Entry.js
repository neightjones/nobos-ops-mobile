import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View, Button, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import useCachedResources from '../hooks/useCachedResources';
import Navigator from './navigation';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {/* <Button
          onPress={async () => {
            Auth.signOut();
            // const c = await Auth.currentSession();
            // const idJwt = c.getIdToken().getJwtToken();
            // const d = await Auth.currentUserInfo();
            // const e = await Auth.currentCredentials();
            // console.log('idJwt: ', idJwt);
            // console.log('UserInfo: ', d);
            // console.log('credentials: ', e);
          }}
          title="Sign Out"
        /> */}
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  demoBtn: {
    marginLeft: 5,
    width: 5,
    height: 5,
  },
});
