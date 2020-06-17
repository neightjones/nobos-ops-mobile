import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Text, Label, Item, Icon, Picker, Form, Input, Left, Right, Button } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Info from '../../components/Info';

export default function AuditCreate({ navigation }) {
  const [topic, setTopic] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Info text="Fill out the fields below to create a new Audit!" />
        </View>
        <Content>
          <Form>
            <Item picker>
              <Left>
                <Label style={{ marginLeft: 15 }}>Topic</Label>
              </Left>
              <Right>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select a Topic"
                  placeholderStyle={{ color: "#676767" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={topic}
                  onValueChange={v => setTopic(v)}
                >
                  <Picker.Item label="Restroom Cleaning" value="key0" />
                  <Picker.Item label="Room Linen Guide" value="key1" />
                  <Picker.Item label="Increased Cleaning Frequencies" value="key2" />
                  <Picker.Item label="Disinfectant Guide" value="key3" />
                </Picker>
              </Right>
            </Item>
            <Item fixedLabel last>
              <Label>Room / Area</Label>
              <Input />
            </Item>
          </Form>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('checklist')}
          >
            <Text>Start Audit</Text>
          </Button>
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
  button: {
    backgroundColor: '#388e3c',
    marginTop: 20,
    width: 111,
    marginLeft: '35%',
    textAlign: 'center',
  },
});