import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { IdeaFactory } from '../customTypes/ideaFactory';
import {ideaCreationContext} from '../contexts/ideaCreationContext';
import Radiobuttons from '../components/Radiobuttons';
import { Tag } from '../customTypes/tags';

const CreateIdeaBackend = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()!.includes(Tag.BACKEND) && setSelected([true, false, false])
  }, []);
  
  return (
    <View style={styles.container}>
      {/* TODO: Fortschrittsanzeige noch hinzufügen */}
      <FontAwesome5 name="server" size={120} color={Color.FONT2} style={{ marginBottom: 50, marginTop: 150}} />
      <Text style={{ color: Color.FONT3 }}>
        Hier muss noch der richtige Text eingef&uuml;gt werden ...
      </Text>


      {/* Row with radiobuttons */}
      <Radiobuttons selected={selected} setSelected={setSelected} />

      {/* Navigation Buttons */}
      {/* next */}
      <TouchableOpacity 
        style={[styles.button, styles.next]} 
        onPress={() => {
          selected[0] ? newIdea.addTags([Tag.BACKEND]) : newIdea.tags(newIdea.getTags()!.filter((tag) => tag !== Tag.BACKEND))
          navigation.navigate('CreateIdeaData');
        }}
      >
        <Text style={{ color: Color.FONT1 }}>Weiter</Text>
      </TouchableOpacity>

      {/* previous */}
      <TouchableOpacity style={[styles.button, styles.previous]} onPress={() => navigation.goBack()}>
        <Text style={{ color: Color.FONT1 }}>Zur&uuml;ck</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 57,
    padding: 15
  },
  selectionContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '8%',
    backgroundColor: Color.ACCENT,
    borderRadius: 50,
  },
  next: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  previous: {
    position: 'absolute',
    bottom: 25,
    left: 25,
  }
})

export default CreateIdeaBackend