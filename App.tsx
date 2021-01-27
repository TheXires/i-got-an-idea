// Firebase
import * as firebase from "firebase/app";
import './services/firebaseInitializer'
import 'firebase/auth';
import {getUID, logOut} from './services/auth';

// Firebase Hooks
import {useAuthState} from 'react-firebase-hooks/auth';

// Screens
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import Main from './screens/Main';
import Agb from './screens/Agb';
import Datenschutz from './screens/Datenschutz';
import Impressum from './screens/Impressum';

// Navigator
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// supresses a harmless warning the react firebase hook lib causes
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Color} from "./customTypes/colors";
import Ideadetails from "./screens/Ideadetails";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import IdeaProvider from "./contexts/ideaContext";
import CreateIdea from "./screens/CreateIdea";
import IdeaCreationProvider from "./contexts/ideaCreationContext";
import CreateIdeaFrontend from "./screens/CreateIdeaFrontend";
import CreateIdeaBackend from "./screens/CreateIdeaBackend";
import CreateIdeaData from "./screens/CreateIdeaData";
import CreateIdeaPlatforms from "./screens/CreateIdeaPlatforms";
import CreateIdeaOverview from "./screens/CreateIdeaOverview";
import ChatProvider from "./contexts/chatContext";
import ProfileCreation from "./screens/ProfileCreation";
import ChatDetails from "./screens/ChatDetails";
import { getProfileData } from "./services/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileEdit from "./screens/ProfileEdit";


// creating stack for navigation
const Stack = createStackNavigator();


export default function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  
  const [firstLogin, setFirstLogin] = useState(true);

// TODO: local storage variable für existierenden Nutzer muss durch das ausloggen wieder gelöscht werden.
//        sonst wird der nächste Nutzer der sich einloggt automatisch weitergeleitet, obwohl er vielleicht gar nicht existiert.

  useEffect(() => {
    async function getUserExists(){
      try {
        let localLoginState = await AsyncStorage.getItem('firstLogin');
        // console.log(localLoginState);
        
        setFirstLogin(localLoginState != undefined && localLoginState === 'false' ? (false) : (true));
      } catch (error) {
        alert('Fehler beim lesen des Loginstatus!');
      }
    }
    getUserExists();
  }, [user])

  useEffect(() => {  
    async function getDBUser(){
      if(user != undefined && firstLogin === true){
        let userExists: boolean = (await getProfileData(getUID()).get()).exists;
        if(userExists){
          try {
            await AsyncStorage.setItem('firstLogin', 'false');
          } catch (error) {
            alert('Fehler beim speichern des Loginstatus!');
          }
        }
        setFirstLogin(!userExists);
      }
    } 
    getDBUser();
  }, [loading, user, firstLogin])

  if (error) {
    return <Text>{error}</Text>
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <IdeaProvider>
      <IdeaCreationProvider>
        <ChatProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={headerStyle}>
              {user === null ? (
                <>
                  <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                </>
              ) : (
                  <>
                    {firstLogin ? (
                      <Stack.Screen name='ProfileCreation' component={ProfileCreation} options={{headerShown: false}} />
                    ) : (null)}
                    <Stack.Screen name='Main' component={Main} options={{headerShown: false}} /> 
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='Ideadetails' component={Ideadetails} options={{title: 'Ideedetails'}} />
                    <Stack.Screen name='Chat' component={Chat} />
                    <Stack.Screen name='ChatDetails' component={ChatDetails} options={{title: ''}}/>
                    <Stack.Screen name='Settings' component={Settings} options={{title: 'Einstellungen', headerRight: () => (<TouchableOpacity onPress={logOut} style={styles.button}><Text style={{color: Color.FONT1}}>LogOut</Text></TouchableOpacity>)}} />
                    <Stack.Screen name='CreateIdea' component={CreateIdea} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='CreateIdeaFrontend' component={CreateIdeaFrontend} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='CreateIdeaBackend' component={CreateIdeaBackend} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='CreateIdeaData' component={CreateIdeaData} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='CreateIdeaPlatforms' component={CreateIdeaPlatforms} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='CreateIdeaOverview' component={CreateIdeaOverview} options={{title: 'Meine Idee'}} />
                    <Stack.Screen name='ProfileEdit' component={ProfileEdit} options={{headerShown: false}} />
                  </>
                )
              }
              <Stack.Screen name='Agb' component={Agb} />
              <Stack.Screen name='Datenschutz' component={Datenschutz} />
              <Stack.Screen name='Impressum' component={Impressum} />
            </Stack.Navigator>
          </NavigationContainer>
        </ChatProvider>
      </IdeaCreationProvider>
    </IdeaProvider>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: Color.ACCENT,
    color: Color.FONT1
  }
});



// style react naviagation
// Change default backgroundcolor 
const navTheme = DefaultTheme;
navTheme.colors.background = Color.BACKGROUND;

// option for react navigation header
const headerStyle: any = {
  headerStyle: {
    backgroundColor: Color.BACKGROUND
  },
  headerTintColor: Color.FONT2,
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};
