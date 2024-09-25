import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from './NavBar';

const FreeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userName = "Moon";
  const userLevel = "Top Rated";
  const projectsCompleted = 15; 
  const rating = 4.5;
  const aboutUser = "A passionate freelancer with expertise in mobile app development and design."; 
  const specialistDomain = "Mobile App Development"; 

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon 
          key={i} 
          name={i <= rating ? 'star' : 'star-border'} 
          size={20} 
          color="#FFD700" 
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/ml.jpg')} 
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="edit" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Hi {userName},</Text>
        <Text style={styles.welcomeBack}>Welcome back</Text>
      </View>

      <View style={styles.aboutBox}>
        <View style={styles.aboutContent}>
          <Text style={styles.statTitle}>About</Text>
          <Text style={styles.aboutText}>{aboutUser}</Text>
        </View>
      </View>

      <View style={styles.specialistBox}>
        <View style={styles.specialistContent}>
          <Text style={styles.statTitle}>Specialist in</Text>
          <Text style={styles.specialistText}>{specialistDomain}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>My level</Text>
          <View style={styles.levelContainer}>
            <Icon name="verified" size={20} color="green" /> 
            <Text style={styles.statValue}>{userLevel}</Text>
          </View>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Projects Completed</Text>
          <Text style={styles.statValue}>{projectsCompleted}</Text>
        </View>
        <View style={styles.ratingBox}>
          <Text style={styles.statTitle}>Rating</Text>
          <View style={styles.ratingContainer}>
            {renderStars(rating)}
            <Text style={styles.statValue}>{rating}</Text>
          </View>
        </View>
      </View>

      <NavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    color: 'black',
    marginTop: 10,
  },
  welcomeBack: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 5,
  },
  aboutBox: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  aboutContent: {
    flexDirection: 'column',
  },
  aboutText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  specialistBox: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  specialistContent: {
    flexDirection: 'column',
  },
  specialistText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  statBox: {
    width: '45%', 
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBox: {
    width: '100%', 
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FreeProfile;