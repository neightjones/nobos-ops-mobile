import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Content, Text, ListItem, CheckBox, H2, Button, Icon } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Info from 'components/Info';
import { doToggleItem, setItemPhoto, setItemVideo, setItemComment } from 'entities/Checklist/actions';

const AuditChecklist = props => {
  const {
    navigation,
    checklist,
    doToggleItem,
    setItemPhoto,
    setItemVideo,
    setItemComment,
  } = props;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Info text="Auditing 'Restroom Cleaning' Topic" />
        </View>
        <Content style={{ paddingRight: 10 }}>
          {checklist.map(item => (
            <ListItem key={item.id}>
              <CheckBox
                color="green"
                checked={item.checked}
                onPress={() => doToggleItem(item.id)}
              />
              <Text style={{ marginLeft: 10, color: item.checked ? 'green' : '#676767' }}>
                {item.text}
              </Text>
              <Icon name="ios-camera" onPress={() => navigation.navigate('takePicture')} />
            </ListItem>
          ))}
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
      </ScrollView>
    </View>
  );
};

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

const mapStateToProps = state => ({
  checklist: state.entities.checklists.checklist,
});

const mapDispatchToProps = dispatch => ({
  doToggleItem: itemId => dispatch(doToggleItem(itemId)),
  setItemPhoto: (itemId, uri) => dispatch(setItemPhoto(itemId, uri)),
  setItemVideo: (itemId, uri) => dispatch(setItemVideo(itemId, uri)),
  setItemComment: (itemId, text) => dispatch(setItemComment(itemId, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditChecklist);