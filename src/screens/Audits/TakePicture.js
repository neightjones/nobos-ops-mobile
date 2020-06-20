import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'native-base';
import { Camera } from 'expo-camera';
import { setItemPhoto } from 'entities/Checklist/actions';

export default function TakePicture({ navigation, route }) {
  const itemId = route.params?.itemId;
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

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

  const snap = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const { uri } = photo;
        dispatch(setItemPhoto(itemId, uri));
        navigation.goBack();
      } catch (e) {
        alert(`Error taking photo: ${e}`);
      }
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginBottom: 20 }}
            onPress={() => snap()}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Snap</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};