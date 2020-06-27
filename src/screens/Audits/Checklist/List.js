import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem, CheckBox, H2, Button, Icon, Card, Body, Switch } from "native-base";
import Info from 'components/Info';
import MediaModal from './MediaModal';
import CommentModal from './CommentModal';

const List = props => {
  const {
    navigation,
    currentInstance,
    completeChecklistInstance,
    patchChecklistInstanceItem,
    photoCache,
    videoCache,
  } = props;
  const { id: checklistInstanceId, name, instanceItems } = currentInstance;
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaItemSelected, setMediaItemSelected] = useState('');
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentItemSelected, setCommentItemSelected] = useState('');

  const score = instanceItems.filter(i => i.pass).length / instanceItems.length;

  const onOpenMediaModal = item => {
    setMediaItemSelected(item);
    setMediaModalOpen(true);
  };

  const onOpenCommentModal = item => {
    setCommentItemSelected(item);
    setCommentModalOpen(true);
  };

  const doTogglePass = (id, curr) => {
    patchChecklistInstanceItem(id, 'pass', curr, !curr);
  };

  const onSubmit = async () => {
    try {
      await completeChecklistInstance(
        checklistInstanceId,
        score,
      );
      navigation.navigate('create');
    } catch (e) {
      console.error(`Error on checklist submit: ${e}`);
    }
  };

  return (
    <Container>
      <Content style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        {/* Modal to show Media only needs one instance */}
        <MediaModal
          open={mediaModalOpen}
          close={() => setMediaModalOpen(false)}
          item={mediaItemSelected}
          photoCache={photoCache}
          videoCache={videoCache}
        />
        {/* Modal to show Comment only needs one instance */}
        <CommentModal
          open={commentModalOpen}
          close={() => setCommentModalOpen(false)}
          item={commentItemSelected}
          patchChecklistInstanceItem={patchChecklistInstanceItem}
        />
        <View style={styles.infoContainer}>
          <Info text={`Auditing: ${name}`} />
        </View>
        {instanceItems.map(item => {
          const { id, text, pass } = item;

          return (
            <View
              key={id}
              style={[styles.itemView, { borderColor: pass ? '#5BC236' : 'rgba(0, 0, 0, .12)' }]}
            >
              <Text style={styles.itemText}>{text}</Text>
              <View style={styles.widgetsHolder}>
                <View style={styles.widgetHolder}>
                  <Switch style={styles.switchHolder} value={pass} onValueChange={() => doTogglePass(id, pass)} />
                  <Text style={styles.widgetText}>
                    Pass?
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => onOpenCommentModal(item)}
                >
                  <Icon name="md-chatbubbles" style={{ color: '#676767' }} />
                  <Text style={styles.widgetText2}>
                    Comment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.widgetHolder}
                  onPress={() => navigation.navigate('captureMedia', { itemId: id, checklistInstanceId })}
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
              </View>
            </View>
          );
        })}


        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <H2 style={{ color: '#676767' }}>
            {`Score: ${instanceItems.filter(i => i.pass).length} / ${instanceItems.length}`}
          </H2>
        </View>
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Button
            style={styles.button}
            onPress={() => onSubmit()}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentInstance: PropTypes.object.isRequired,
  completeChecklistInstance: PropTypes.func.isRequired,
  patchChecklistInstanceItem: PropTypes.func.isRequired,
  photoCache: PropTypes.object.isRequired,
  videoCache: PropTypes.object.isRequired,
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
    alignSelf: 'center',
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