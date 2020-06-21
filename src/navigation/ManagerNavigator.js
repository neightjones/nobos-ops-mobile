import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';

import AuditCreateScreen from '../screens/Audits/Create';
import AuditChecklistScreen from '../screens/Audits/Checklist';
import AuditCaptureMedia from '../screens/Audits/CaptureMedia';

import LibraryThemesScreen from '../screens/Library/Themes';
import LibraryByThemeScreen from '../screens/Library/ByTheme';
import LibraryTopicSteps from '../screens/Library/TopicSteps';

const AuditStack = createStackNavigator();

const AuditStackScreen = () => (
  <AuditStack.Navigator>
    <AuditStack.Screen name="create" component={AuditCreateScreen}  options={{ title: 'Create New Audit' }} />
    <AuditStack.Screen name="checklist" component={AuditChecklistScreen}  options={{ title: 'Complete Audit' }} />
    <AuditStack.Screen name="captureMedia" component={AuditCaptureMedia} options={{ title: 'Picture & Video' }} />
  </AuditStack.Navigator>
);

const LibraryStack = createStackNavigator();
const LibraryStackScreen = () => (
    <LibraryStack.Navigator>
        <LibraryStack.Screen name="Themes" component={LibraryThemesScreen} options={{ title: 'Themes' }} />
        <LibraryStack.Screen name="byTheme" component={LibraryByThemeScreen} />
        <LibraryStack.Screen name="topic" component={LibraryTopicSteps} options={{ title: 'Topic Review'}} />
    </LibraryStack.Navigator>
);

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default ({ navigation, route }) => {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="audit"
        component={AuditStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list" />,
          tabBarLabel: 'Audits',
        }}
      />
      <BottomTab.Screen
        name="library"
        component={LibraryStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          tabBarLabel: 'Library',
        }}
      />
      <BottomTab.Screen
        name="leaderboard"
        component={AuditStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-ribbon" />,
          tabBarLabel: 'Leaderboard'
        }}
      />
    </BottomTab.Navigator>
  );
}