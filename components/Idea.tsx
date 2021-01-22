import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Color } from '../customTypes/colors';
import ideaplaceholder from '../assets/ideaplaceholder.jpg';
import { Tag } from '../customTypes/tags';
import { IdeaType } from '../customTypes/ideaType';
import { FlatList } from 'react-native-gesture-handler';

const Idea = ({ navigation, idea }: { navigation: any, idea: IdeaType }) => {

  // TouchableOpacitys are around the Image as well as the name and description, but not around
  // the tags. So that the user can scroll throught the tags without accidently clicking on the Idea.
  return (
    <View style={styles.container}>
      {/* shows the first image if at least one image is available otherwise it shows a placeholderimage */}
      <TouchableOpacity onPress={() => navigation.navigate('Ideadetails', { id: idea.id })} activeOpacity={1}>
        {idea.imageURLs.length > 0 ? (<Image source={{ uri: idea.imageURLs[0] }} style={styles.image} />) : (<Image source={ideaplaceholder} style={styles.image} />)}
      </TouchableOpacity>

      {/* showas title, description and tags */}
      <View style={styles.innerBody}>
        <TouchableOpacity onPress={() => navigation.navigate('Ideadetails', { id: idea.id })} activeOpacity={1}>
          {/* ideaname */}
          <Text style={styles.name}>{idea.name}</Text>

          {/* ideadescription */}
          <Text numberOfLines={4} style={styles.description}>{idea.description}</Text>
        </TouchableOpacity>

        <View style={styles.tagContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            data={idea.tags}
            keyExtractor={tag => Tag[tag]}
            renderItem={tag => (
              <Text style={styles.tag}>#{Tag[tag.item]}</Text>
            )}
          />
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
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
    color: Color.FONT1,
    fontWeight: 'bold'
  },
  description: {
    paddingRight: 110,
    color: Color.FONT3,
  },
  tagContainer: {
    marginRight: 100,
    marginTop: 'auto',
    marginBottom: 10,
    marginVertical: 5,
  },
  tag: {
    marginRight: 20,
    paddingVertical: '8%',
    color: Color.FONT2
  },
  image: {
    width: 100,
    height: 150,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  }
});

export default Idea;