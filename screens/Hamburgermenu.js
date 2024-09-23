import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your icon library

export default function HamburgerMenu({ closeMenu }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  const menuHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, '100%'],
  });

  const handleCloseMenu = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeMenu(); // Call the closeMenu function after the animation
    });
  };

  return (
    <Animated.View style={[styles.menuContainer, { height: menuHeight }]}>
      <TouchableOpacity style={styles.closeButton} onPress={handleCloseMenu}>
        <Icon name="close" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.menuTitle}>FreeFusion</Text>
      <Text style={styles.menuTagline}>Your Gateway to Freelancing</Text>
      <TouchableOpacity style={styles.menuItem} onPress={handleCloseMenu}>
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleCloseMenu}>
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleCloseMenu}>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleCloseMenu}>
        <Text style={styles.menuText}>About Us</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'green',
    width: '50%',
    zIndex: 1000,
    paddingTop: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  menuTagline: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  menuItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
  },
  menuText: {
    fontSize: 16,
    color: 'white',
  },
});
