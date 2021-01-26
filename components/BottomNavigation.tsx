import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../customTypes/colors';

const BottomNavigation = ({navigation, buttonLeft, buttonTextRight, buttonTextLeft, buttonFunctionRight, buttonFunctionLeft}: {navigation: any, buttonLeft: boolean, buttonTextRight: string, buttonTextLeft: string, buttonFunctionRight: any, buttonFunctionLeft: any}) => {
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShowing(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShowing(false);
  };
  
  var containerStyle = {};
  !buttonLeft ? containerStyle = {justifyContent: 'flex-end'} : null;

  return (
    <>
      {!keyboardShowing ? (
        /* Navigation Buttons */
        <View style={[styles.navigationbackground, containerStyle]}>
          
          {/* ButtonLeft */}
          {buttonLeft ? (
            <TouchableOpacity 
              style={styles.button}
              onPress={buttonFunctionLeft}
            >
              <Text style={{ color: Color.FONT1 }}>{buttonTextLeft}</Text>
            </TouchableOpacity>
          ) : (<></>)}

          {/* buttonRight */}
          <TouchableOpacity 
            style={styles.button}
            onPress={buttonFunctionRight}
          >
            <Text style={{ color: Color.FONT1 }}>{buttonTextRight}</Text>
          </TouchableOpacity>
        </View>
      ) : (<></>)}
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default BottomNavigation;