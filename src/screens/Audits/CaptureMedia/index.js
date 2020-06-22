import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Text, Toast } from 'native-base';
import { Camera } from 'expo-camera';
import { addPhoto, addVideo } from 'entities/Checklist/actions';
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
        const photo = await cameraRef.current.takePictureAsync();
        const { uri } = photo;
        console.log('photo initial uri: ' + uri);
        const imageExt = uri.split('.').pop();
        const imageMime = `image/${imageExt}`;
        console.log(`imageMime: ${imageMime}`);
        let picture = await fetch(uri);
        picture = await picture.blob();
        console.log('Made the picture...', picture);
        console.log('Made the file...', imageFile);
        let signedUrlRes = await fetch('http://localhost/api/v1/audits/signedPutUrl', {
          method: 'POST',
          body: JSON.stringify({
            auditId: 1,
            itemId: 1,
            fileExtension: imageExt,
            mimeTime: imageMime,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        signedUrlRes = await signedUrlRes.json();
        console.log('signedUrlRes is: ' + JSON.stringify(signedUrlRes));
        const { signedUrl, key } = signedUrlRes;
        const imageFile = new File([picture], key);
        console.log('req signed url: ' + signedUrl);
        await fetch(signedUrl, {
          method: 'PUT',
          body: imageFile,
          headers: {
            'Content-Type': imageMime,
          },
        });
        Toast.show({
          text: 'Photo taken!',
          position: 'bottom',
          type: 'success',
        });
        dispatch(addPhoto(itemId, uri));
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
        const SIGNED_URL = 'https://nobos-audit-media.s3.use-east-1.amazonaws.com/video.mov?Content-Type=video%2Fquicktime&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA227V3UENRS2LXONK%2F20200621%2Fuse-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200621T235319Z&X-Amz-Expires=600&X-Amz-Signature=6e302eb151116cbc6f5019d183e7e31c306a34b2cf92714cb81182b134157aff&X-Amz-SignedHeaders=host';
        const { uri } = videoRec;
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
        Toast.show({
          text: 'Video recorded!',
          position: 'bottom',
          type: 'success',
        });
        dispatch(addVideo(itemId, uri));
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
