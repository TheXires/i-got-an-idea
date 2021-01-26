import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../customTypes/colors';
import {FontAwesome5} from '@expo/vector-icons';
import {IdeaFactory} from '../customTypes/ideaFactory';
import {ideaCreationContext} from '../contexts/ideaCreationContext';
import Radiobuttons from '../components/Radiobuttons';
import {Tag} from '../customTypes/tags';

const CreateIdeaBackend = ({navigation}: {navigation: any}) => {
  const {newIdea}: {newIdea: IdeaFactory} = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, true]);

  useEffect(() => {
    newIdea !== undefined && newIdea.getTags()!.includes(Tag.BACKEND) && setSelected([true, false, false])
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FontAwesome5 name="server" size={120} color={Color.FONT2} />
        <Text style={styles.textParagraph}>
          Wird zur Umsetzung der Idee ein Server benötigt?

          Dies ist z.B. der Fall, wenn mindestens einer der Folgenden Punke erfüllt wird:
        </Text>
        <Text style={styles.textParagraph}>
          - Kommunikation zwischen mehreren Geräten
        </Text>
        <Text style={styles.textParagraph}>
          - Geräteübergreifende Datenspeicherung
        </Text>
        <Text style={styles.textParagraph}>
          - Datensynchronisation
        </Text>
        <Text style={styles.textParagraph}>
          - Kooperatives Zusammenarbeiten
        </Text>
        <Text style={styles.textParagraph}>
          - Verarbeitung von Daten aus mehreren Quellen
        </Text>

        {/* Row with radiobuttons */}
        <Radiobuttons selected={selected} setSelected={setSelected} />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationbackground}>
        {/* previous */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={{color: Color.FONT1}}>Zur&uuml;ck</Text>
        </TouchableOpacity>

        {/* next */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // adds or delets the current tag 
            selected[0] ? newIdea.addTags([Tag.BACKEND]) : newIdea.tags(newIdea.getTags()!.filter((tag) => tag !== Tag.BACKEND))
            navigation.navigate('CreateIdeaData');
          }}
        >
          <Text style={{color: Color.FONT1}}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
  navigationbackground: {
    width: '100%',
    height: '10%',
    backgroundColor: Color.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Color.ACCENT,
    borderRadius: 50,
  },
  textParagraph: {
    color: Color.FONT3,
    textAlign: 'left',
    width: '100%'
  }
})

export default CreateIdeaBackend