import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Color } from '../customTypes/colors';

const Checkbox = ({selected, setSelected, current, name}: {selected: boolean[], setSelected: any, current: number, name: string}) => {
  return (
    <TouchableOpacity 
      activeOpacity={.7}
      style={styles.checkBox}
      onPress={() => {
        let newArr: boolean[] = selected.slice(); 
        newArr[current] = !newArr[current];
        setSelected(newArr);       
      }}
    >
      {selected[current] ? (
        <AntDesign name="checkcircle" size={24} color={Color.ACCENT} />
        ) : (
        <AntDesign name="checkcircleo" size={24} color={Color.ACCENT} />
      )}
      <Text style={{color: Color.FONT2}}> {name}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
})

export default Checkbox;