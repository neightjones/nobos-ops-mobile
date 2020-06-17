import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';

import LibraryThemesScreen from '../screens/Library/Themes';
import LibraryByThemeScreen from '../screens/Library/ByTheme';
import LibraryTopicSteps from '../screens/Library/TopicSteps';

import AssignedTrainingsList from '../screens/AssignedTrainings/List';
import AssignedTrainingsTraining from '../screens/AssignedTrainings/Training';

const AssignedTrainingStack = createStackNavigator();

const AssignedTrainingStackScreen = () => (
  <AssignedTrainingStack.Navigator>
    <AssignedTrainingStack.Screen name="list" component={AssignedTrainingsList}  options={{ title: 'Assigned Trainings' }} />
    <AssignedTrainingStack.Screen name="training" component={AssignedTrainingsTraining} options={{ title: 'In Training' }} />
  </AssignedTrainingStack.Navigator>
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
        name="assignedTraining"
        component={AssignedTrainingStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          tabBarLabel: 'Assigned Training',
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
        component={LibraryStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-ribbon" />,
          tabBarLabel: 'Leaderboard'
        }}
      />
    </BottomTab.Navigator>
  );
}