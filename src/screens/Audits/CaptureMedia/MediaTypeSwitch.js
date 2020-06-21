import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Switch } from 'native-base';

export const PICTURE = 'PICTURE';
export const VIDEO = 'VIDEO';

export default function TakePicture({ mediaType, toggleMediaType }) {
  const getSwitchLabelStyle = labelType => {
    if (labelType === mediaType) {
      return {
        color: '#fff',
        fontWeight: 'bold',
      };
    }
    return {
      color: 'rgba(255, 255, 255, 0.5)',
    };
  };

  return (
    <View style={styles.mediaSwitchContainer}>
      <Text style={getSwitchLabelStyle(PICTURE)}>
        Picture
      </Text>
      <Switch
        style={styles.mediaSwitch}
        onValueChange={() => toggleMediaType()}
        value={mediaType === VIDEO}
        trackColor={{ false: '#2196f3', true: '#9c27b0' }}
        ios_backgroundColor="#2196f3"
      />
      <Text style={getSwitchLabelStyle(VIDEO)}>
        Video
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transparentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mediaSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    left: 15,
  },
  mediaSwitch: {
    marginLeft: 8,
    marginRight: 8,
  },
});
