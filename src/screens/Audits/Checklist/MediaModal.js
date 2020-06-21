import React, { useState } from 'react';
import { Dimensions, StyleSheet, Modal, Image, View } from 'react-native';
import { Text, Button, Container, Content, Icon } from 'native-base';
import { Video } from 'expo-av';

const screenWidth = Math.round(Dimensions.get('window').width);

const MediaModal = props => {
  const { item, open, close } = props;
  if (!item) return null;
  const { text, images, videos } = item;
  console.log('imagesss: ', images);
  console.log('videos: ', videos);

  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={() => close()}
      onDismiss={() => close()}
     >
       <Container>
         <Content style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.itemText}>
            {text}
          </Text>
          <View style={styles.iconTitleContainer}>
            <Icon name="ios-camera" style={{ color: '#585858' }} />
            <Text style={{...styles.itemText, marginLeft: 10 }}>Photos Captured</Text>
          </View>
          {!images.length && (
            <View>
              <Text style={{...styles.itemText, fontStyle: 'italic'}}>
                No images, yet - go back to take a new photo.
              </Text>
            </View>
          )}
          {images.map(image => (
            <Image
              key={image}
              source={{ isStatic: true, uri: image }}
              style={styles.imageView}
            />
          ))}
          <View style={styles.iconTitleContainer}>
            <Icon name="ios-videocam" style={{ color: '#585858' }} />
            <Text style={{...styles.itemText, marginLeft: 10 }}>Videos Captured</Text>
          </View>
          {!videos.length && (
            <View>
              <Text style={{...styles.itemText, fontStyle: 'italic'}}>
                No videos, yet - go back to record a new video.
              </Text>
            </View>
          )}
          {videos.map(video => (
            <Video
              key={video}
              source={{ isStatic: true, uri: video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              style={styles.videoView}
              useNativeControls
            />
          ))}
        </Content>
        <Button
          iconLeft
          style={styles.doneBtn}
          onPress={() => close()}
        >
          <Icon name="md-arrow-round-back" />
          <Text>Back to Audit</Text>
        </Button>
       </Container>
     </Modal>
  );
};

export default MediaModal;

const mediaEltBase = {
  width: screenWidth * .9,
  height: screenWidth * .9,
  marginBottom: 20,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 75,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 160,
  },
  iconTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 20,
  },
  itemText: {
    color: '#585858',
    fontSize: 14,
    textAlign: 'center',
  },
  doneBtn: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  imageView: {
    ...mediaEltBase,
    resizeMode: 'contain',
  },
  videoView: {
    ...mediaEltBase,
  },
});