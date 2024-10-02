import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Avatar } from 'react-native-paper';
import * as MailComposer from 'expo-mail-composer';

const UiUx = () => {
  const navigation = useNavigation();
  const users = [
    { id: 1, name: 'John Doe', rating: '4.9', avatar: require('../assets/back.jpg'), description: 'Experienced UI/UX Designer specializing in mobile apps.', email: 'mirmirunalini@gmail.com' },
    { id: 2, name: 'Jane Smith', rating: '4.8', avatar: require('../assets/back.jpg'), description: 'Expert in designing user-friendly interfaces.', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alex Brown', rating: '4.7', avatar: require('../assets/back.jpg'), description: 'Passionate about creating intuitive designs.', email: 'alex.brown@example.com' },
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

    const sendEmail = () => {
      MailComposer.composeAsync({
        recipients: [user.email],
        subject: 'Connect with you',
        body: 'Hello, I would like to connect with you regarding your UI/UX services.',
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

  const scrollY = useSharedValue(0);

  const animatedScrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>UI UX</Text>
      </View>
      <Text style={styles.introText}>Explore & find the matching UIUX developer</Text>
      <Animated.ScrollView
        contentContainerStyle={styles.cardList}
        onScroll={animatedScrollHandler}
        scrollEventThrottle={16}
      >
        {users.map((user) => (
          <Animated.View
            key={user.id}
            style={{
              transform: [{
                translateY: scrollY.value > 0 ? -scrollY.value * 0.2 : 0
              }]
            }}
          >
            <FlipCard user={user} />
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: 'black',
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 16,
    color: '#888',
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
    backgroundColor: '#4caf50',
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
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  connectButtonText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
});

export default UiUx;
