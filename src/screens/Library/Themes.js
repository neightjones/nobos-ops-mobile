import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Info from '../../components/Info';
import { housekeepingTheme } from '../../data';
import ThemeTile from './ThemeTile';

export default function LibraryThemes({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Info text="Review training for any Theme below - Training content appears here upon completion." />
        </View>
        <View style={styles.cardContainer}>
          <ThemeTile
            theme={{ name: 'Housekeeping', colorVariant: 1 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
          <ThemeTile
            theme={{ name: 'Front Desk', colorVariant: 2 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
          <ThemeTile
            theme={{ name: 'Back of House', colorVariant: 3 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
          <ThemeTile
            theme={{ name: 'COVID Public Space Protocols', colorVariant: 4 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
          <ThemeTile
            theme={{ name: 'COVID Employee Guidelines', colorVariant: 1 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
          <ThemeTile
            theme={{ name: 'Management Overview', colorVariant: 2 }}
            doPress={() => navigation.push('byTheme', { theme: housekeepingTheme })}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
    height: 90,
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});