import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Color } from '../customTypes/colors';
import profileplaceolder from '../assets/profileplaceholder.jpg';
import { getUserIdeas } from '../services/database';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Idea from '../components/Idea';

const Profile = ({ route, navigation }: { route: any, navigation: any}) => {  
  // {route.params.id}

  const [user, setUser] = useState({
    profilePictureURL: 'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg',
    name: 'Peter Lustig',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta incidunt nesciunt exercitationem perspiciatis magnam voluptatibus sed, rerum molestiae maxime. Velit dolorem itaque sint aliquam iste adipisci facere esse ea exercitationem, atque corrupti optio ipsam praesentium maxime animi impedit nobis fugit corporis aperiam recusandae ducimus molestiae temporibus! Facere porro accusantium consectetur debitis iste? Placeat nobis veniam soluta, error earum dolorem minus eos exercitationem magnam dolores voluptas eaque culpa quibusdam non quas maiores inventore sunt hic repellendus iste incidunt ratione corporis commodi. Quae quisquam, optio nostrum, voluptatibus libero magnam voluptas distinctio repellendus quam, ipsum maiores! Aspernatur ad, accusantium pariatur similique culpa quia ea necessitatibus iusto. Soluta labore, beatae delectus exercitationem eum dolorum repudiandae, minus unde tenetur quisquam in necessitatibus. Doloremque nisi, quibusdam nam saepe, ipsam ullam, debitis fugit quam tenetur reiciendis ea sunt totam! Sint dolores voluptates aspernatur molestiae, quos, expedita minus repellendus velit asperiores perferendis eveniet quas officiis odit illo delectus cupiditate aliquid nobis soluta laboriosam quod totam nulla! Itaque qui explicabo vitae cum dolor odio sint reiciendis, laborum cupiditate animi provident! Dolorem tenetur iste rerum quas voluptate? Soluta qui consequatur veritatis quam maiores repellat debitis dolore corporis neque obcaecati veniam fugiat at perspiciatis, quae expedita. Nihil molestiae adipisci consectetur quas!',
    skills: ['krativ sein', 'HTML', 'CSS'],
    blockedUsers: ['dfg556df4g65adfgdgf1fdg15s89WEQR48', 'df5588ofre52f4g65adfgdgf1fdg15s89WEQR48'],
    id: 'df44e7e65safdg6Q9+9S+FDA45A64GA',
  });

  // const ideas = getUserIdeas(user.id);
  const [ideas, loading, error] = useCollectionDataOnce(getUserIdeas('J8iBUgatzBQ3mSVoxRF31iqkKw72'));
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperInnerContainer}>
        {user.profilePictureURL !== '' ? (
          <Image source={{uri: user.profilePictureURL}} style={styles.profileimage} />
        ) : (
          <Image source={profileplaceolder} style={styles.profileimage} />
        )}
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.lowerInnerContainer}>
        <Text style={styles.description}>{user.description}</Text>
        
        {user.skills.length > 0 ? (
          <>
            <Text style={styles.h2}>Skills</Text>
            {user.skills.map((skill) => { return (<Text style={styles.skills} key={skill}>&#x2022; {skill}</Text>)})}
          </>
        ) : (
          <>
          </>
        )}

        {(loading === false && ideas !== undefined && ideas?.length > 0) ? (
            <>
              <Text style={styles.h2}>Ideen</Text>
              {ideas?.map((idea: any) => {
                return (
                  <Idea
                    navigation={navigation}
                    key={idea.id}
                    idea={idea}
              />)})}
            </>
          ) : (
            <>
            </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  upperInnerContainer: {
    width: '100%',
    padding: 15,
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center'
  },
  lowerInnerContainer: {
    padding: 15
  },
  name: {
    color: Color.FONT1,
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
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.FONT2
  },
  skills: {
    color: Color.ACCENT
  }
});

export default Profile;
