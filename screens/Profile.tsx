import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Color } from '../customTypes/colors';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import { getUserIdeas } from '../services/database';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Idea from '../components/Idea';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getProfileData } from '../services/database';
import { ProfileData } from '../customTypes/profileData';

const Profile = ({ route, navigation }: { route: any, navigation: any }) => {
  const [userID, setUserID] = useState('');
  const [user, userLoading, userError] = useDocumentData<ProfileData>(getProfileData(route.params.id));
  const [ideas, ideaLoading, ideaError] = useCollectionData(getUserIdeas(userID));

  useEffect(() => {
    if (userLoading === false && user!.id !== undefined) {
      setUserID(user!.id);
    }
  }, [user])

  return (
    <ScrollView style={styles.container}>
      {(userLoading === false && user !== undefined) ? (
        <>
          <View style={styles.upperInnerContainer}>
            {user.profilePictureURL !== '' ? (
              <Image source={{ uri: user.profilePictureURL }} style={styles.profileimage} />
            ) : (
                <Image source={profileplaceolder} style={styles.profileimage} />
              )}
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.lowerInnerContainer}>
            {user.description.length > 0 ? (
              <>
                <Text style={styles.h2}>Beschreibung</Text>
                <Text style={styles.description}>{user.description}</Text>
              </>
            ) : (
                <>
                </>
              )}

            {user.skills.length > 0 ? (
              <>
                <Text style={styles.h2}>Skills</Text>
                {user.skills.map((skill) => { return (<Text style={styles.skills} key={skill}>&#x2022; {skill}</Text>) })}
              </>
            ) : (
                <>
                </>
              )}

            {(ideaLoading === false && ideas !== undefined && ideas!.length > 0) ? (
              <>
                <Text style={styles.h2}>Ideen</Text>
                {ideas!.map((idea: any) => {
                  return (
                    <Idea
                      navigation={navigation}
                      key={idea.id}
                      idea={idea}
                    />)
                })}
              </>
            ) : (
                <>
                </>
              )}
          </View>
        </>
      ) : (
          <>
            {/* TODO: spinner einbauen */}
          </>
        )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  upperInnerContainer: {
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center'
  },
  lowerInnerContainer: {
    padding: 15,
    paddingTop: 0
  },
  name: {
    color: Color.ACCENT,
    fontSize: 21,
    fontWeight: 'bold'
  },
  profileimage: {
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 100
  },
  description: {
    color: Color.FONT3
  },
  h2: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT2
  },
  skills: {
    color: Color.FONT3
  }
});

export default Profile;
