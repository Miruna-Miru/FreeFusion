import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import SignUpPage from './screens/SignUpPage';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import FreeHome from './screens/FreeHome';
import NewFreeProfile from './screens/NewFreeProfile'; 
import FreeSettings from './screens/FreeSettings';
import FreeProfile from './screens/Freeprofile';
import UiUx from './screens/UiUx';
import ML from './screens/ML';
import DS from './screens/DS';
import Animation from './screens/Animation';
import FullStack from './screens/FullStack';
import CustProfile from './screens/CustProfile';
import { auth } from './firebaseconfig';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashDone(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); 
      } else {
        setUserId(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const HomeDrawer = () => (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" 
        component={HomePage} 
        initialParams={{ userId }} />
      <Drawer.Screen name="Profile" 
        component={CustProfile} 
        initialParams={{ userId }} />
    </Drawer.Navigator>
  );

  const StackNavigator = () => (
    <Stack.Navigator>
      {!isSplashDone ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FreeHome"
            component={FreeHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FreeSettings"
            component={FreeSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FreeProfile"
            component={FreeProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='NewFreeProfile'
            component={NewFreeProfile}
            options={{headerShown:false}}
            />
          <Stack.Screen
            name="UiUx"
            component={UiUx}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FullStack"
            component={FullStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Animation"
            component={Animation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ML"
            component={ML}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DS"
            component={DS}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
