import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Trigger the animation on component mount
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0], // Move from bottom to original position
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FreeSettings')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>FreeFusion</Text>
        <View style={styles.rightSpace} />
      </View>

      <Text style={styles.tagline}>Empowering Communities, Connecting People</Text>

      <Animated.View style={[styles.detailsSection, animatedStyle]}>
        <Text style={styles.detailsHeader}>Our Vision</Text>
        <Text style={styles.detailsText}>
          We envision a world where everyone has the opportunity to collaborate, learn, and grow together.
        </Text>
        <Text style={styles.detailsHeader}>Our Mission</Text>
        <Text style={styles.detailsText}>
          To provide a platform that facilitates communication, promotes inclusivity, and empowers users to achieve their goals.
        </Text>
        <Text style={styles.detailsHeader}>Join Us</Text>
        <Text style={styles.detailsText}>
          Become a part of our community today and help us make a difference!
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed to white
    padding: 16,
    paddingTop: 40, // Added space at the top
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: 'green',
    fontSize: 24, // Made the title bigger
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightSpace: {
    width: 24,
  },
  tagline: {
    color: '#485085', 
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsSection: {
    marginTop: 20,
  },
  detailsHeader: {
    color: 'green',
    fontSize: 20, // Adjust header size for details
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    color: '#485085', 
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});
