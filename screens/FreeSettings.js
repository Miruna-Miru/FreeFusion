import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';

const FreeSettings = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("moon@example.com");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigation = useNavigation();

  const handleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
  };

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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#1c1c1c' : '#fff' }]}>
      
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color={isDarkTheme ? 'white' : 'black'} />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Email</Text>
        {isEditingEmail ? (
          <TextInput
            style={[styles.input, { backgroundColor: isDarkTheme ? '#333' : '#f8f8f8', color: isDarkTheme ? 'white' : 'black' }]}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        ) : (
          <Text style={[styles.value, { color: isDarkTheme ? 'white' : 'black' }]}>{email}</Text>
        )}
        <TouchableOpacity onPress={handleEmailEdit} style={styles.editButton}>
          <Icon name={isEditingEmail ? "check" : "edit"} size={24} color={isDarkTheme ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? '#fff' : '#333'}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={handleRemoveAccount} style={styles.removeAccountButton}>
          <Text style={[styles.removeAccountText, { color: isDarkTheme ? 'white' : 'black' }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveAccount}>
          <Icon name="delete" size={28} color="#ff4444" />
        </TouchableOpacity>
      </View>

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  },
  editButton: {
    marginLeft: 10,
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
