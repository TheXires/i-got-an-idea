import React, { useContext } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView } from 'react-native';

import Idea from '../components/Idea';

import { Color } from '../customTypes/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { IdeaContext } from '../contexts/ideaContext';
import { IdeaType } from '../customTypes/ideaType';
import { getUID } from '../services/auth';
import { ProfileData } from '../customTypes/profileData';
import { createProfileData } from '../services/database';


const Main = ({ navigation }: { navigation: any }) => {
  const { ideas }: { ideas: IdeaType[] } = useContext<any>(IdeaContext);

  const user: ProfileData = { 
    profilePictureURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg/400px-Andrzej_Person_Kancelaria_Senatu.jpg',
    name: 'Robin',
    description: 'Das ist einfach nur ein kurzer Test!',
    skills: ['skill 1', 'skill 2', 'skill 3', 'skill4'],
    blockedUsers: [{ id: 'asd56fg498sreg8836aQ9', name: 'Peter' }, { id: 'asd56f23468dg8836aQ9', name: 'Lars' }],
    id: getUID()
  }
  
  createProfileData(user);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          {/* TODO: hier muss noch jeweils die Funktion hinter den Buttons geschreiben werden.
                    Es dürfen allerfings maximal 10 Filter ausgewählt werden */}
          <Ionicons style={{ marginLeft: 15, color: Color.FONT1 }} name="funnel-sharp" size={24} color="black" />
          <FontAwesome style={{ marginLeft: 25, color: Color.FONT1 }} name="sort-alpha-asc" size={24} color="black" />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons style={{ marginRight: 25, color: Color.FONT1 }} onPress={() => navigation.navigate('Chat')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{ marginRight: 25, color: Color.FONT1 }} onPress={() => navigation.navigate('Profile', { id: getUID()})} name="person-sharp" size={24} color="black" />
          <Ionicons style={{ marginRight: 15, color: Color.FONT1 }} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ScrollView>
          {ideas !== undefined ? (
            ideas.map(idea => {
              return (
                <Idea
                  navigation={navigation}
                  key={idea.id}
                  idea={idea}
                />)
            })
          ) : (
              <>
              </>
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
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
