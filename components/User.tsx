import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Color } from '../customTypes/colors';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getProfileData } from '../services/database';
import { ProfileData } from '../customTypes/profileData';

const User = ({ navigation, userID }: { navigation: any, userID: string }) => {
  const [user, loading, error] = useDocumentData<ProfileData>(getProfileData(userID));

  // const [user, setUser] = useState({
  //   profilePictureURL: 'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
  //   name: 'Peter Lustig',
  //   description: 'ich bin der Lustigste Peter der Welt',
  //   skills: ['krativ sein', 'HTML', 'CSS'],
  //   blockedUsers: ['dfg556df4g65adfgdgf1fdg15s89WEQR48', 'df5588ofre52f4g65adfgdgf1fdg15s89WEQR48'],
  //   id: 'df44e7e65safdg6Q9+9S+FDA45A64GA',
  // })

  if (error) {
    return <Text style={styles.error}>{error}</Text>
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile', { id: userID })}>
      <View style={styles.container}>
        {(loading === false && user !== undefined) ? (
          <>
            <Image source={{ uri: user.profilePictureURL }} style={styles.profileimage} />
            <Text style={styles.name}>{user.name}</Text>
          </>
        ) : (
            <>
              {/* TODO: spinner einfügen */}
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

