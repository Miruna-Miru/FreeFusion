import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Avatar } from 'react-native-paper';

const FullStack = () => {
  const navigation = useNavigation();
  const users = [
    { id: 1, name: 'Max Deep', rating: '5.0', avatar: require('../assets/back.jpg'), description: 'Machine Learning expert with 6+ years of experience.' },
    { id: 2, name: 'Sophie Lake', rating: '4.9', avatar: require('../assets/back.jpg'), description: 'Experienced in deep learning models and AI research.' },
    { id: 3, name: 'Jack Orange', rating: '4.8', avatar: require('../assets/back.jpg'), description: 'Specializes in data-driven ML solutions.' },
  ];

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

    return (
      <TouchableOpacity onPress={flipCard} style={styles.card}>
        <Animated.View style={[styles.cardFront, frontStyle]}>
          <Avatar.Image size={70} source={user.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.rating}>Rating: {user.rating}</Text>
        </Animated.View>
        <Animated.View style={[styles.cardBack, backStyle]}>
          <Text style={styles.description}>{user.description}</Text>
          <TouchableOpacity style={styles.connectButton}>
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
        <Text style={styles.headerText}>Machine Learning</Text>
      </View>

      <Text style={styles.subtitle}>Explore & Find the Best ML Experts</Text>

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
    backgroundColor: '#d0f0c0',
    borderRadius: 10,
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
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

export default FullStack;
