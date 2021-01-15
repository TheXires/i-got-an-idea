import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../customTypes/colors';

const Radiobuttons = ({selected, setSelected}: {selected: boolean[], setSelected: any}) => {
  // TODO: component noch losgelöster machen, indem einfach die Anzahl der Knöpfe und der name dieser (Array) übergeben wird und dann alles hier mit einer for-schleife erstellt wird
  
  return (
    <View style={styles.selectionContainer}>

        {/* yes */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([true, false, false]);
          }}
        >
          { selected[0] ? (
            <Ionicons name="radio-button-on-sharp" size={24} color={Color.ACCENT} />
          ) : (
            <Ionicons name="radio-button-off-sharp" size={24} color={Color.ACCENT} />
          )}
          <Text style={{color: Color.FONT2}}> Ja</Text>
        </TouchableOpacity>

        {/* not sure */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([false, true, false]);
          }}
        >
          {selected[1] ? (
            <Ionicons name="radio-button-on-sharp" size={24} color={Color.ACCENT} />
          ) : (
            <Ionicons name="radio-button-off-sharp" size={24} color={Color.ACCENT} />
          )}
          <Text style={{ color: Color.FONT2 }}> Nicht sicher</Text>
        </TouchableOpacity>

        {/* no */}
        <TouchableOpacity activeOpacity={.7} style={styles.radioButtons}
          onPress={() => {
            setSelected([false, false, true]);
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
  )
}

const styles = StyleSheet.create({
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
})

export default Radiobuttons;