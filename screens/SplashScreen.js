import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // Animation for the text fade-in
  const waveAnim = new Animated.Value(0); // Animation value for the wave effect

  useEffect(() => {
    // Animate the green wave from the top left corner
    Animated.timing(waveAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Fade-in animation for the text after the wave has propagated
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      delay: 2000, // Delay to synchronize with the wave effect
    }).start();

    // Navigate to Login page after 4 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 4000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, waveAnim, navigation]);

  // Interpolate the wave translation to create the diagonal movement
  const waveTranslateX = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width / 2, width / 2], // Start from left and move to the right
  });

  const waveTranslateY = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 2, height / 2], // Start from top and move to the bottom
  });

  return (
    <View style={styles.container}>
      {/* Green Wave Background Animation */}
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [
              { translateX: waveTranslateX },
              { translateY: waveTranslateY },
              { scaleX: 1.5 }, // Adjust scale to stretch the wave across the screen
              { scaleY: 1.5 }, // Adjust scale for a better wave effect
            ],
          },
        ]}
      />

      {/* FreeFusion Text Animation */}
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
    overflow: 'hidden', // Ensure animations stay within bounds
  },
  wave: {
    position: 'absolute',
    width: width * 2, // Width larger than screen for full coverage as it moves
    height: height, // Height adjusted to cover screen height effectively
    backgroundColor: 'green',
    top: -height / 2, // Start wave off-screen from the top
    left: -width, // Start wave off-screen from the left
    transform: [{ skewX: '30deg' }], // Skew for a wave-like appearance
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SplashScreen;
