import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { Ionicons } from '@expo/vector-icons';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { IdeaType } from '../customTypes/ideaType';
import { IdeaFactory } from '../customTypes/ideaFactory';

const CreateIdea = ({ navigation }: { navigation: any }) => {
  const { idea }: { idea: IdeaFactory } = useContext<any>(ideaCreationContext).idea;

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Name der Idee</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={text => idea.name(text)}
        placeholderTextColor={Color.FONT3}
        placeholder='Name der Idee'
      />


      <Text style={styles.h1}>Beschreibung</Text>
      <TextInput
        multiline={true}
        style={[styles.nameInput, { height: 100 },]}
        onChangeText={text => idea.name(text)}
        placeholderTextColor={Color.FONT3}
        placeholder='Name der Idee'
      />


      <Text style={styles.h1}>Bilder</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateIdea')} style={styles.container}>
        <Ionicons name="ios-add" size={40} color={Color.FONT1} />
      </TouchableOpacity>

      {/* TODO: Button hinzufügen, der beim weitermachen die Felder setzt in die IdeaFactory setzt. 
                Gebaut wird diese dann beim letztn Screen durch den Button "abschließen" */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 15
  },
  h1: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: Color.FONT1
  },
  nameInput: {
    marginBottom: 20,
    padding: 10,
    height: 40,
    borderColor: Color.BACKGROUND3,
    borderWidth: 1,
    borderRadius: 20,
    color: Color.FONT2
  }
})

export default CreateIdea;