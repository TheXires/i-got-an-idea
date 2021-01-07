import React, { useState } from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {Color} from '../customTypes/colors';

//Firebase Hooks
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import Idea from '../components/Idea';

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
    <View style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginLeft: 15}} name="funnel-sharp" size={24} color="black" />
    	    <FontAwesome style={{marginLeft: 25}} name="sort-alpha-asc" size={24} color="black" />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginRight: 25}} onPress={() => navigation.navigate('Ideadetails')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 25}} onPress={() => navigation.navigate('Profile')} name="person-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <ScrollView style={styles.body}>

        <Idea />
        <Idea />
        <Idea />
        <Idea />
        <Idea />
        <Idea />
        
      </ScrollView>
    </View>
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
    // marginTop: 0,
    // marginBottom: 'auto',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    marginTop: 5,
    marginHorizontal: 10,
    width: '100%',
  },
});
