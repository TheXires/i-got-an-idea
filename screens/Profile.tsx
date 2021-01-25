import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import {Color} from '../customTypes/colors';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import {getUserIdeas} from '../services/database';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Idea from '../components/Idea';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {getProfileData} from '../services/database';
import {ProfileData} from '../customTypes/profileData';
import CustomSpinner from '../components/CustomSpinner';

const Profile = ({ route, navigation }: { route: any, navigation: any }) => {
  const [userID, setUserID] = useState('');
  const [user, userLoading, userError] = useDocumentData<ProfileData>(getProfileData(route.params.id));
  const [ideas, ideaLoading, ideaError] = useCollectionData(getUserIdeas(userID));

  // TODO: Error handling für userError und ideaError schreiben

  useEffect(() => {
    if (userLoading === false && user!.id !== undefined) {
      setUserID(user!.id);
    }
  }, [user])

  return (
    // TODO: floating action button, um nutzer zu blockieren, wenn eigenes Profil dann profilbearbeiten Button
      <ScrollView style={styles.container}>
        {(userLoading === false && user !== undefined) ? (
          <>
            <View style={styles.upperInnerContainer}>
              {user.profilePictureURL !== '' ? (
                <Image source={{uri: user.profilePictureURL}} style={styles.profileimage} />
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
                  {/* show nothing if there is no user description */}
                  </>
                )}

              {user.skills.length > 0 ? (
                <>
                  <Text style={styles.h2}>Skills</Text>
                  {user.skills.map((skill) => {return (<Text style={styles.skills} key={skill}>&#x2022; {skill}</Text>)})}
                </>
              ) : (
                  <>
                  {/* show nothing if there are no user skills */}
                  </>
                )}
              
              {!ideaLoading ? (
                <>
                  {(ideas !== undefined && ideas!.length > 0) ? (
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
                    {/* If there are no ideas or its undefind, nothing needs to be rendered */}
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Show CustomSpinner while loading ideas from firestore */}
                  <CustomSpinner />
                </>
              )}


              {!ideaLoading ? (
                <></>
              ) : (<></>)}
            </View>
          </>
        ) : (
            <>
              {/* Show CustomSpinner while loading user from firestore */}
              <CustomSpinner />
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
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  profileimage: {
    marginBottom: 10,
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
