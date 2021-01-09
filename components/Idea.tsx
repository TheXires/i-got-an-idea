import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Color } from '../customTypes/colors';
import ideaplaceholder from '../assets/ideaplaceholder.jpg';

const Idea = ({ navigation }: { navigation: any }) => {
  const [idea, setIdea] = useState({
    name: 'App zum Teilen von Ideen',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus corporis nisi sapiente assumenda error vitae labore. Amet, ipsa autem molestias libero reprehenderit, culpa similique quaerat eum eligendi tenetur tempore. Fuga provident facere illo laborum unde nemo, itaque quis harum asperiores sit animi fugiat ut id praesentium placeat a labore consectetur nesciunt in cum eveniet magnam. Sit illo molestiae pariatur velit! Porro facilis cum officiis iusto error consequuntur magnam! Aliquid culpa fugit velit quod unde amet eveniet, sit deleniti quidem ullam omnis libero molestiae nobis reprehenderit dicta distinctio illum ratione laborum enim architecto nisi tempora asperiores perferendis. Iure culpa impedit animi hic, nobis perferendis! Nobis aliquid consequuntur ipsam? Obcaecati, eaque?',
    tags: ['Frontend', 'Android'],
    images: [
      'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
      'https://cdn1.sklum.com/de/791807/stuhl-arhiza-supreme.jpg',
      'https://blog.swissflex.com/wp-content/uploads/2018/02/Die-5-h%C3%B6chsten-Berge-der-Schweiz.png'
    ]
  });

  // TouchableOpacitys are around the Image as well as the name and description, but not around
  // the tags. So that the user can scroll throught the tags without accidently clicking on the Idea.
  return (
    <View style={styles.container}>
      {/* shows the first image if at least one image is available otherwise it shows a placeholderimage */}
      <TouchableOpacity onPress={() => navigation.navigate('Ideadetails', { id: idea.name })} activeOpacity={1}>
        {idea.images.length > 0 ? (<Image source={{ uri: idea.images[2] }} style={styles.image} />) : (<Image source={ideaplaceholder} style={styles.image} />)}
      </TouchableOpacity>

      {/* showas title, description and tags */}
      <View style={styles.innerBody}>
        <TouchableOpacity onPress={() => navigation.navigate('Ideadetails', { id: idea.name })} activeOpacity={1}>
          {/* ideaname */}
          <Text style={styles.name}>{idea.name}</Text>

          {/* ideadescription */}
          <Text numberOfLines={4} style={styles.description}>{idea.description}</Text>
        </TouchableOpacity>

        {/* tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tagContainer}>
            {idea.tags.map((tag) => { return (<Text style={styles.tag} key={tag}># {tag}</Text>) })}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: Color.BACKGROUND2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  innerBody: {
    marginLeft: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    color: Color.FONT2,
    fontWeight: 'bold'
  },
  description: {
    paddingRight: 110,
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
  },
  image: {
    width: 100,
    height: 150,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  }
});

export default Idea;