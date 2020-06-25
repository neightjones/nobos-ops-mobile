import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/Home';

import AuditCreateScreen from '../screens/Audits/Create';
import AuditChecklistScreen from '../screens/Audits/Checklist';
import AuditCaptureMedia from '../screens/Audits/CaptureMedia';

const AuditStack = createStackNavigator();
const AuditStackScreen = () => (
  <AuditStack.Navigator>
    <AuditStack.Screen name="create" component={AuditCreateScreen}  options={{ title: 'Create New Audit' }} />
    <AuditStack.Screen name="checklist" component={AuditChecklistScreen}  options={{ title: 'Complete Audit' }} />
    <AuditStack.Screen name="captureMedia" component={AuditCaptureMedia} options={{ title: 'Picture & Video' }} />
  </AuditStack.Navigator>
);

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default ({ navigation, route }) => {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          tabBarLabel: 'Home'
        }}
      />
      <BottomTab.Screen
        name="audit"
        component={AuditStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list" />,
          tabBarLabel: 'Audits',
        }}
      />
    </BottomTab.Navigator>
  );
};