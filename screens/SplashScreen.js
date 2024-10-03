import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 8000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
        <Text style={styles.appName}>FreeFusion</Text>
      </Animated.View>

      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop={true}
        speed={1.5}
        style={styles.lottieAnimation}
      />
{/* 
      <Video
        source={require('../assets/vid.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      */}
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
  lottieAnimation: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  video: {
    width: width * 0.9,
    height: height * 0.3,
    marginTop: 20,
  },
});

export default SplashScreen;
