import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';

import Idea from '../components/Idea';

import {Color} from '../customTypes/colors';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

import { IdeaContext } from '../contexts/ideaContext';
import { IdeaType } from '../customTypes/ideaType';
import { getUID } from '../services/auth';
import FloatingActionButton from '../components/FloatingActionButton';
import CustomSpinner from '../components/CustomSpinner';
import { FlatList } from 'react-native-gesture-handler';

const Main = ({ navigation }: { navigation: any }) => {
  const { ideas }: { ideas: IdeaType[] } = useContext<any>(IdeaContext);
  const [oldestComesLast, setOldestComesLast] = useContext<any>(IdeaContext).oldestComesLast; 
  const {loadMoreEntries} = useContext<any>(IdeaContext);
  const {limitReached} = useContext<any>(IdeaContext);

  // const [showFilter, setShowFilter] = useState(false)
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
          <Ionicons style={{ marginLeft: 15, color: Color.FONT1 }} name="funnel-sharp" size={24} color="black" onPress={
            () => {
              // setShowFilter(!showFilter);
            }
          } />
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
        {ideas !== undefined ? (
          <FlatList 
            data={ideas}
            keyExtractor={idea => idea.id!}
            renderItem={(idea) => (
                <Idea
                  navigation={navigation}
                  key={idea.item.id}
                  idea={idea.item}
                />
            )}
            onEndReached={() => {
              setLoading(true);
              loadMoreEntries();
            }}
            onEndReachedThreshold={0.55}
            ListFooterComponent={loading ? <CustomSpinner /> : <></>}
            // TODO: pull to reload Funktionalität hinzufügen. (dafür muss vermutlich eine neue Funktion im ideaContext geschreiben werden, die die Liste aktualisiert? -> ne vermutlich nicht, da alles automatisch gepusht wird)
            // https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native#toc-flatlist-component
          />
        ) : (<></>)}



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
