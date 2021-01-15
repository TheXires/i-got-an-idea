import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { Ionicons } from '@expo/vector-icons';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { IdeaFactory } from '../customTypes/ideaFactory';

const CreateIdea = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);

  useEffect(() => {
    // console.log(newIdea);
  }, [newIdea])
  
  newIdea.authorIDDefault();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h1}>Name der Idee</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => newIdea.name(text)}
          placeholderTextColor={Color.FONT3}
          placeholder='Name der Idee'
        />


        <Text style={styles.h1}>Beschreibung</Text>
        <TextInput
          multiline={true}
          style={[styles.textInput, { height: 250, textAlignVertical: "top"}]}
          onChangeText={text => newIdea.description(text)}
          placeholderTextColor={Color.FONT3}
          placeholder='Name der Idee'
        />


        <Text style={styles.h1}>Bilder</Text>
        <View style={styles.addImage}>
          <TouchableOpacity onPress={() => newIdea.imageURLs(['https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg'])} style={styles.addImageButton}>
            <Ionicons name="ios-add" size={60} color={Color.FONT1} style={{ height: 62, width: 58}} />
          </TouchableOpacity>
          <Text style={styles.addImageText}>Bilder hinzufügen</Text>
        </View>
      </View>


      {/* Navigation Buttons */}
      <View style={styles.navigationbackground}>
        {/* next */}
        <TouchableOpacity 
          style={[styles.button, styles.next]} 
          onPress={() => navigation.navigate('CreateIdeaFrontend')}
        >
          <Text style={{ color: Color.FONT1 }}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </>
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
  textInput: {
    marginBottom: 20,
    padding: 10,
    height: 40,
    borderColor: Color.BACKGROUND3,
    borderWidth: 1,
    borderRadius: 20,
    color: Color.FONT2
  },
  addImage:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  addImageButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.ACCENT,
    borderRadius: 50,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  addImageText: {
    marginTop: 20,
    color: Color.FONT3
  },
  navigationbackground: {
    width: '100%',
    height: '10%',
    backgroundColor: Color.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '8%',
    backgroundColor: Color.ACCENT,
    borderRadius: 50,
  },
  next: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 15,
  },
  previous: {
    position: 'relative',
    marginLeft: 15,
    marginRight: 'auto',
  },
})

export default CreateIdea;