import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BottomNavigation from '../components/BottomNavigation';
import CustomImage from '../components/CustomImage';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { Color } from '../customTypes/colors'
import { IdeaFactory } from '../customTypes/ideaFactory';
import { Tag } from '../customTypes/tags';

const CreateIdeaOverview = ({navigation}: {navigation: any}) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const { completed }: { completed: any } = useContext<any>(ideaCreationContext);

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
          ) : (<></>)}


          {/* shows images the user uploaded to the idea, if there are no images it shows nothing instead */}
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
          {/* Bottom-Spacer */}
          <View style={{marginBottom:'20%'}}></View>
        </ScrollView>
      </View>

      {/* Navigation Buttons */}
      <BottomNavigation 
        navigation={navigation}
        buttonLeft={true}
        buttonTextLeft='Zur&uuml;ck'
        buttonFunctionLeft={() => navigation.goBack()}
        buttonTextRight='Idee erstellen'
        buttonFunctionRight={() => {
          completed();
          navigation.navigate('Main');
        }}
      />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 15,
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
  },
  tag: {
    marginRight: 20,
    paddingVertical: '8%',
    overflow: 'hidden',
    color: Color.ACCENT
  }
})

export default CreateIdeaOverview