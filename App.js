import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import SignUpPage from './screens/SignUpPage';
import SplashScreen from './screens/SplashScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashDone(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Drawer Navigator for the Home Page only
  const HomeDrawer = () => (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomePage} />
    </Drawer.Navigator>
  );

  // Stack Navigator for Splash, Login, and SignUp without the drawer
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
            options={{ title: 'Sign Up Page' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeDrawer}
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
