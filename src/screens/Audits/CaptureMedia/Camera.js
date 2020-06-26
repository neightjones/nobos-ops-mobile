import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Text, Toast } from 'native-base';
import { Camera } from 'expo-camera';
import MediaTypeSwitch, { PICTURE, VIDEO } from './MediaTypeSwitch';

const CAMERA_TYPE = Camera.Constants.Type.back;

const CameraViewer = props => {
  const {
    navigation,
    route,
    createChecklistInstanceItemMedia,
    uploadMediaToS3,
  } = props;
  const itemId = route.params?.itemId;
  const checklistInstanceId = route.params?.checklistInstanceId;
  const [hasPermission, setHasPermission] = useState(null);
  const [mediaType, setMediaType] = useState(PICTURE);
  const [videoIsRecording, setVideoIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const toggleMediaType = () => {
    if (mediaType === PICTURE) setMediaType(VIDEO);
    else setMediaType(PICTURE);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const { uri } = photo;
        console.log('photo initial uri: ' + uri);
        const imageExt = uri.split('.').pop();
        const imageMime = `image/${imageExt}`;
        console.log(`imageMime: ${imageMime}`);
        let picture = await fetch(uri);
        picture = await picture.blob();
        console.log('Made the picture...', picture);
        const { signedUrl, key } = await createChecklistInstanceItemMedia(
          itemId,
          checklistInstanceId,
          PICTURE,
          imageExt,
          imageMime,
          uri
        );
        const imageFile = new File([picture], key);
        console.log('req signed url: ' + signedUrl);
        uploadMediaToS3(signedUrl, imageFile, imageMime);
        Toast.show({
          text: 'Photo taken!',
          position: 'bottom',
          type: 'success',
        });
        navigation.goBack();
      } catch (e) {
        console.log('error taking photo: ', e);
        alert(`Error taking photo: ${e}`);
      }
    }
  }

  const startVideoRecord = async () => {
    if (videoIsRecording) return alert('Already recording!');
    if (cameraRef) {
      try {
        setVideoIsRecording(true);
        // Resolves on stop recording, time limit reached, etc.
        const videoRec = await cameraRef.current.recordAsync({
          maxDuration: 30,
        });
        console.log('video: ', videoRec);
        const { uri } = videoRec;
        const videoExt = uri.split('.').pop();
        const videoMime = 'video/quicktime'; // TODO: this is for iOS
        let video = await fetch(uri);
        video = await video.blob();
        const { signedUrl, key } = await createChecklistInstanceItemMedia(
          itemId,
          checklistInstanceId,
          VIDEO,
          videoExt,
          videoMime,
          uri
        );
        const videoFile = new File([video], 'video.mov');
        console.log('Made the file...');
        // Not waiting on this...
        // uploadMediaToS3(signedUrl, videoFile, videoMime);
        Toast.show({
          text: 'Video recorded!',
          position: 'bottom',
          type: 'success',
        });
        navigation.goBack();
      } catch (e) {
        alert(`Error recording video: ${e}`);
      } finally {
        // Not recording after error or recording promise resolves
        setVideoIsRecording(false);
      }
    }
  }

  const onStopRecording = async () => {
    if (!videoIsRecording) return alert('No recording in progress!');
    if (cameraRef) {
      cameraRef.current.stopRecording();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={CAMERA_TYPE}
        ref={cameraRef}
      >
        <View style={styles.transparentContainer}>
          {/* Switch between Picture / Video */}
          <MediaTypeSwitch mediaType={mediaType} toggleMediaType={toggleMediaType} />
          <View style={styles.actionContainer}>
            {/* Snap Picture */}
            {mediaType === PICTURE && (
              <TouchableOpacity
                style={styles.touchCircle}
                onPress={() => takePicture()}
              >
                <Icon name="ios-camera" />
              </TouchableOpacity>
            )}
            {/* Record Video */}
            {mediaType === VIDEO && (
              <TouchableOpacity
                style={videoIsRecording ? styles.recordingCircle : styles.touchCircle}
                onPress={() => {
                  if (videoIsRecording) onStopRecording();
                  else startVideoRecord();
                }}
              >
                {videoIsRecording
                  ? (
                    <Icon name="ios-square" />
                  ) : (
                    <>
                      <Icon name="ios-videocam" />
                      <Text>Rec</Text>
                    </>
                  )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
};

CameraViewer.propTypes = {
  createChecklistInstanceItemMedia: PropTypes.func.isRequired,
  uploadMediaToS3: PropTypes.func.isRequired,
};

export default CameraViewer;

const touchCircleBase = {
  width: 75,
  height: 75,
  borderRadius: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  transparentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  actionContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  touchCircle: {
    ...touchCircleBase,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  recordingCircle: {
    ...touchCircleBase,
    backgroundColor: '#f44336',
  },
});
