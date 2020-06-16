import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

export default function LibraryThemes({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>Library Themes</Text>
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{ flexBasis: '48%', height: 100, backgroundColor: 'red', borderRadius: 2 }}
            onPress={() => navigation.push('byTheme', { themeId: 1 })}
          >
            <LinearGradient
                colors={['blue', 'grey']}
                start={[0.0, 0.0]}
                end={[1.0, 1.0]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                }}
            />
            <Text>Hello</Text>
          </TouchableOpacity>
          <View style={{ flexBasis: '48%', height: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
            <LinearGradient
                colors={['darkred', 'midnightblue']}
                start={[0.0, 0.0]}
                end={[1.0, 1.0]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                }}
            />
            <Text style={{ color: '#fff', fontSize: 16 }}>Hello</Text>
          </View>
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
});