import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Color } from '../customTypes/colors';
import { ProfileData } from '../customTypes/profileData';
import { createProfileData, getProfileData } from '../services/database';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import { Ionicons } from '@expo/vector-icons';

import update from 'immutability-helper';
import BottomNavigation from '../components/BottomNavigation';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { getUID } from '../services/auth';
import CustomSpinner from '../components/CustomSpinner';

const ProfileEdit = ({ navigation }: { navigation: any }) => {
  const [firebaseUser, firebaseLoading, firebaseError] = useDocumentDataOnce<ProfileData>(getProfileData(getUID()));
  const [user, setUser] = useState<ProfileData>({
    profilePictureURL: '',
    name: '',
    description: '',
    skills: [],
    blockedUsers: [],
    id: '-1',
    ideaChatsPinned: []
  });
  const [userDecription, setUserDecription] = useState('')
  const [userSkill, setUserSkill] = useState('');


  useEffect(() => {
    
    if(firebaseUser != undefined){
      setUser(firebaseUser);
      setUserDecription(firebaseUser.description);
    }
  }, [firebaseLoading]);

  useEffect(() => {
    if(firebaseError != undefined){
      alert('Bei der Verbindung zu Server ist eine Fehler aufgetreten!');
    }
  }, [firebaseError]);


  if(user.id === '-1'){
    return <CustomSpinner />
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        
        {/* Body */}
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.user}>
              {user?.profilePictureURL && user.profilePictureURL !== '' ? (
                <Image source={{uri: user.profilePictureURL}} style={[styles.profileimage, {marginTop: 15}]} />
              ) : (
                <Image source={profileplaceolder} style={[styles.profileimage, {marginTop: 0}]} />
              )}
              <Text style={styles.name}>{user?.name}</Text>
            </View>

            <Text style={styles.h1}>Beschreibung</Text>
            <TextInput
              multiline={true}
              style={[styles.textInput, {height: 150, textAlignVertical: "top", marginBottom: 30}]}
              onChangeText={text => setUserDecription(text)}
              value={userDecription}
              placeholderTextColor={Color.FONT3}
              placeholder='Erz&auml;hle etwas &uuml;ber dich...'
            />

            <Text style={styles.h1}>Skill</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.textInput, {marginRight: 0, width: '85%'}]}
                onChangeText={text => setUserSkill(text.trim())}
                value={userSkill}
                onSubmitEditing={() => {
                  userSkill !== '' && setUser(update(user, {skills: {$push: [userSkill]}}));
                  setUserSkill('');
                }}
                placeholderTextColor={Color.FONT3}
                placeholder='Ich kann...'
              />
              <TouchableOpacity activeOpacity={.7} style={{marginRight: 0, marginLeft: 'auto'}} onPress={() => {                
                userSkill !== '' && setUser(update(user, {skills: {$push: [userSkill]}}));
                setUserSkill('');
              }}>
                <Ionicons name="ios-add-circle" size={48} color={Color.FONT2} />
              </TouchableOpacity>
            </View>
            {user.skills.length > 0 ? (
              <>
                {user.skills.map((skill, i) => { return(
                  <View style={styles.tagcontainer} key={skill}>
                    <Text style={styles.tag} key={skill}>&#x2022; {skill}</Text>
                    <TouchableOpacity onPress={() => {
                      setUser(update(user, {skills: {$splice: [[i, 1]]}}))
                    }}>
                      <Ionicons name="trash" size={20} color={Color.ERROR} />
                    </TouchableOpacity>
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
      <BottomNavigation
        navigation={navigation}
        buttonLeft={false}
        buttonTextLeft=''
        buttonFunctionLeft={() => null}
        buttonTextRight='Weiter'
        buttonFunctionRight={() => {
          if(user.id != '-1'){
            user.description = userDecription.trim();
            createProfileData(user);
          }
          navigation.navigate('Profile');
        }}
      />
    </>
  )
}

export default ProfileEdit

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
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tag: {
    padding: 10,
    marginLeft: 10,
    fontSize: 15,
    color: Color.ACCENT
  }
})
