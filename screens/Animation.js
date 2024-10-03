import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Avatar } from 'react-native-paper';
import { db } from '../firebaseconfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as MailComposer from 'expo-mail-composer';

const Animation = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'freelancers'), where('specialization', '==', 'Animation'));
        const querySnapshot = await getDocs(q);

        const fetchedUsers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().username, 
          rating: doc.data().rating || 'N/A', 
          avatar: require('../assets/back.jpg'), 
          description: doc.data().about || 'No description available.',
          email: doc.data().email || 'No email available', 
        }));

        setUsers(fetchedUsers); 
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers(); 
  }, []);

  const FlipCard = ({ user }) => {
    const rotateY = useSharedValue(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const frontStyle = useAnimatedStyle(() => ({
      transform: [{ rotateY: `${rotateY.value}deg` }],
      backfaceVisibility: 'hidden',
    }));

    const backStyle = useAnimatedStyle(() => ({
      transform: [{ rotateY: `${rotateY.value + 180}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
    }));

    const flipCard = () => {
      setIsFlipped(!isFlipped);
      rotateY.value = withTiming(isFlipped ? 0 : 180, { duration: 500 });
    };

    const sendEmail = () => {
      MailComposer.composeAsync({
        recipients: [user.email],
        subject: 'Connect with you',
        body: 'Hello, I would like to connect with you regarding your Machine Learning services.',
      });
    };

    return (
      <TouchableOpacity onPress={flipCard} style={styles.card}>
        <Animated.View style={[styles.cardFront, frontStyle]}>
          <Avatar.Image size={70} source={user.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.rating}>Rating: {user.rating}</Text>
        </Animated.View>
        <Animated.View style={[styles.cardBack, backStyle]}>
          <Text style={styles.description}>{user.description}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <TouchableOpacity style={styles.connectButton} onPress={sendEmail}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Animation</Text>
      </View>

      <Text style={styles.subtitle}>Explore & Find the Best Animation Experts</Text>

      <ScrollView contentContainerStyle={styles.cardList}>
        {users.map((user) => (
          <FlipCard key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardList: {
    alignItems: 'center',
  },
  card: {
    width: 250,
    height: 280,
    marginBottom: 20,
    position: 'relative',
  },
  cardFront: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  rating: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  connectButtonText: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Animation;
