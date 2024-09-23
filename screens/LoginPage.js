// screens/LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [obscureText, setObscureText] = useState(true);
  const [isFreelancer, setIsFreelancer] = useState(true);

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Home');
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* FreeFusion Text */}
      <Text style={styles.brandTitle}>FreeFusion</Text>

      {/* Welcome Title */}
      <Text style={styles.title}>Hello Again!!</Text>

      {/* Tabs for Freelancer and Customer */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, isFreelancer && styles.activeTab]}
          onPress={() => setIsFreelancer(true)}
        >
          <Text style={[styles.tabText, isFreelancer && styles.activeTabText]}>Freelancer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isFreelancer && styles.activeTab]}
          onPress={() => setIsFreelancer(false)}
        >
          <Text style={[styles.tabText, !isFreelancer && styles.activeTabText]}>Customer</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder={isFreelancer ? 'Freelancer Email' : 'Customer Email'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={obscureText}
        />
        <TouchableOpacity onPress={() => setObscureText(!obscureText)} style={styles.eyeIcon}>
          <Ionicons
            name={obscureText ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupLink}>New user? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: 'gray',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'green',
  },
  tabText: {
    color: 'gray',
    fontSize: 18,
  },
  activeTabText: {
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
  signupLink: {
    color: 'blue',
    textAlign: 'center',
  },
});
