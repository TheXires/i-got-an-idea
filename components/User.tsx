import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const User = ({userID}: {userID: string}) => {
  

  return (
    <View>
      <Image source={{uri: 'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg'}} />
      <Text>Test</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default User;

