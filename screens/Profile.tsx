import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../customTypes/colors';

const Profile = () => {
  // const [profile, loading, error] = useDocumentData<ProfileData>(getProfileData(getUID()));
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.FONT
  }
});

export default Profile;