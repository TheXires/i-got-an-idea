import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import CustomImage from '../components/CustomImage';
import User from '../components/User';
import { Color } from '../customTypes/colors';
import { Tag } from '../customTypes/tags';
import { IdeaContext } from '../contexts/ideaContext';
import { IdeaType } from '../customTypes/ideaType';

// implements the detail view for an idea sreached by a given id
const Ideadetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const { ideas }: { ideas: IdeaType[] } = useContext<any>(IdeaContext);
  const [idea, setIdea] = useState<IdeaType>();

  useEffect(() => {
    if (ideas !== undefined) {
      setIdea(ideas.find((idea) => idea.id === route.params.id));
    }
  }, [ideas])

  if (idea === undefined) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        {/* name of the idea as heading */}
        <Text style={styles.h1}>{idea!.name}</Text>

        {/* description of the idea */}
        <Text style={styles.description}>{idea!.description}</Text>

        {/* shows tags the added to the idea, if there are no tags it shows nothing instead */}
        {idea!.tags.length > 0 ? (
          <>
            <Text style={styles.h2}>Tags</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <View style={styles.tagContainer}>
                {idea!.tags.map((tag) => { return (<Text style={styles.tag} key={Tag[tag]}>#{Tag[tag]}</Text>) })}
              </View>
            </ScrollView>
          </>
        ) : (
            <>
            </>
          )}


        {/* shows images the user uploaded to the idea, if there are no images it shows nothing instead */}
        {/* TODO: Bilder in groß anzeigen, wenn drauf geklickt wird */}
        {idea!.imageURLs.length > 0 ? (
          <>
            <Text style={styles.h2}>Bilder</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {idea!.imageURLs.map((image) => { return (<CustomImage source={{ uri: image }} imgSize={200} key={image} />) })}
            </ScrollView>
          </>
        ) : (
            <></>
          )
        }

        {/* Author */}
        <Text style={styles.h2}>Idee von</Text>
        <User userID={idea!.authorID} navigation={navigation} />
      </ScrollView>
    </View>
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
  }
});

export default Ideadetails;