import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { Ionicons } from '@expo/vector-icons';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { IdeaFactory } from '../customTypes/ideaFactory';
import CustomImage from '../components/CustomImage';

const CreateIdea = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const { setDiscard }: { setDiscard: any } = useContext<any>(ideaCreationContext);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    navigation.addListener('beforeRemove', (e: any) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        '\u00c4nderungen verwerfen?',
        'Dadurch gehen alle \u00c4nderungen verloren m\u00fcssen und m\u00f6glicherweise erneut eingeben werden!',
        [
          { text: "Bleiben", style: 'cancel', onPress: () => {} },
          {
            text: 'Verwefen',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              setDiscard(true);
              navigation.dispatch(e.data.action)
            },
          },
        ]
      );
    })
  }, [navigation]);
  
  useEffect(() => {
    reload && setReload(false);
  }, [reload]);

  newIdea.authorIDDefault();


  return (
    <>
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.h1}>Name der Idee</Text>
        {/* TODO: Prüfung hinzufügen, dass ein valider Name hinzugefügt wurde */}
        <TextInput
          style={styles.textInput}
          onChangeText={text => newIdea.name(text.trim())}
          placeholderTextColor={Color.FONT3}
          placeholder='Name der Idee'
        />


        <Text style={styles.h1}>Beschreibung</Text>
        {/* TODO: Prüfung hinzufügen, dass eine valide Beschreibung hinzugefügt wurde (z.B. min 5 Wörter) */}
        <TextInput
          multiline={true}
          style={[styles.textInput, { height: 250, textAlignVertical: "top"}]}
          onChangeText={text => newIdea.description(text.trim())}
          placeholderTextColor={Color.FONT3}
          placeholder='Name der Idee'
        />


        <Text style={styles.h1}>Bilder</Text>
    	  {newIdea.getImageURLs() !== undefined && newIdea.getImageURLs()!.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {newIdea.getImageURLs()!.map((image) => { return (<CustomImage source={{ uri: image }} imgSize={200} key={image} />) })}
          </ScrollView>
        ) : (<></>) }

        <View style={styles.addImage}>
          <TouchableOpacity style={styles.addImageButton} onPress={() => {
            // TODO: honzufügen von eigenen Bildern ermöglichen oder wenigstens von weiteren, unterschiedlichen zufälligen
            // newIdea.addImageURL(['https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg']);
            newIdea.addImageURL(['https://avatars3.githubusercontent.com/u/62450142?s=400&v=4']);
            setReload(true);
          }}>
            <Ionicons name="ios-add" size={60} color={Color.FONT1} style={{ height: 62, width: 58}} />
          </TouchableOpacity>
          <Text style={styles.addImageText}>Bilder hinzufügen</Text>
        </View>
        </ScrollView>
      </View>


      {/* Navigation Buttons */}
      <View style={[styles.navigationbackground, {justifyContent: 'flex-end'}]}>
        {/* next */}
        <TouchableOpacity 
          style={styles.button}
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
    padding: 15,
    marginBottom: '10%',
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Color.ACCENT,
    borderRadius: 50,
  }
})

export default CreateIdea;