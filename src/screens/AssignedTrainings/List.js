import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Body, Right, Icon, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Info from '../../components/Info';
import { trainingsDue } from '../../data';

export default function AssignedTrainingsList({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoHolder}>
          <Info text="Please complete trainings below." />
        </View>
        <List>
          {trainingsDue.map(training => (
            <ListItem
              key={training.id}
              button
              onPress={() => navigation.navigate('training', { training })}
            >
              <Body>
                <Text>{`${training.name}`}</Text>
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