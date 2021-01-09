import React, { useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import CustomImage from '../components/CustomImage';
import User from '../components/User';
import { Color } from '../customTypes/colors';
import { Tag } from '../customTypes/tags';
import { IdeaContext } from '../contexts/ideaContext';

// implements the detail view for an idea sreached by a given id
const Ideadetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const context = useContext<any>(IdeaContext);

  // TODO: Muss noch durch context ersetzt werden
  //*********************************************
  /* */const [idea, setIdea] = useState({
  /* */  name: 'App zum Teilen von Ideen',
  /* */  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus corporis nisi sapiente assumenda error vitae labore. Amet, ipsa autem molestias libero reprehenderit, culpa similique quaerat eum eligendi tenetur tempore. Fuga provident facere illo laborum unde nemo, itaque quis harum asperiores sit animi fugiat ut id praesentium placeat a labore consectetur nesciunt in cum eveniet magnam. Sit illo molestiae pariatur velit! Porro facilis cum officiis iusto error consequuntur magnam! Aliquid culpa fugit velit quod unde amet eveniet, sit deleniti quidem ullam omnis libero molestiae nobis reprehenderit dicta distinctio illum ratione laborum enim architecto nisi tempora asperiores perferendis. Iure culpa impedit animi hic, nobis perferendis! Nobis aliquid consequuntur ipsam? Obcaecati, eaque?',
  /* */  tags: [1, 2, 3, 4, 5],
  /* */  images: [
  /* */    'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
  /* */    'https://cdn1.sklum.com/de/791807/stuhl-arhiza-supreme.jpg',
  /* */    'https://blog.swissflex.com/wp-content/uploads/2018/02/Die-5-h%C3%B6chsten-Berge-der-Schweiz.png'
  /* */],
  /* */  authorID: 'authorID',
  /* */  id: 'ideaID'
    /* */
});

  if (context !== undefined) {
    return <View><Text>Loading...</Text></View>
  } else {
    // context.ideas.find(idea => {})
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        {/* name of the idea as heading */}
        <Text style={styles.h1}>{route.params.id}</Text>

        {/* description of the idea */}
        <Text style={styles.description}>{idea.description}</Text>

        {/* shows tags the added to the idea, if there are no tags it shows nothing instead */}
        {idea.tags.length > 0 ? (
          <>
            <Text style={styles.h2}>Tags</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <View style={styles.tagContainer}>
                {idea.tags.map((tag) => { return (<Text style={styles.tag} key={Tag[tag]}>#{Tag[tag]}</Text>) })}
              </View>
            </ScrollView>
          </>
        ) : (
            <>
            </>
          )}


        {/* shows images the user uploaded to the idea, if there are no images it shows nothing instead */}
        {/* TODO: Bilder in grpß anzeigen, wenn drauf geklickt wird */}
        {idea.images.length > 0 ? (
          <>
            <Text style={styles.h2}>Bilder</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {idea.images.map((image) => { return (<CustomImage source={{ uri: image }} imgSize={200} key={image} />) })}
            </ScrollView>
          </>
        ) : (
            <></>
          )
        }

        {/* Author */}
        <Text style={styles.h2}>Erstellt durch</Text>
        <User userID={idea.authorID} navigation={navigation} />
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
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT1
  },
  h2: {
    marginTop: 25,
    marginBottom: 5,
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