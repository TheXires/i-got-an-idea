import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Color } from '../customTypes/colors';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getProfileData } from '../services/database';
import { ProfileData } from '../customTypes/profileData';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import CustomSpinner from './CustomSpinner';

const User = ({ navigation, userID }: { navigation: any, userID: string }) => {
  const [user, loading, error] = useDocumentData<ProfileData>(getProfileData(userID));

  if (error) {
    return <Text style={styles.error}>{error}</Text>
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile', { id: userID })}>
      <View style={styles.container}>
        {(loading === false && user !== undefined) ? (
          <>
            <Image style={styles.profileimage} source={
              user.profilePictureURL !== '' ? (
                { uri: user.profilePictureURL } 
              ) : ( 
                profileplaceolder
            )}/>
            <Text style={styles.name}>{user.name}</Text>
          </>
        ) : (
            <>
              <CustomSpinner />
            </>
          )}

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  profileimage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.FONT3
  },
  error: {
    color: Color.ERROR
  }
});

export default User;

