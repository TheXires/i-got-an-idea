import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Color } from '../customTypes/colors';


function Footer({navigation}: {navigation: any}) {
  return (
    <View style={style.container}>
      <View style={style.links}>
        <Text onPress={() => navigation.navigate('Datenschutz')} style={style.text}>Datenschutz</Text>
        <Text onPress={() => navigation.navigate('Agb')} style={style.text}>AGB</Text>
        <Text onPress={() => navigation.navigate('Impressum')} style={style.text}>Impressum</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 0,
    flexDirection: "column",
    textAlign: 'center'
  },
  links: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-around',
  },
  text: {
    color: Color.FONT1,
    textDecorationLine: 'underline'
  }
})

export default Footer
