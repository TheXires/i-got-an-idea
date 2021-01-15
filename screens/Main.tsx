import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Button } from 'react-native';

import Idea from '../components/Idea';

import {Color} from '../customTypes/colors';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

import { IdeaContext } from '../contexts/ideaContext';
import { IdeaType } from '../customTypes/ideaType';
import { getUID } from '../services/auth';
import FloatingActionButton from '../components/FloatingActionButton';
import CustomSpinner from '../components/CustomSpinner';

const Main = ({ navigation }: { navigation: any }) => {
  const { ideas }: { ideas: IdeaType[] } = useContext<any>(IdeaContext);
  const [oldestComesLast, setOldestComesLast] = useContext<any>(IdeaContext).oldestComesLast; 
  const {loadMoreEntries} = useContext<any>(IdeaContext);
  const {limitReached} = useContext<any>(IdeaContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ideas !== undefined && setLoading(false);
  }, [ideas])
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          {/* TODO: hier muss noch jeweils die Funktionalität hinter dem Filter Button geschreiben werden.
                    Es dürfen allerfings maximal 10 Filter ausgewählt werden */}
          <Ionicons style={{ marginLeft: 15, color: Color.FONT1 }} name="funnel-sharp" size={24} color="black" />
          {oldestComesLast ? (
            <FontAwesome style={{ marginLeft: 25, color: Color.FONT1 }} onPress={() => {setOldestComesLast(false); setLoading(true)}} name="sort-alpha-asc" size={24} color="black" />
          ) : (
              <FontAwesome style={{ marginLeft: 25, color: Color.FONT1 }} onPress={() => {setOldestComesLast(true); setLoading(true)}} name="sort-alpha-desc" size={24} color="black" />
            )}
        </View>

        {/* Header Buttons on the top right */}
        <View style={{ flexDirection: 'row' }}>
          <Ionicons style={{ marginRight: 25, color: Color.FONT1 }} onPress={() => navigation.navigate('Chat')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{ marginRight: 25, color: Color.FONT1 }} onPress={() => navigation.navigate('Profile', { id: getUID() })} name="person-sharp" size={24} color="black" />
          <Ionicons style={{ marginRight: 15, color: Color.FONT1 }} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ScrollView>
          {/* Ideas from context get rendered here */}
          {ideas !== undefined ? (
            ideas.map(idea => {
              return (
                <Idea
                  navigation={navigation}
                  key={idea.id}
                  idea={idea}
                />)
            })
          ) : (<></>)}
          {loading && <CustomSpinner />}

            {/* TODO: erreichen der unteren kannte muss durch funktion errechnet werden. 
                      https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
                      https://reactnative.dev/docs/scrollview */}
          {limitReached ? (<></>) : <Button title="MEHR!!" onPress={() => { setLoading(true); loadMoreEntries()}}></Button> }
        </ScrollView>

        <FloatingActionButton navigation={navigation} />

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
