import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Content, Text, Label, Item, Icon, Picker, Form, Input, Left, Right, Button } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Info from '../../../components/Info';

const AuditInstanceCreate = props => {
  const {
    navigation,
    fetchChecklists,
    isCreatingInstance,
    isFetchingChecklists,
    createChecklistInstance,
    checklists,
  } = props;

  const [checklist, setChecklist] = useState('');

  useEffect(() => {
    fetchChecklists();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Info text="Choose a Checklist you'd like to audit" />
        </View>
        <Content>
          <Form>
            <Item picker>
              <Left>
                <Label style={{ marginLeft: 15 }}>Checklist</Label>
              </Left>
              <Right>
                {!checklists || isFetchingChecklists
                  ? (
                    <Text style={styles.loadingText}>Fetching...</Text>
                  ) : (
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Select a Checklist"
                      placeholderStyle={{ color: "#676767" }}
                      placeholderIconColor="#007aff"
                      style={{ width: undefined }}
                      selectedValue={checklist}
                      onValueChange={v => setChecklist(v)}
                    >
                      {checklists.map(cl => (
                        <Picker.Item
                          key={cl.id}
                          label={cl.name}
                          value={cl.id}
                        />
                      ))}
                    </Picker>
                  )}
              </Right>
            </Item>
          </Form>
          <Button
            style={styles.button}
            disabled={isCreatingInstance || !checklist}
            onPress={async () => {
              await createChecklistInstance(checklist);
              navigation.navigate('checklist');
            }}
          >
            <Text>Create Audit</Text>
          </Button>
        </Content>
      </ScrollView>
    </View>
  );
}

AuditInstanceCreate.propTypes = {
  navigation: PropTypes.object.isRequired,
  fetchChecklists: PropTypes.func.isRequired,
  isCreatingInstance: PropTypes.bool.isRequired,
  isFetchingChecklists: PropTypes.bool.isRequired,
  createChecklistInstance: PropTypes.func.isRequired,
  checklists: PropTypes.arrayOf(PropTypes.object),
};

export default AuditInstanceCreate;

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
    width: 125,
    marginLeft: '35%',
    textAlign: 'center',
  },
  loadingText: {
    marginRight: 15,
    marginBottom: 5,
    color: '#676767',
  },
});