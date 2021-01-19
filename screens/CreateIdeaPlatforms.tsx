import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { Color } from '../customTypes/colors';
import { IdeaFactory } from '../customTypes/ideaFactory';
import Checkbox from '../components/Checkbox';

const CreateIdeaPlatforms = ({navigation}: {navigation: any}) => {
  const { newIdea }: { newIdea: IdeaFactory } = useContext<any>(ideaCreationContext);
  const [selected, setSelected] = useState([false, false, false, false, false, false, false, false, false, false]);

  useEffect(() => {
    let arr = selected.slice();
    newIdea.getTags()!.filter(tag => tag > 2).map(tag => tag-3).forEach(tag => arr[tag] = true);
    setSelected(arr);    
  }, [])

  return (
    <>
      <View style={styles.container}>
        {/* TODO: Fortschrittsanzeige noch hinzufügen */}
        <Text style={{ color: Color.FONT3, marginBottom: 10 }}>
          Bitte w&auml;hle die Plattformen aus, f&uuml;r die die Idee umgesetzt werden soll.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>
            <Text style={styles.h2}>Mobil</Text>
            <Checkbox selected={selected} setSelected={setSelected} current={0} name={'iOS'} />
            <Checkbox selected={selected} setSelected={setSelected} current={1} name={'Android'} />
            <Checkbox selected={selected} setSelected={setSelected} current={2} name={'HarmonyOS'} />
            
            <Text style={styles.h2}>Allgemein</Text>
            <Checkbox selected={selected} setSelected={setSelected} current={3} name={'Webseite'} />
            
            <Text style={styles.h2}>Desktop</Text>
            <Checkbox selected={selected} setSelected={setSelected} current={4} name={'Windows'} />
            <Checkbox selected={selected} setSelected={setSelected} current={5} name={'MacOS'} />
            <Checkbox selected={selected} setSelected={setSelected} current={6} name={'ChromeOS'} />
            <Checkbox selected={selected} setSelected={setSelected} current={7} name={'Linux'} />

            <Text style={styles.h2}>Sonstiges</Text>
            <Checkbox selected={selected} setSelected={setSelected} current={8} name={'Smartwatch'} />
            <Checkbox selected={selected} setSelected={setSelected} current={9} name={'Mikrocontroller'} />
          </View>
        </ScrollView>
      </View>


      {/* Navigation Buttons */}
      <View style={styles.navigationbackground}>
        {/* previous */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={{ color: Color.FONT1 }}>Zur&uuml;ck</Text>
        </TouchableOpacity>
        
        {/* next */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            // adds or delets the current tag
            let i: number = 3;
            selected.forEach(tag => {
              tag ? newIdea.addTags([i]) : newIdea.tags(newIdea.getTags()!.filter(tag => tag !== i))
              i++;
            });
            navigation.navigate('CreateIdeaOverview');
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
  h2: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT2
  },
  selectionContainer: {
    marginBottom: '10%',
    width: '100%',
    alignItems: 'baseline',
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
  }
})

export default CreateIdeaPlatforms