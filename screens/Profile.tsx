import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../customTypes/colors';

const Profile = ({ route, navigation }: { route: any, navigation: any}) => {
  // const [profile, loading, error] = useDocumentData<ProfileData>(getProfileData(getUID()));
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.id}</Text>
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
    color: Color.FONT1
  }
});

export default Profile;