import React, {useContext, useState} from 'react';
import {StyleSheet, View, StatusBar, SafeAreaView, Text } from 'react-native';

import Idea from '../components/Idea';

import {Color} from '../customTypes/colors';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

import {IdeaContext} from '../contexts/ideaContext';
import {IdeaType} from '../customTypes/ideaType';
import {getUID} from '../services/auth';
import FloatingActionButton from '../components/FloatingActionButton';
import CustomSpinner from '../components/CustomSpinner';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Checkbox from '../components/Checkbox';
import {Tag} from '../customTypes/tags';

/**
 * Landing page of the app. Shows ideas and options to navigate to other pages
 */
const Main = ({navigation}: {navigation: any}) => {
  const {ideas}: {ideas: IdeaType[]} = useContext<any>(IdeaContext);
  const {contextLoading}: {contextLoading: boolean} = useContext<any>(IdeaContext);
  const {contextLoadingMoreEntries}: {contextLoadingMoreEntries: boolean} = useContext<any>(IdeaContext);
  const setContextFilters = useContext<any>(IdeaContext).filters[1];
  const [oldestComesLast, setOldestComesLast] = useContext<any>(IdeaContext).oldestComesLast;
  const {loadMoreEntries} = useContext<any>(IdeaContext);
  const {limitReached} = useContext<any>(IdeaContext);

  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState([false, false, false, false, false, false, false, false, false, false]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginLeft: 15, color: Color.FONT1}} name="funnel-sharp" size={24} color="black" onPress={
            () => {
              setShowFilter(!showFilter);
            }
          } />
          {oldestComesLast ? (
            <FontAwesome style={{marginLeft: 25, color: Color.FONT1}} onPress={() => {setOldestComesLast(false)}} name="sort-alpha-asc" size={24} color="black" />
          ) : (
              <FontAwesome style={{marginLeft: 25, color: Color.FONT1}} onPress={() => {setOldestComesLast(true)}} name="sort-alpha-desc" size={24} color="black" />
            )}
        </View>

        {/* Header Buttons on the top right */}
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginRight: 25, color: Color.FONT1}} onPress={() => navigation.navigate('Chat')} name="chatbubbles-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 25, color: Color.FONT1}} onPress={() => navigation.navigate('Profile', {id: getUID()})} name="person-sharp" size={24} color="black" />
          <Ionicons style={{marginRight: 15, color: Color.FONT1}} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {showFilter ?
          <View style={styles.filterBox}>
            <View style={styles.filterContainer}>
              <View style={styles.filterColumn}>
                <View style={styles.filterCategoryContainer}>
                  <Checkbox selected={filters} setSelected={setFilters} current={0} name={'Frontend'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={1} name={'Backend'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={2} name={'Datamanagement'} />
                </View>
                <View style={styles.filterCategoryContainer}>
                  <Checkbox selected={filters} setSelected={setFilters} current={3} name={'iOS'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={4} name={'Android'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={5} name={'HarmonyOS'} />
                </View>
                <View style={styles.filterCategoryContainer}>
                  <Checkbox selected={filters} setSelected={setFilters} current={6} name={'Webseite'} />
                </View>
              </View>

              <View style={styles.filterColumn}>
                <View style={styles.filterCategoryContainer}>
                  <Checkbox selected={filters} setSelected={setFilters} current={7} name={'Windows'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={8} name={'MacOS'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={9} name={'ChromeOS'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={10} name={'Linux'} />
                </View>
                <View style={styles.filterCategoryContainer}>
                  <Checkbox selected={filters} setSelected={setFilters} current={11} name={'Smartwatch'} />
                  <Checkbox selected={filters} setSelected={setFilters} current={12} name={'Mikrocontroller'} />
                </View>
              </View>

            </View>
            {filters.filter(f => f == true).length < 11 ?
              <TouchableOpacity onPress={applyFilters}>
                <Text style={styles.filterButton}>Filtern</Text>
              </TouchableOpacity>
              :
              <View>
                <Text style={styles.deactivatedFilterButton}>Maximal 10 Filter gleichzeitig</Text>
              </View>
            }
          </View>
          :
          <></>
        }
        {contextLoading ? <CustomSpinner /> : <></>}

        {ideas !== undefined ? (
          ideas.length > 0 ?
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
                loadMoreEntries();
              }}
              onEndReachedThreshold={0.55}
              ListFooterComponent={contextLoadingMoreEntries ? <CustomSpinner /> : <></>}
            />
              :
            <Text style={{color: Color.FONT1, textAlign: 'center', padding: 10}}>Keine Einträge gefunden!</Text>
        ) : (<></>)}

        <FloatingActionButton 
          onPress={() => {navigation.navigate('CreateIdea')}} 
          navigation={navigation}
          icon={<Ionicons name="ios-add" size={40} color={Color.FONT1} style={{height: 42, width: 38}} />} 
        />
      </View>
    </SafeAreaView>
  )

  function applyFilters() {
    const tags: Tag[] = [];
    filters.forEach((filterActive, index) => {
      if (filterActive) {
        tags.push(index);
      }
    })
    setContextFilters(tags)
    setShowFilter(false);
  }
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
  },
  filterBox: {
    backgroundColor: Color.BACKGROUND2,
    borderRadius: 25,
    padding: 20,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row'
  },
  filterColumn: {
    flexDirection: 'column',
    width: '50%'
  },
  filterCategoryContainer: {
    marginVertical: 5
  },
  filterButton: {
    padding: 8,
    backgroundColor: Color.ACCENT,
    color: Color.FONT1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10
  },
  deactivatedFilterButton: {
    padding: 8,
    borderColor: Color.ACCENT,
    borderWidth: 3,
    color: Color.FONT1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10
  },
});
