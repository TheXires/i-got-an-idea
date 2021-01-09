import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text } from 'react-native';
import { Color } from '../customTypes/colors';

//Firebase Hooks
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Idea from '../components/Idea';
import { IdeaContext } from '../contexts/ideaContext';


const Main = ({ navigation }: { navigation: any }) => {
  const context = useContext<any>(IdeaContext);

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
          <Ionicons style={{ marginRight: 25, color: Color.FONT1 }} onPress={() => navigation.navigate('Profile')} name="person-sharp" size={24} color="black" />
          <Ionicons style={{ marginRight: 15, color: Color.FONT1 }} onPress={() => navigation.navigate('Settings')} name="settings-sharp" size={24} color="black" />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ScrollView>
          {context.ideas !== undefined ? (
            context.ideas.map((idea: any) => {
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
