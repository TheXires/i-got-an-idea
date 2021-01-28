import React from 'react';
import { ImageBackground, StyleSheet, Image, View} from 'react-native';
import Footer from '../components/Footer';


import login_img from '../assets/login_img.jpg';
import icon from '../assets/icon.png';
import {Color} from '../customTypes/colors';
import Loginbutton from '../components/Loginbuttont';

function login({navigation}: {navigation: any}) {
    return (
      <View style={styles.container}>
        <ImageBackground source={login_img} style={styles.image}>
          
          {/* Logo of the app */}
          <Image style={styles.logo} source={icon} />
          <View style={styles.buttons}>

            {/* loginbuttons of diverent prviders can be added here */}
            <Loginbutton provider={'Google'} />
            {/* TODO: style anpassen */}
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
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 80,
    marginBottom: 'auto'
  }
});

export default login;
