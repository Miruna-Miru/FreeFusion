import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import * as Notifications from 'expo-notifications'; // Import the notification library

const FreeSettings = () => {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { userId } = route.params;
  const [email, setEmail] = useState(''); 
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // State for notification

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const docRef = doc(db, 'freelancers', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setEmail(userData.email); 
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching email: ", error);
      }
    };

    fetchEmail();
  }, [userId]); 

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: true }
    );
  };

  const handleRemoveAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => navigation.navigate('SignUp'),
        },
      ],
      { cancelable: true }
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleNotifications = async () => {
    setNotificationsEnabled((prevState) => !prevState);
    if (notificationsEnabled) {
      // Disable notifications
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.NONE,
      });
    } else {
      // Enable notifications and show a message
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Notifications enabled!",
          body: "You will now receive notifications.",
        },
        trigger: null, // Sends immediately
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.notificationSection}>
        <Text style={styles.label}>Notifications</Text>
        <TouchableOpacity onPress={toggleNotifications} style={styles.notificationToggle}>
          <Text style={styles.notificationText}>{notificationsEnabled ? 'Enabled' : 'Disabled'}</Text>
          <Icon 
            name={notificationsEnabled ? "notifications-on" : "notifications-off"} 
            size={28} 
            color={notificationsEnabled ? 'green' : 'red'} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleRemoveAccount} style={styles.removeAccountButton}>
        <Text style={styles.removeAccountText}>Delete Account</Text>
        <Icon name="delete" size={28} color="#ff4444" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  section: {
    marginBottom: 20,
    flexDirection: 'column', // Changed to column for vertical alignment
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 16,
  },
  notificationSection: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 18,
    marginRight: 10,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  removeAccountButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeAccountText: {
    fontSize: 18,
    color: '#ff4444',
    marginRight: 10,
  },
});

export default FreeSettings;
