import React from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import Footer from '../components/Footer';
import {getUID, logOut} from '../services/auth'
import {createProject, getProfileData, getProjects, getUserProjects} from '../services/database';
import {Color} from '../customTypes/colors';

//Firebase Hooks
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import {Project} from '../customTypes/project';
import {Tag} from '../customTypes/tags';
import {useNavigation} from '@react-navigation/native';
import {ProfileData} from '../customTypes/profileData';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native-gesture-handler';
import {ProjectFactory} from '../customTypes/projectFactory';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import Idea from '../components/Idea';

const Main = ({navigation}: {navigation: any}) => {

  
  // Beispiel für mich. Klappt aber gerade noch nicht.
  // const [projects, loading, error] = useCollectionData<Project>(getProjects());
  //
  // {projects?.map(project =>
  //   <TouchableOpacity onPress={() => navigation.navigate('Ideadetails')}>
  //     <View>
  //       <Text>{project.name}</Text>
  //       <Text>{project.description}</Text>
  //       <Text>
  //         {JSON.stringify(
  //           project.tags.map(tag => Tag[tag])
  //         )}
  //       </Text>
  //       <Image source={{uri: project.imageURLs[0]}}
  //         style={{width: 100, height: 100}} />
  //     </View>
  //   </TouchableOpacity>
  // )}


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
          <Ionicons style={{marginRight: 25}} onPress={() => navigation.navigate('Chat')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 25}} onPress={() => navigation.navigate('Profile')} name="person-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <TouchableOpacity onPress={() => {
          createProject((new ProjectFactory).with()
            .authorIDDefault()
            .creationTimestampDefault()
            .description("Im a test description")
            .imageURLs(["https://i.imgur.com/mQ1d252.jpg"])
            .name("I'm a test name")
            .tagsEmpty()
            .build())
        }}><Text>ICH BIN EIN ERSTELLEN BUTTON</Text></TouchableOpacity>

        <Idea />
        <Idea />
        <Idea />
        <Idea />
        
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.FONT
  },
  header: {
    marginTop: 0,
    marginBottom: 'auto',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND
  },
  body: {
    width: '100%',
    padding: 15,
    backgroundColor: Color.BACKGROUND,
    color: Color.FONT
  },
});
