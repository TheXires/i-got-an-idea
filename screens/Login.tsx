import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Footer from '../components/Footer';


import login_img from '../assets/login_img.jpg';
import {Color} from '../customTypes/colors';
import Loginbutton from '../components/Loginbuttont';

function login({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={login_img} style={styles.image}>

        {/* Logo of the app */}
        <Text style={styles.logo}>i{'\n'}
        got{'\n'}
        an{'\n'}
        idea{'\n'}
        </Text>
        <View style={styles.buttons}>

          {/* loginbuttons of diverent prviders can be added here */}
          <Loginbutton />
        </View>

        {/* Footercomponent */}
        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Color.BACKGROUND,
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'flex-end'
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 50
  },
  logo: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.FONT1,
    marginBottom: 90
  }
});

export default login;
