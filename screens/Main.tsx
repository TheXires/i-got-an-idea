import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
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

const Main = ({navigation}: {navigation: any}) => {
  // const [projects, loading, error] = useCollectionData<Project>(getProjects());
  const [profile, loading, error] = useDocumentData<ProfileData>(getProfileData(getUID()));



  return (
    <View style={styles.container}>
      <Text onPress={logOut} style={styles.testpadding}>Startseite</Text>
      <Text onPress={() => console.log("LOOOOG")} style={styles.testpadding}>LOOOOOOOG</Text>
      {/* <Text selectable>
        Content: {JSON.stringify(profile)}
      </Text> */}
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
      {/* {projects?.map(project =>
        <View>
          <Text>{project.name}</Text>
          <Text>{project.description}</Text>
          <Text>
            {JSON.stringify(
              project.tags.map(tag => Tag[tag])
            )}
          </Text>
          <Image source={{uri: project.imageURLs[0]}}
            style={{width: 100, height: 100}} />
        </View>
      )} */}

      {/* <Footer navigation={navigation} /> */}
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
  text: {
    color: Color.FONT
  },
  testpadding: {
    padding: 10
  }
});
