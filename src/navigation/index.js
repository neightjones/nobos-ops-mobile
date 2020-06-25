import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/Home';

import AuditCreateScreen from '../screens/Audits/Create';
import AuditChecklistScreen from '../screens/Audits/Checklist';
import AuditCaptureMedia from '../screens/Audits/CaptureMedia';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="home" component={HomeScreen} options={{ title: 'Home' }} />
  </HomeStack.Navigator>
);

const AuditStack = createStackNavigator();
const AuditStackScreen = () => (
  <AuditStack.Navigator>
    <AuditStack.Screen name="create" component={AuditCreateScreen}  options={{ title: 'Create New Audit' }} />
    <AuditStack.Screen name="checklist" component={AuditChecklistScreen}  options={{ title: 'Complete Audit' }} />
    <AuditStack.Screen name="captureMedia" component={AuditCaptureMedia} options={{ title: 'Picture & Video' }} />
  </AuditStack.Navigator>
);

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';

export default ({ navigation, route }) => {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="home"
        component={HomeStackScreen}
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