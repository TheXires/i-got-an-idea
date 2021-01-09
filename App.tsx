// Firebase
import * as firebase from "firebase/app";
import './services/firebaseInitializer'
import 'firebase/auth';

// Firebase Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// Screens
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import Main from './screens/Main';
import Agb from './screens/Agb';
import Datenschutz from './screens/Datenschutz';
import Impressum from './screens/Impressum';

// Navigator
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// supresses a harmless warning the react firebase hook lib causes
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from "./customTypes/colors";
import Ideadetails from "./screens/Ideadetails";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import IdeaProvider from "./contexts/ideaContext";


// creating 
const Stack = createStackNavigator();


export default function App() {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <IdeaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={headerStyle}>
          {user === null ? (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            </>
          ) : (
              <>
                  <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
                  <Stack.Screen name='Ideadetails' component={Ideadetails} options={{ title: 'AGB', headerRight: () => (<TouchableOpacity style={styles.button}><Text style={{color: Color.FONT1}}>Chat starten</Text></TouchableOpacity>) }} />
                  <Stack.Screen name='Chat' component={Chat} />
                  <Stack.Screen name='Profile' component={Profile} />
                  <Stack.Screen name='Settings' component={Settings} />
                
              </>
            )
          }
          <Stack.Screen name='Agb' component={Agb} />
          <Stack.Screen name='Datenschutz' component={Datenschutz} />
          <Stack.Screen name='Impressum' component={Impressum} />
        </Stack.Navigator>
      </NavigationContainer>
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
    marginRight: 10,
    paddingHorizontal: 10,
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
