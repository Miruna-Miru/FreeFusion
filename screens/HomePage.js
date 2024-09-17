import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to [App Name]!</Text>
      <TextInput style={styles.searchBar} placeholder="Search for freelancers or jobs" />

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Listings</Text>
        {/* Featured items could be dynamically generated */}
      </View>

      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobListings')}>
          <Text style={styles.buttonText}>View Job Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.buttonText}>Messages</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notifications}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {/* Notifications could be dynamically generated */}
      </View>

      <View style={styles.settings}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quickAccess: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  notifications: {
    marginBottom: 20,
  },
  settings: {
    marginBottom: 20,
  },
});
