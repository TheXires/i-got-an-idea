import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Color } from '../customTypes/colors';
import ideaplaceholder from '../assets/ideaplaceholder.jpg';
import { Tag } from '../customTypes/tags';
import { IdeaType as IdeaTyp } from '../customTypes/ideaType';

const Idea = ({
  navigation,
  idea
}: {
  navigation: any,
    idea: IdeaTyp
}) => {

  // TouchableOpacitys are around the Image as well as the name and description, but not around
  // the tags. So that the user can scroll throught the tags without accidently clicking on the Idea.
  return (
    <View style={styles.container}>
      {/* shows the first image if at least one image is available otherwise it shows a placeholderimage */}
      <TouchableOpacity onPress={() => navigation.navigate('Ideadetails', { id: idea.name })} activeOpacity={1}>
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

        {/* tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tagContainer}>
            {idea.tags.map((tag) => { return (<Text style={styles.tag} key={Tag[tag]}># {Tag[tag]}</Text>) })}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
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