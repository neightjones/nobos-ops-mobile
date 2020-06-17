import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

export default function ThemeTile({ text }) {
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#1a237e', '#303f9f']}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
          style={styles.gradient}
      />
      <View style={styles.iconHolder}>
        <Icon name="md-information-circle-outline" style={{ color: "#fff" }} />
      </View>
      <View style={styles.textHolder}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const RADIUS = 2;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    borderRadius: RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: RADIUS,
  },
  iconHolder: {
    flex: 1,
  },
  textHolder: {
    flex: 6,
  },
  text: {
    color: '#fff',
  },
});