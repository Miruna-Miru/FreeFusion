import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import * as Notifications from 'expo-notifications';

const FreeSettings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => navigation.navigate('Login') }
      ],
      { cancelable: true }
    );
  };

  const handleRemoveAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => navigation.navigate('SignUp') }
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
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.NONE,
      });
    } else {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Notifications enabled!",
          body: "You will now receive notifications.",
        },
        trigger: null,
      });
    }
  };

  const handleAboutUsPress = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} activeOpacity={0.6}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleNotifications} style={styles.section} activeOpacity={0.6}>
        <Text style={styles.label}>Notifications</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.value}>{notificationsEnabled ? 'Enabled' : 'Disabled'}</Text>
          <Icon
            name={notificationsEnabled ? "notifications-on" : "notifications-off"}
            size={28}
            color={notificationsEnabled ? 'green' : 'red'}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAboutUsPress} style={styles.section} activeOpacity={0.6}>
        <Text style={styles.label}>About Us</Text>
        <View style={styles.iconContainer}>
          <Icon name="info" size={28} color="green" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRemoveAccount} style={styles.section} activeOpacity={0.6}>
        <Text style={styles.label}>Delete Account</Text>
        <View style={styles.iconContainer}>
          <Icon name="delete" size={28} color="#ff4444" />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default FreeSettings;
