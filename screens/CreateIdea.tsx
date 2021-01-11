import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../customTypes/colors';

const CreateIdea = ({navigation}: {navigation: any}) => {
  
  
  return (
    <View style={styles.containter}>
      <Text style={styles.h1}>Name der Idee</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  containter: {
    width: '100%',
    flex: 1,
    padding: 15
  },
  h1: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: Color.FONT1
  },
})

export default CreateIdea;