import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Color } from '../customTypes/colors';

const Idea = () => {
  const [idea, setIdea] = useState({
    name: 'Name der Idee',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus corporis nisi sapiente assumenda error vitae labore. Amet, ipsa autem molestias libero reprehenderit, culpa similique quaerat eum eligendi tenetur tempore. Fuga provident facere illo laborum unde nemo, itaque quis harum asperiores sit animi fugiat ut id praesentium placeat a labore consectetur nesciunt in cum eveniet magnam. Sit illo molestiae pariatur velit! Porro facilis cum officiis iusto error consequuntur magnam! Aliquid culpa fugit velit quod unde amet eveniet, sit deleniti quidem ullam omnis libero molestiae nobis reprehenderit dicta distinctio illum ratione laborum enim architecto nisi tempora asperiores perferendis. Iure culpa impedit animi hic, nobis perferendis! Nobis aliquid consequuntur ipsam? Obcaecati, eaque?',
    tags: ['Frontend', 'Android'],
    images: [
      'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
      'https://cdn1.sklum.com/de/791807/stuhl-arhiza-supreme.jpg',
      'https://blog.swissflex.com/wp-content/uploads/2018/02/Die-5-h%C3%B6chsten-Berge-der-Schweiz.png'
    ]
  });
  
  return (
    <View style={styles.container}>
      { idea.images  !== null ? (<Image source={{uri: idea.images[0]}} style={styles.image} />) : (<Text></Text>) }
      <View style={styles.innerBody}>
        <Text style={styles.title}>{idea.name}</Text>
        <Text numberOfLines={5} style={styles.description}>{idea.description}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{idea.tags[0]}</Text>
          <Text style={styles.tag}>{idea.tags[1]}</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: Color.PRIMARY,
    color: Color.FONT,
    borderRadius: 20
  },
  innerBody: {
    marginLeft: 5,
    marginRight: 15
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    paddingRight: 110
  },
  tagContainer: {
    marginLeft: 0,
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 10,
    marginVertical: 5,
    flexDirection: 'row'
  },
  tag: {
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 11,
    paddingHorizontal: '2%'
  },
  image: {
    width: 100,
    height: 150,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  }
});

export default Idea;