import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Body, Right, Icon, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Info from '../../components/Info';

export default function LibraryByTheme({ route }) {
  const navigation = useNavigation();
  const theme = route.params?.theme;
  const { name, topics } = theme;
  navigation.setOptions({ title: name });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoHolder}>
          <Info text="Review any material below as a refresher." />
        </View>
        <List>
          {topics.map(topic => (
            <ListItem
              key={topic.id}
              button
              onPress={() => alert(topic.id)}
            >
              <Body>
                <Text>{topic.name}</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  infoHolder: {
    width: '80%',
    marginLeft: '10%',
    height: 75,
  },
});