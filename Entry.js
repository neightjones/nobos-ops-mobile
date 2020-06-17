import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import DEMO_TYPE from './demo';
import useCachedResources from './hooks/useCachedResources';
import OnboardingNavigator from './navigation/OnboardingNavigator';
import HousekeepingNavigator from './navigation/HousekeepingNavigator';
import ManagerNavigator from './navigation/ManagerNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

export default function App(props) {
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
