import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Footer from '../components/Footer';
import {getUID, logOut} from '../services/auth'
import {getProjects, getUserProjects} from '../services/database';
import {Color} from '../customTypes/colors';

//Firebase Hooks
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Project} from '../customTypes/project';
import {Tag} from '../customTypes/tags';
import {useNavigation} from '@react-navigation/native';

const Main = ({navigation}: {navigation: any}) => {
  const [projects, loading, error] = useCollectionData<Project>(getProjects());
  

  return (
    <View style={styles.container}>
      <Text onPress={logOut}>Startseite</Text>
      <Text selectable>
        Content: {JSON.stringify(projects)}
      </Text>
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

      <Footer navigation={navigation} />
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
  }
});
