import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../firebaseconfig';
import * as ImagePicker from 'expo-image-picker';

const FreeProfile = ({ route }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [avatarUri, setAvatarUri] = useState('');
  const { username, userId } = route.params;
  const userLevel = "Top Rated";
  const projectsCompleted = 15; 
  const rating = 4.5;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, 'freelancers', userId); 
        const userDoc = await getDoc(userDocRef); 

        if (userDoc.exists()) {
          setAbout(userDoc.data().about);
          setSpecialization(userDoc.data().specialization);
          setAvatarUri(userDoc.data().avatarUri || '');
        } else {
          Alert.alert("Error", "User profile not found!");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
        Alert.alert("Error", "Could not fetch user profile details.");
      }
    };

    fetchUserProfile(); 
  }, [userId]); 

  const handleEditIconPress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

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

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handlePress}>
        <Icon name="arrow-back" size={24} color="black"/>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatarUri ? { uri: avatarUri } : require('../assets/ml.jpg')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleEditIconPress}>
            <Icon name="edit" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Hi {username},</Text>
        <Text style={styles.welcomeBack}>Welcome back</Text>
      </View>

      <View style={styles.aboutBox}>
        <View style={styles.aboutContent}>
          <Text style={styles.statTitle}>About</Text>
          <Text style={styles.aboutText}>{about}</Text>
        </View>
      </View>

      <View style={styles.specialistBox}>
        <View style={styles.specialistContent}>
          <Text style={styles.statTitle}>Specialist in</Text>
          <Text style={styles.specialistText}>{specialization}</Text>
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
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
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
