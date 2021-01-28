import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import { Color } from '../customTypes/colors';
import { logOut } from '../services/auth';

const Settings = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TouchableOpacity 
            activeOpacity={.8}
            style={styles.settingButton}
            onPress={() => {
              AsyncStorage.clear();
              logOut();
            }}
          >
            <Text style={styles.settingText}>
              Cache leeren und ausloggen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={.8}
            style={styles.settingButton}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}
          >
            <Text style={styles.settingText}>
              Profile bearbeiten
            </Text>
          </TouchableOpacity>
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
  },
  settingButton: {
    width: '100%',
    height: 70,
    padding: 15,
    justifyContent: 'center',
    borderBottomColor: Color.FONT3,
    borderBottomWidth: 1
  },
  settingText: {
    color: Color.FONT2
  }
});

export default Settings;
