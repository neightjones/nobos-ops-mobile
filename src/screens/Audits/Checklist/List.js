import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem, CheckBox, H2, Button, Icon, Card, Body, Switch } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Info from 'components/Info';

const List = props => {
  const {
    navigation,
    checklist,
    doToggleItem,
    setItemVideo,
    setItemComment,
  } = props;

  return (
    <Container>
      <Content style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.infoContainer}>
          <Info text="Auditing 'Restroom Cleaning' Topic" />
        </View>
        {checklist.map(item => (
          <View key={item.id} style={styles.itemView}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.widgetsHolder}>
              <View style={styles.widgetHolder}>
                <Switch style={styles.switchHolder} value={item.checked} onValueChange={() => doToggleItem(item.id)} />
                <Text style={styles.widgetText}>
                  Pass?
                </Text>
              </View>
              <TouchableOpacity
                style={styles.widgetHolder}
                onPress={() => navigation.navigate('takePicture', { itemId: item.id })}
              >
                <Icon name="ios-camera" style={{ color: '#676767' }} />
                <Text style={styles.widgetText2}>
                  Snap Pic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.widgetHolder}
                onPress={() => navigation.navigate('takePicture', { itemId: item.id })}
              >
                <Icon name="ios-videocam" style={{ color: '#676767' }} />
                <Text style={styles.widgetText2}>
                  Rec Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.widgetHolder}
                onPress={() => navigation.navigate('takePicture', { itemId: item.id })}
              >
                <Icon name="md-chatbubbles" style={{ color: '#676767' }} />
                <Text style={styles.widgetText2}>
                  Comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/*
        {checklist.map(item => (
          <ListItem key={item.id} style={{ flexWrap: 'wrap' }}>
            <CheckBox
              color="green"
              checked={item.checked}
              onPress={() => doToggleItem(item.id)}
            />
            <Text style={{ marginLeft: 10, color: item.checked ? 'green' : '#676767' }}>
              {item.text}
            </Text>
            <Icon name="ios-camera" onPress={() => navigation.navigate('takePicture', { itemId: item.id })} />
            {item.imageUri && <Text>HEYYY</Text>}
          </ListItem>
        ))}
        */}
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <H2 style={{ color: '#676767' }}>
            {`Score: ${checklist.filter(i => i.checked).length} / ${checklist.length}`}
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
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 30,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  infoContainer: {
    width: '90%',
    marginLeft: '5%',
    height: 75,
  },
  button: {
    backgroundColor: '#303f9f',
    marginBottom: 20,
    width: 75,
    textAlign: 'center',
  },
  itemView: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .12)',
    minHeight: 150,
  },
  itemText: {
    color: '#585858',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  widgetsHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  widgetHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetText: {
    fontSize: 14,
    color: '#585858',
    marginTop: 12,
  },
  widgetText2: {
    fontSize: 14,
    color: '#585858',
  },
});

export default List;