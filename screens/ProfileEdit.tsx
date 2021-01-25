import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Color } from '../customTypes/colors';
import { ProfileData } from '../customTypes/profileData';
import { createProfileData } from '../services/database';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import update from 'immutability-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileEdit = ({ navigation }: { navigation: any }) => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(firebase.auth());
  const [newUser, setNewUser] = useState<ProfileData>({
    profilePictureURL: '',
    name: '',
    description: '',
    skills: [],
    blockedUsers: [],
    id: '',
    ideaChatsPinned: []
  });
  const [userSkill, setUserSkill] = useState('');

  useEffect(() => {
    if(!firebaseLoading){
      firebaseUser?.uid != undefined && (newUser.id = firebaseUser?.uid);
      firebaseUser?.photoURL != undefined && firebaseUser .photoURL !== '' && firebaseUser.photoURL.includes('=') && (newUser.profilePictureURL = (firebaseUser!.photoURL?.substring(0, firebaseUser!.photoURL?.lastIndexOf('=')))?.concat('?sz=150'));
      firebaseUser?.displayName != undefined && (newUser.name = firebaseUser?.displayName);
    }
  }, [firebaseLoading]);

  useEffect(() => {
    if(firebaseError != undefined){
      alert('Bei der Verbindung zu Server ist eine Fehler aufgetreten!');
    }
  }, [firebaseError]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        
        {/* Header */}
        <View style={styles.header}>
          {/* Headertitle */}
          <Text style={{fontSize:18, color: Color.FONT1, fontWeight: 'bold', marginHorizontal: 15}}>
            Profil 
          </Text>
          {/* Header Skip-Button */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            newUser.id != '' ? (
              createProfileData(newUser),
              AsyncStorage.setItem('firstLogin', 'false'),
              navigation.navigate('Main')
            ) : (
              navigation.navigate('Main')
            )
          }}>
            <Text style={{fontSize:12, color: Color.FONT2, fontWeight: 'bold', marginHorizontal: 15}}>
              &Uuml;berspringen &gt;
            </Text>
          </TouchableOpacity>
        </View>


        {/* Body */}
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.user}>
              {newUser?.profilePictureURL && newUser.profilePictureURL !== '' ? (
                <Image source={{uri: newUser.profilePictureURL}} style={[styles.profileimage, {marginTop: 15}]} />
              ) : (
                <Image source={profileplaceolder} style={[styles.profileimage, {marginTop: 0}]} />
              )}
              <Text style={styles.name}>{newUser?.name}</Text>
            </View>


            {/* TODO: Prüfung hinzufügen, dass eine valide Beschreibung hinzugefügt wurde (z.B. min 5 Wörter) */}
            <Text style={styles.h1}>Beschreibung</Text>
            <TextInput
              multiline={true}
              style={[styles.textInput, {height: 150, textAlignVertical: "top", marginBottom: 30}]}
              onChangeText={text => newUser.description = text.trim()}
              placeholderTextColor={Color.FONT3}
              placeholder='Erz&auml;hle etwas &uuml;ber dich...'
            />

            {/* TODO: Prüfung hinzufügen, dass valide Tags hinzugefügt wurden (z.B. min 3 Zeichen) */}
            <Text style={styles.h1}>Skill</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.textInput, {marginRight: 0, width: '85%'}]}
                onChangeText={text => setUserSkill(text.trim())}
                placeholderTextColor={Color.FONT3}
                placeholder='Erz&auml;hle etwas &uuml;ber dich...'
              />
              <TouchableOpacity activeOpacity={.7} style={{marginRight: 0, marginLeft: 'auto'}} onPress={() => {                
                setNewUser(update(newUser, {skills: {$push: [userSkill]}}));
              }}>
                <Ionicons name="ios-add-circle" size={48} color={Color.FONT2} />
              </TouchableOpacity>
            </View>
            {newUser.skills.length > 0 ? (
              <>
                {newUser.skills.map((skill) => { return(
                  <View style={styles.tagcontainer} key={skill}>
                    <Text style={styles.tag} key={skill}>&#x2022; {skill}</Text>
                  </View>
                )})}
              </>
            ) : (<></>)}
          </View>
          {/* Bottom-Spacer */}
          <View style={{marginBottom:'20%'}}></View>
        </ScrollView>
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
    width: '100%',
    flex: 1,
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
    width: '100%',
    padding: 15,
  },
  user: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  h1: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: Color.FONT1
  },
  profileimage: {
    marginBottom: 10,
    width: 150,
    height: 150,
    borderRadius: 100
  },
  name: {
    color: Color.ACCENT,
    fontSize: 21,
    fontWeight: 'bold'
  },
  textInput: {
    padding: 10,
    height: 40,
    borderColor: Color.BACKGROUND3,
    borderWidth: 1,
    borderRadius: 20,
    color: Color.FONT2
  },
  tagcontainer: {

  },
  tag: {
    padding: 5,
    marginLeft: 10,
    fontSize: 15,
    color: Color.ACCENT
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