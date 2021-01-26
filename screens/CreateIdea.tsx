import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { Ionicons } from '@expo/vector-icons';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { IdeaFactory } from '../customTypes/ideaFactory';
import CustomImage from '../components/CustomImage';
import BottomNavigation from '../components/BottomNavigation';

/**
 * Initial page of the idea cration process
 */
const CreateIdea = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const { setDiscard }: { setDiscard: any } = useContext<any>(ideaCreationContext);
  const { getFinished, setFinished }: { getFinished: any, setFinished: any } = useContext<any>(ideaCreationContext);
  const [reload, setReload] = useState(false);

  console.log('CreateIdea: ', newIdea);
  

  useEffect(() => {
    navigation.addListener('beforeRemove', (e: any) => {
      if(!getFinished()){
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
      }else{
        setFinished(false);
      }
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
          <TextInput
            style={styles.textInput}
            onChangeText={text => newIdea.name(text.trim())}
            placeholderTextColor={Color.FONT3}
            placeholder='Name der Idee'
          />

          <Text style={styles.h1}>Beschreibung</Text>
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
              //adding placeholder images
              newIdea.addImageURL([`http://placeimg.com/${Math.round(Math.random() * 600) + 100}/${Math.round(Math.random() * 600) + 100}?random=${Math.round(Math.random() * 10000)}`]);
              setReload(true);
            }}>
              <Ionicons name="ios-add" size={60} color={Color.FONT1} style={{ height: 62, width: 58}} />
            </TouchableOpacity>
            <Text style={styles.addImageText}>Bilder hinzufügen</Text>
          </View>
        </ScrollView>
      </View>

      {/* Navigation Buttons */}
      <BottomNavigation
        navigation={navigation}
        buttonLeft={false} 
        buttonTextLeft=''
        buttonFunctionLeft={() => null}
        buttonTextRight='Weiter'
        buttonFunctionRight={() => navigation.navigate('CreateIdeaFrontend')}
      />
      
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
  }
})

export default CreateIdea;


// {/* Navigation Buttons */}
// <View style={[styles.navigationbackground, {justifyContent: 'flex-end'}]}>
// {/* next */}
// <TouchableOpacity 
//   style={styles.button}
//   onPress={() => navigation.navigate('CreateIdeaFrontend')}
// >
//   <Text style={{ color: Color.FONT1 }}>Weiter</Text>
// </TouchableOpacity>
// </View>