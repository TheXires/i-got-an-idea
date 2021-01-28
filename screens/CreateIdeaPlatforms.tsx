import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ideaCreationContext } from '../contexts/ideaCreationContext';
import { Color } from '../customTypes/colors';
import { IdeaFactory } from '../customTypes/ideaFactory';
import Checkbox from '../components/Checkbox';
import BottomNavigation from '../components/BottomNavigation';

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
      <BottomNavigation 
        navigation={navigation}
        buttonLeft={true}
        buttonTextLeft='Zur&uuml;ck'
        buttonFunctionLeft={() => navigation.goBack()}
        buttonTextRight='Weiter'
        buttonFunctionRight={() => {
          // adds or delets the current tag
          let i: number = 3;
          selected.forEach(tag => {
            tag ? newIdea.addTags([i]) : newIdea.tags(newIdea.getTags()!.filter(tag => tag !== i))
            i++;
          });
          navigation.navigate('CreateIdeaOverview');
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
  },
  h2: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT2,
    width: '100%'
  },
  selectionContainer: {
    marginBottom: '10%',
    width: '100%',
    alignItems: 'baseline',
  }
})

export default CreateIdeaPlatforms