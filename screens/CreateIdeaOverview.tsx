import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomImage from '../components/CustomImage';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { Color } from '../customTypes/colors'
import { IdeaFactory } from '../customTypes/ideaFactory';
import { Tag } from '../customTypes/tags';
import { createIdea } from '../services/database';

const CreateIdeaOverview = ({navigation}: {navigation: any}) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const { setCompleted }: { setCompleted: any } = useContext<any>(ideaCreationContext);

  console.log(newIdea);
  
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.innerContainer}>
          {/* name of the idea as heading */}
          <Text style={styles.h1}>{newIdea.getName()}</Text>

          {/* description of the idea */}
          <Text style={styles.description}>{newIdea.getDescription()}</Text>

          {/* shows tags the added to the idea, if there are no tags it shows nothing instead */}
          {newIdea.getTags() !== undefined && newIdea.getTags()!.length > 0 ? (
            <>
              <Text style={styles.h2}>Tags</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <View style={styles.tagContainer}>
                  {newIdea.getTags()!.map((tag) => { return (<Text style={styles.tag} key={Tag[tag]}>#{Tag[tag]}</Text>) })}
                </View>
              </ScrollView>
            </>
          ) : (
              <>
              </>
            )}


          {/* shows images the user uploaded to the idea, if there are no images it shows nothing instead */}
          {/* TODO: Bilder in groß anzeigen, wenn drauf geklickt wird */}
          {newIdea.getImageURLs() !== undefined && newIdea.getImageURLs()!.length > 0 ? (
            <>
              <Text style={styles.h2}>Bilder</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {newIdea.getImageURLs()!.map((image) => { return (<CustomImage source={{ uri: image }} imgSize={200} key={image} />) })}
              </ScrollView>
            </>
          ) : (
              <></>
            )
          }
        </ScrollView>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationbackground}>
        {/* previous */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={{ color: Color.FONT1 }}>Zur&uuml;ck</Text>
        </TouchableOpacity>
        
        {/* next */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            setCompleted(true);
            navigation.navigate('Settings');
          }}
        >
          <Text style={{ color: Color.FONT1 }}>Idee erstellen</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 15
  },
  h1: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: Color.FONT1
  },
  h2: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT2
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    color: Color.FONT2,
    fontWeight: 'bold'
  },
  description: {
    color: Color.FONT3,
  },
  tagContainer: {
    marginLeft: 0,
    marginRight: 'auto',
    marginTop: 'auto',
    marginVertical: 5,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  tag: {
    marginRight: 20,
    paddingVertical: '8%',
    overflow: 'hidden',
    color: Color.ACCENT
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

export default CreateIdeaOverview