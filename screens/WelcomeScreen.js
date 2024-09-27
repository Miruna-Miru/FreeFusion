import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const WelcomeScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const docRef = doc(db, 'freelancers', userId); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username); 
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/start.png')} style={styles.image} />
      <Text style={styles.title}>Start Your Freelance Journey</Text>
      <Text style={styles.subtitle}>Connect with clients and showcase your skills.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NewFreeProfile', { username, userId})} 
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0f0c0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#54d3c2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
