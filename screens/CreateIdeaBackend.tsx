import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const CreateIdeaBackend = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState([false, false, true]);
  const [backendNeeded, setBackendNeeded] = useState(false);
  
  return (
    <View style={styles.container}>
      {/* TODO: Fortschrittsanzeige noch hinzufügen */}
      <FontAwesome5 name="server" size={120} color={Color.FONT2} style={{ marginBottom: 50, marginTop: 150}} />
      <Text style={{ color: Color.FONT3 }}>
        Hier muss noch der richtige Text eingef&uuml;gt werden ...
      </Text>
      {/* TODO: Auswahl mit entsprechender Logik hinzufügen */}


      {/* Row with radiobuttons */}
      <View style={styles.selectionContainer}>

        {/* 
          * yes 
          */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([true, false, false]);
            setBackendNeeded(true);
          }}
        >
          { selected[0] ? (
            <Ionicons name="radio-button-on-sharp" size={24} color={Color.ACCENT} />
          ) : (
            <Ionicons name="radio-button-off-sharp" size={24} color={Color.ACCENT} />
          )}
          <Text style={{color: Color.FONT2}}> Ja</Text>
        </TouchableOpacity>

        {/* 
          * not sure 
          */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([false, true, false]);
            setBackendNeeded(false);
          }}
        >
          {selected[1] ? (
            <Ionicons name="radio-button-on-sharp" size={24} color={Color.ACCENT} />
          ) : (
            <Ionicons name="radio-button-off-sharp" size={24} color={Color.ACCENT} />
          )}
          <Text style={{ color: Color.FONT2 }}> Nicht sicher</Text>
        </TouchableOpacity>

        {/* 
          * no 
          */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([false, false, true]);
            setBackendNeeded(false);
          }}
        >
          {selected[2] ? (
            <Ionicons name="radio-button-on-sharp" size={24} color={Color.ACCENT} />
          ) : (
            <Ionicons name="radio-button-off-sharp" size={24} color={Color.ACCENT} />
          )}
          <Text style={{ color: Color.FONT2 }}> Nein</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, styles.next]} onPress={() => navigation.navigate('CreateIdeaData')}>
        <Text style={{ color: Color.FONT1 }}>Weiter</Text>
      </TouchableOpacity>
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