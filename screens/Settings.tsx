import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import { Color } from '../customTypes/colors';

const Settings = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* TODO: Einstellungsmöglichkeiten hier einfügen */}
          {/* TODO: Local Cache löschen */}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    // alignItems: 'center',
    justifyContent: 'space-between',
    color: Color.FONT1
  },
  button: {
    marginBottom: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    paddingVertical: 13,
    paddingHorizontal: 100,
    backgroundColor: Color.BACKGROUND3,
    borderRadius: 50
  }
});

export default Settings;
