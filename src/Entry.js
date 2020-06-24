import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import DEMO_TYPE from './demo';
import useCachedResources from '../hooks/useCachedResources';
import OnboardingNavigator from './navigation/OnboardingNavigator';
import HousekeepingNavigator from './navigation/HousekeepingNavigator';
import ManagerNavigator from './navigation/ManagerNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

export default function App(props) {
  console.log('Here is entry...');

  const isLoadingComplete = useCachedResources();

  const getNavigator = () => {
    switch (DEMO_TYPE) {
      case 'HSK': return <HousekeepingNavigator />;
      case 'ONB': return <OnboardingNavigator />;
      case 'MGR': return <ManagerNavigator />;
      default: return <HousekeepingNavigator />;
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Button
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
        />
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          {getNavigator()}
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
