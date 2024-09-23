import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import HamburgerMenu from './Hamburgermenu'; // Import your HamburgerMenu component

export default function HomeScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Hamburger menu */}
      <TouchableOpacity style={styles.hamburgerIcon} onPress={toggleMenu}>
        <Icon name="menu" size={30} color="white" />
      </TouchableOpacity>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Company logo */}
{/*<Image
          source={require('./assets/logo.png')} // Change this to your logo path
          style={styles.logo}
        />
        */}
        <Text style={styles.amount}>- $2.15</Text>
        <Text style={styles.store}>Starbucks</Text>

        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>Coffee</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Add note</Text>
        </TouchableOpacity>

        {/* Tags section */}
        <View style={styles.tags}>
          <Text style={styles.tag}>#food</Text>
          <Text style={styles.tag}>#fastfood</Text>
          <Text style={styles.tag}>#coffee</Text>
        </View>
      </View>

      {/* Location and other details */}
      <View style={styles.details}>
        <Text style={styles.location}>
          6887 Sunset St, South Valley, Vermont, United States
        </Text>
        <Text style={styles.date}>30 Jul 2019, 8:24 AM</Text>
      </View>

      {/* Hamburger menu */}
      {isMenuOpen && <HamburgerMenu closeMenu={toggleMenu} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // Green background color
    paddingTop: 50, // Top padding for safe area
  },
  hamburgerIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  amount: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  store: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  tagButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  tagText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#FF8A65',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  details: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  location: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'white',
  },
});
