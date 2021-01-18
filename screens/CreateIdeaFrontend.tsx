import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import Radiobuttons from '../components/Radiobuttons';
import { Tag } from '../customTypes/tags';

const CreateIdeaFrontend = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()?.includes(Tag.FRONTEND) && setSelected([true, false, false])
  }, []);


  return (
    <>
      <View style={styles.container}>
        {/* TODO: Fortschrittsanzeige noch hinzufügen */}
        <MaterialCommunityIcons name="monitor-clean" size={120} color={Color.FONT2} style={{ marginBottom: 50, marginTop: 150}} />
        <Text style={{ color: Color.FONT3 }}>
          Hier muss noch der richtige Text eingef&uuml;gt werden ...
        </Text>

        {/* Row with radiobuttons */}
        <Radiobuttons selected={selected} setSelected={setSelected} />
      </View>

      

      {/* Navigation Buttons */}
      <View style={styles.navigationbackground}>
        {/* previous */}
        <TouchableOpacity style={[styles.button, styles.previous]} onPress={() => navigation.goBack()}>
          <Text style={{ color: Color.FONT1 }}>Zur&uuml;ck</Text>
        </TouchableOpacity>
        
        {/* next */}
        <TouchableOpacity 
          style={[styles.button, styles.next]} 
          onPress={() => {
            // adds or delets the current tag 
            selected[0] ? newIdea.addTags([Tag.FRONTEND]) : newIdea.tags(newIdea.getTags()!.filter((tag) => tag !== Tag.FRONTEND));
            navigation.navigate('CreateIdeaBackend');
          }}
        >
          <Text style={{ color: Color.FONT1 }}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </>
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
  navigationbackground: {
    width: '100%',
    height: '10%',
    backgroundColor: Color.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
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
    position: 'relative',
    marginRight: 15,
  },
  previous: {
    position: 'relative',
    marginLeft: 15,
    marginRight: 'auto',
  },
})

export default CreateIdeaFrontend;
