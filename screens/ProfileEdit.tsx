import React, { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../customTypes/colors';
import { ProfileData } from '../customTypes/profileData';
import { getProfilePictureURL, getUID } from '../services/auth';
import { getProfileData } from '../services/database';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

const ProfileEdit = ({ navigation }: { navigation: any }) => {
  const [databaseUser, databaseLoading, databaseError] = useDocumentData<ProfileData>(getProfileData(getUID()));
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(firebase.auth());
  const [newUser, setNewUser] = useState<ProfileData>({
    profilePictureURL: '',
    name: '',
    description: '',
    skills: [],
    blockedUsers: [],
    id: 'string',
    ideaChatsPinned: []
  });
  
  useEffect(() => {
    // Welchen Fehler gibt es, wenn der Nutzer nicht existiert? Und was sind andere Fehler?
    // TODO: noch genauer gucken wann der nutzer noch nicht existiert und
    //       dann auch verhindern, dass der Nuter wieder auf diese Seite zurück kann, wenn er sie einmal verlassen hat 
    !databaseLoading && databaseError && /* userError == 'nutzer existiert nicht' && navigation.navigate('Main') && */ alert(databaseError)
  }, [databaseLoading])



  useEffect(() => {
    if(!firebaseLoading){
      firebaseUser?.uid != undefined && (newUser.id = firebaseUser?.uid);
      firebaseUser?.photoURL != undefined && (newUser.profilePictureURL = (firebaseUser!.photoURL?.substring(0, firebaseUser!.photoURL?.lastIndexOf('=')))?.concat('?sz=150'));
      firebaseUser?.displayName != undefined && (newUser.id = firebaseUser?.displayName);
    }
  }, [firebaseLoading])

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={{fontSize:18, color: Color.FONT1, fontWeight: 'bold', marginHorizontal: 15}}>
            Profil 
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            
          }}>
            <Text style={{fontSize:12, color: Color.FONT2, fontWeight: 'bold', marginHorizontal: 15}}>
              &Uuml;berspringen &gt;
            </Text>
          </TouchableOpacity>
        </View>


        {/* Body */}
        <View>
          {newUser?.profilePictureURL && newUser.profilePictureURL !== '' ? (
            <Image source={{uri: newUser.profilePictureURL}} style={styles.profileimage} />
          ) : (
            <Image source={profileplaceolder} style={styles.profileimage} />
          )}
          <Text style={styles.name}>{newUser?.name} Test</Text>

          {/* TODO: Prüfung hinzufügen, dass eine valide Beschreibung hinzugefügt wurde (z.B. min 5 Wörter) */}
          <Text style={styles.h1}>Beschreibung</Text>
          <TextInput
            multiline={true}
            style={[{ height: 250, textAlignVertical: "top"}]}
            onChangeText={text => newUser.description = text.trim()}
            placeholderTextColor={Color.FONT3}
            placeholder='Erz&auml;hle etwas &uuml;ber dich...'
          />

        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={[styles.navigationbackground, {justifyContent: 'flex-end'}]}>
        {/* next */}
        <TouchableOpacity 
          style={[styles.button]} 
        >
          <Text style={{ color: Color.FONT1 }}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  h1: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: Color.FONT1
  },
  profileimage: {
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 100
  },
  name: {
    color: Color.ACCENT,
    fontSize: 21,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    marginBottom: 20,
    padding: 10,
    height: 40,
    borderColor: Color.BACKGROUND3,
    borderWidth: 1,
    borderRadius: 20,
    color: Color.FONT2
  },



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

export default ProfileEdit;