import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { ideaCreationContext} from '../contexts/ideaCreationContext';
import Radiobuttons from '../components/Radiobuttons';
import { Tag } from '../customTypes/tags';
import BottomNavigation from '../components/BottomNavigation';

const CreateIdeaBackend = ({navigation}: {navigation: any}) => {
  const {newIdea}: {newIdea: IdeaFactory} = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()!.includes(Tag.BACKEND) && setSelected([true, false, false])
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FontAwesome5 name="server" size={120} color={Color.FONT2} style={{marginBottom: 50}} />
        <Text style={{color: Color.FONT3}}>
          Wird zur Umsetzung der Idee ein Server ben&ouml;tigt? Dies ist z.B. der Fall, wenn mindestens einer der Folgenden Punke erf&uuml;llt wird.{"\n"}
          {"\n"}          
          &#x2022; Kommunikation zwischen mehreren Ger&auml;ten{"\n"}
          &#x2022; Ger&auml;te&uuml;bergreifende Datenspeicherung{"\n"}
          &#x2022; Datensynchronisation{"\n"}
          &#x2022; Kooperatives Zusammenarbeiten{"\n"}
          &#x2022; Verarbeitung von Daten aus mehreren Quellen{"\n"}
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
    height: '100%',
    marginTop: '10%',
    alignItems: 'center',
    padding: 15
  },
  textParagraph: {
    color: Color.FONT3,
    width: '100%'
  }
});

export default CreateIdeaBackend;
