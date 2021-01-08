import React, { useState } from 'react';
import {StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text} from 'react-native';
import {Color} from '../customTypes/colors';

//Firebase Hooks
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import Idea from '../components/Idea';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Main = ({navigation}: {navigation: any}) => {


  {/* <TouchableOpacity onPress={() => {
          createProject((new ProjectFactory).with()
            .authorIDDefault()
            .creationTimestampDefault()
            .description("Im a test description")
            .imageURLs(["https://i.imgur.com/mQ1d252.jpg"])
            .name("I'm a test name")
            .tagsEmpty()
            .build())
        }}><Text>ICH BIN EIN ERSTELLEN BUTTON</Text></TouchableOpacity> */}


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginLeft: 15, color: Color.FONT1}} name="funnel-sharp" size={24} color="black" />
          <FontAwesome style={{marginLeft: 25, color: Color.FONT1}} name="sort-alpha-asc" size={24} color="black" />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginRight: 25, color: Color.FONT1}} onPress={() => navigation.navigate('Chat')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 25, color: Color.FONT1}} onPress={() => navigation.navigate('Profile')} name="person-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 15, color: Color.FONT1}} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <ScrollView style={styles.body}>
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
        <Idea navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    paddingTop: 5,
    marginHorizontal: 10,
    width: '100%',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    color: Color.ACCENT
  }
});
