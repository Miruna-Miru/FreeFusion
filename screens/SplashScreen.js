import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    // Start the animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity: 1
      duration: 2000, // Animation duration: 2 seconds
      useNativeDriver: true,
    }).start();

    // Navigate to LoginPage after 4 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 4000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
        <Text style={styles.appName}>FreeFusion</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default SplashScreen;
