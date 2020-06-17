import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const colorsByCode = {
  1: { first: '#4527a0', second: '#c2185b' },
  2: { first: '#303f9f', second: '#29b6f6' },
  3: { first: '#b71c1c', second: '#ff8f00' },
  4: { first: '#43a047', second: '#0097a7' },
};

export default function ThemeTile({ theme, doPress }) {
  const { name, colorVariant } = theme;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => doPress()}
    >
      <LinearGradient
          colors={[colorsByCode[colorVariant].first, colorsByCode[colorVariant].second]}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
          style={styles.gradient}
      />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const RADIUS = 2;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexBasis: '48%',
    height: 100,
    borderRadius: RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
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
  name: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});