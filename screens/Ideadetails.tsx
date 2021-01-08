import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import CustomImage from '../components/CustomImage';
import User from '../components/User';
import { Color } from '../customTypes/colors';

// implements the detail view for an idea sreached by a given id
const Ideadetails = ({ navigation, route }: { navigation: any, route: any}) => {
  

  const [idea, setIdea] = useState({
    name: 'Name der Idee',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus corporis nisi sapiente assumenda error vitae labore. Amet, ipsa autem molestias libero reprehenderit, culpa similique quaerat eum eligendi tenetur tempore. Fuga provident facere illo laborum unde nemo, itaque quis harum asperiores sit animi fugiat ut id praesentium placeat a labore consectetur nesciunt in cum eveniet magnam. Sit illo molestiae pariatur velit! Porro facilis cum officiis iusto error consequuntur magnam! Aliquid culpa fugit velit quod unde amet eveniet, sit deleniti quidem ullam omnis libero molestiae nobis reprehenderit dicta distinctio illum ratione laborum enim architecto nisi tempora asperiores perferendis. Iure culpa impedit animi hic, nobis perferendis! Nobis aliquid consequuntur ipsam? Obcaecati, eaque?',
    tags: ['Frontend', 'Android', 'Frontend1', 'Fr2ontend', 'F4rontend', 'Frghontend', 'Frghlontend'],
    images: [
      'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
      'https://cdn1.sklum.com/de/791807/stuhl-arhiza-supreme.jpg',
      'https://blog.swissflex.com/wp-content/uploads/2018/02/Die-5-h%C3%B6chsten-Berge-der-Schweiz.png'
    ]
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>{route.params.id}</Text>
      <Text style={styles.description}>{idea.description}</Text>

      <Text style={styles.h2}>Tags</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View style={styles.tagContainer}>
          { idea.tags.map((tag) => {return(<Text style={styles.tag} key={tag}>#{tag}</Text>)}) }
        </View>
      </ScrollView>

      <Text style={styles.h2}>Bilder</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        { idea.images.map((image) => {return(<CustomImage source={{uri: image}} imgSize={200} key={image} />)})}
      </ScrollView>

      <Text style={styles.h2}>Erstellt durch</Text>
      <User userID={'test'} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    padding: 15,
  },
  h1: {
    fontSize: 20,
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
    marginBottom: 10,
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