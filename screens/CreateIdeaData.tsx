import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { FontAwesome } from '@expo/vector-icons';
import Radiobuttons from '../components/Radiobuttons';
import { Tag } from '../customTypes/tags';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import BottomNavigation from '../components/BottomNavigation';

const CreateIdeaData = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()!.includes(Tag.DATAMANAGAMENT) && setSelected([true, false, false])
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FontAwesome name="table" size={120} color={Color.FONT2} style={{ marginBottom: 50 }} />
        <Text style={{ color: Color.FONT3 }}>
          Wird zur Umsetzung der Idee die Speicherung, Sortierung oder Aufarbeitung von Daten ben&ouml;tigt?
        </Text>
        
        {/* Row with radiobuttons */}
        <Radiobuttons selected={selected} setSelected={setSelected} />
      </View>

      {/* Navigation Buttons */}
      <BottomNavigation 
        navigation={navigation}
        buttonLeft={true}
        buttonTextLeft='Zur&uuml;ck'
        buttonFunctionLeft={() => navigation.goBack()}
        buttonTextRight='Weiter'
        buttonFunctionRight={() => {
          // adds or delets the current tag 
          selected[0] ? newIdea.addTags([Tag.DATAMANAGAMENT]) : newIdea.tags(newIdea.getTags()!.filter(tag => tag !== Tag.DATAMANAGAMENT))
          navigation.navigate('CreateIdeaPlatforms');
        }}
      />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
    alignItems: 'center',
    padding: 15
  }
})

export default CreateIdeaData