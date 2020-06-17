import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Text, ListItem, CheckBox, H2, Button } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Info from '../../components/Info';

const checklistItems = [
  { id: 1, name: 'Restroom has a fresh odor with no strong disinfectant odor.' },
  { id: 2, name: 'Mirror is clean and streak-free.' },
  { id: 3, name: 'Sink and vanity have been disinfected and are visibly clean.' },
  { id: 4, name: 'Amenities are properly positioned next to sink, all new and wrapped.' },
  { id: 5, name: '4 towels are properly rolled up to display freshness - resuse policy displayed.' },
  { id: 6, name: 'Shower and tub are properly disinfected and visibly clean.' },
  { id: 7, name: 'Shower head is cleaned and polished.' },
  { id: 8, name: 'Toilet is cleaned with signage showing recent sanitization.' },
  { id: 9, name: 'Tissue box has been replaced with smaller, single-guest packaging.' },
  { id: 10, name: 'Trash receptacle has a new liner and has been properly sanitized.' },
];

export default function AuditCreate({ navigation }) {
  const [checkedSet, setCheckedSet] = useState(new Set());

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Info text="Auditing 'Restroom Cleaning' Topic" />
        </View>
        <Content style={{ paddingRight: 10 }}>
          {checklistItems.map(item => (
            <ListItem key={item.id}>
              <CheckBox
                color="green"
                checked={checkedSet.has(item.id)}
                onPress={() => {
                  const next = new Set(checkedSet);
                  if (next.has(item.id)) next.delete(item.id);
                  else next.add(item.id);
                  setCheckedSet(next);
                }}
              />
              <Text style={{ marginLeft: 10, color: checkedSet.has(item.id) ? 'green' : '#676767' }}>
                {item.name}
              </Text>
            </ListItem>
          ))}
          <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <H2 style={{ color: '#676767' }}>
              {`Score: ${checkedSet.size} / ${checklistItems.length}`}
            </H2>
          </View>
          <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate('checklist')}
            >
              <Text>Finish</Text>
            </Button>
          </View>
        </Content>
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
  infoContainer: {
    width: '90%',
    marginLeft: '7%',
    height: 75,
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textStyle: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#303f9f',
    marginBottom: 20,
    width: 75,
    textAlign: 'center',
  },
});