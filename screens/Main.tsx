import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {logOut} from '../services/auth'
import {Color} from '../customTypes/colors';
import {createIdea} from '../services/database';
import {ProjectFactory} from '../customTypes/ideaFactory';
import IdeaProvider from '../contexts/ideaContext';
import {Tag} from '../customTypes/tags';


const Main = ({navigation}: {navigation: any}) => {
  // const [projects, loading, error] = useCollectionData<Project>(getProjects());
  // const [profile, loading, error] = useDocumentData<ProfileData>(getProfileData(getUID()));



  return (
    <View style={styles.container}>
      <Text onPress={logOut} style={styles.testpadding}>Startseite</Text>
      <Text onPress={() => console.log("LOOOOG")} style={styles.testpadding}>LOOOOOOOG</Text>
      <IdeaProvider>
        <Text>Hi</Text>
      </IdeaProvider>
      {/* <Text selectable>
        Content: {JSON.stringify(profile)}
      </Text> */}
      <TouchableOpacity onPress={() => {
        createIdea((new ProjectFactory).with()
          .authorIDDefault()
          .authorName('Felix')
          .authorProfilePictureURL('https://i.imgur.com/mQ1d252.jpg')
          .creationTimestampDefault()
          .description("Im a test description")
          .imageURLs(["https://i.imgur.com/mQ1d252.jpg"])
          .name("I'm a test name")
          .tags([Tag.ANDROID, Tag.FRONTEND])
          .buildWithChecks())
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
