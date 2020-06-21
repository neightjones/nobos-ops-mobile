import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'native-base';
import { Camera } from 'expo-camera';
import { setItemPhoto } from 'entities/Checklist/actions';
import MediaTypeSwitch, { PICTURE, VIDEO } from './MediaTypeSwitch';

const CAMERA_TYPE = Camera.Constants.Type.back;

export default function TakePicture({ navigation, route }) {
  const itemId = route.params?.itemId;
  const dispatch = useDispatch();
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
        const SIGNED_URL = 'https://nobos-audit-media.s3.amazonaws.com/photo.jpg?Content-Type=image%2Fjpg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA227V3UENRS2LXONK%2F20200620%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200620T184341Z&X-Amz-Expires=600&X-Amz-Signature=3dc22bd10aaebbcdf062fe560373c3f9e1974f00d234eb8bcd8afdbf2cb5d0a8&X-Amz-SignedHeaders=host';
        const photo = await cameraRef.current.takePictureAsync();
        const { uri } = photo;
        const imageExt = uri.split('.').pop();
        const imageMime = `image/${imageExt}`;
        console.log(`imageMime: ${imageMime}`);
        let picture = await fetch(uri);
        picture = await picture.blob();
        const imageData = new File([picture], `photo.${imageExt}`);
        console.log('Made the file...');
        await fetch(SIGNED_URL, {
          method: 'PUT',
          body: imageData,
          headers: {
            'Content-Type': imageMime,
          },
        });
        // dispatch(setItemPhoto(itemId, uri));
        // navigation.goBack();
      } catch (e) {
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
        const SIGNED_URL = 'https://nobos-audit-media.s3.amazonaws.com/video.mov?Content-Type=video%2Fquicktime&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA227V3UENRS2LXONK%2F20200620%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200620T184900Z&X-Amz-Expires=600&X-Amz-Signature=e983b4f5c34b51aa4f8275b4241135e8c3df2d27fb3ea94a729bfa194ca07c06&X-Amz-SignedHeaders=host';
        const { uri } = videoRec;
        // const imageExt = uri.split('.').pop();
        const videoMime = 'video/quicktime';
        let video = await fetch(uri);
        video = await video.blob();
        const videoData = new File([video], 'video.mov');
        console.log('Made the file...');
        await fetch(SIGNED_URL, {
          method: 'PUT',
          body: videoData,
          headers: {
            'Content-Type': videoMime,
          },
        });
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
