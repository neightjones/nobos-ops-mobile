import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';

const HomeStack = createStackNavigator();

const Home1 = ({ navigation}) => (
  <View>
    <Text>Home 1</Text>
    <Button title="Go!" onPress={() => navigation.navigate('Home 2')} />
  </View>
);

const Home2 = ({ navigation}) => (
  <View>
    <Text>Home 2</Text>
  </View>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home 1" component={Home1}  options={{ title: 'HSK 1' }} />
    <HomeStack.Screen name="Home 2" component={Home2} options={{ title: 'HSK 2' }} />
  </HomeStack.Navigator>
);

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default ({ navigation, route }) => {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="assignedTraining"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          tabBarLabel: 'Assigned Training',
        }}
      />
      <BottomTab.Screen
        name="library"
        component={LinksScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          tabBarLabel: 'My Library',
        }}
      />
      <BottomTab.Screen
        name="leaderboard"
        component={LinksScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-ribbon" />,
          tabBarLabel: 'Leaderboard'
        }}
      />
    </BottomTab.Navigator>
  );
}