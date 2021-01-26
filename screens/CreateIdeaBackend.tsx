import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { ideaCreationContext} from '../contexts/ideaCreationContext';
import Radiobuttons from '../components/Radiobuttons';
import { Tag } from '../customTypes/tags';
import BottomNavigation from '../components/BottomNavigation';

const CreateIdeaBackend = ({ navigation }: { navigation: any }) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  console.log('CreateIdeaBackend: ', newIdea);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()!.includes(Tag.BACKEND) && setSelected([true, false, false])
  }, []);
  
  return (
    <>
      <View style={styles.container}>
        <FontAwesome5 name="server" size={120} color={Color.FONT2} style={{ marginBottom: 50, marginTop: 150}} />
        <Text style={{ color: Color.FONT3 }}>
          {/* TODO: hier muss noch der richtige Text eingefügt werden ... */}
          Hier muss noch der richtige Text eingef&uuml;gt werden ...
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
          selected[0] ? newIdea.addTags([Tag.BACKEND]) : newIdea.tags(newIdea.getTags()!.filter((tag) => tag !== Tag.BACKEND))
          navigation.navigate('CreateIdeaData');
        }}
      />
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
  }
})

export default CreateIdeaBackend