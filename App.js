import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import HousekeepingNavigator from './navigation/HousekeepingNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [userType, setUserType] = useState('A');

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          {userType === 'A' ? <HousekeepingNavigator /> : <BottomTabNavigator />}
        </NavigationContainer>
        <View style={styles.buttons}>
          <Button style={styles.demoBtn} onPress={() => setUserType('A')} />
          <Button style={styles.demoBtn} onPress={() => setUserType('B')} />
        </View>
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
