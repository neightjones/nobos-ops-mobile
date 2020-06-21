import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem, CheckBox, H2, Button, Icon, Card, Body, Switch } from "native-base";
import Info from 'components/Info';
import MediaModal from './MediaModal';

const List = props => {
  const {
    navigation,
    checklist,
    doToggleItem,
    updateComment,
  } = props;
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaItemSelected, setMediaItemSelected] = useState('');

  const onOpenMediaModal = item => {
    setMediaItemSelected(item);
    setMediaModalOpen(true);
  };

  return (
    <Container>
      <Content style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        {/* Modal to show Media only needs one instance */}
        <MediaModal
          open={mediaModalOpen}
          close={() => setMediaModalOpen(false)}
          item={mediaItemSelected}
        />
        <View style={styles.infoContainer}>
          <Info text="Auditing 'Restroom Cleaning' Topic" />
        </View>
        {checklist.map(item => {
          const { id, text, checked } = item;

          return (
            <View
              key={id}
              style={[styles.itemView, { borderColor: checked ? '#5BC236' : 'rgba(0, 0, 0, .12)' }]}
            >
              <Text style={styles.itemText}>{text}</Text>
              <View style={styles.widgetsHolder}>
                <View style={styles.widgetHolder}>
                  <Switch style={styles.switchHolder} value={checked} onValueChange={() => doToggleItem(id)} />
                  <Text style={styles.widgetText}>
                    Pass?
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => navigation.navigate('captureMedia', { itemId: id })}
                >
                  <Icon name="md-chatbubbles" style={{ color: '#676767' }} />
                  <Text style={styles.widgetText2}>
                    Comment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => navigation.navigate('captureMedia', { itemId: id })}
                >
                  <Icon
                    name="ios-camera"
                    style={{ color: '#676767' }}
                  />
                  <Text style={styles.widgetText2}>
                    Add Photo or Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => onOpenMediaModal(item)}
                >
                  <Icon
                    name="md-eye"
                    style={{ color: "#676767" }}
                  />
                  <Text style={styles.widgetText2}>
                    See Photos & Videos
                  </Text>
                </TouchableOpacity>               
                {/*
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => navigation.navigate('captureMedia', { itemId: id })}
                >
                  {mediaLen > 0
                    ? (
                      <Text>
                        {`View ${mediaLen} photo${mediaLen === 1 ? '' : 's'} or video${mediaLen === 1 ? '' : 's'}`}
                      </Text>
                    ) : (
                      <Text style={styles.widgetText2}>
                        No photos or videos, yet
                      </Text>
                    )}
                </TouchableOpacity>
                */}
              </View>
            </View>
          );
        })}
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
    textAlign: 'center',
    color: '#585858',
  },
});

export default List;