import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from '../firebaseconfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUp = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Customer'); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setE_mail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Company');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleSignUp = async () => {
    if (phoneNumber.length === 10 && username && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid; 
        const userData = {
          email,
          username,
          phoneNumber,
          role,
          address,
        };
        const collectionName = activeTab === 'Customer' ? 'customers' : 'freelancers';

        const additionalFreelancerData = activeTab === 'Freelancer' ? {
          projectCount: 0,
          rating: 0
        } : {};

        await setDoc(doc(db, collectionName, userId), {
          ...userData,
          uid: userId, 
          ...additionalFreelancerData,
        });
        alert('Sign up successful!');
        if (activeTab === 'Customer') {
          navigation.navigate('HomePage', { userId });
        } else {
          navigation.navigate('WelcomeScreen', { userId }); 
        }
      } catch (error) {
        console.error('Error during sign-up: ', error);
        alert('Error during sign-up: ' + error.message);
      }
    } else {
      alert('Please enter valid credentials. Phone number should be 10 digits.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Customer' && styles.activeTab]}
          onPress={() => setActiveTab('Customer')}
        >
          <Text style={[styles.tabText, activeTab === 'Customer' && styles.activeTabText]}>Customer</Text>
          {activeTab === 'Customer' && <View  />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Freelancer' && styles.activeTab]}
          onPress={() => setActiveTab('Freelancer')}
        >
          <Text style={[styles.tabText, activeTab === 'Freelancer' && styles.activeTabText]}>Freelancer</Text>
          {activeTab === 'Freelancer' && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>
      {activeTab === 'Customer' && (
        <>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Company" value="Company" />
            <Picker.Item label="Startup" value="Startup" />
            <Picker.Item label="Individual" value="Individual" />
            <Picker.Item label="Business" value="Business" />
          </Picker>
          <TextInput
            placeholder="Address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </>
      )}
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="E-mail ID"
        style={styles.input}
        keyboardType="default"
        onChangeText={(text) => setE_mail(text)}
        value={email}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up as {activeTab}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'green',
  },
  tabText: {
    fontSize: 18,
    color: 'gray',
  },
  activeTabText: {
    color: 'green',
    fontWeight: 'bold',
  },
  
  input: {
    borderWidth: 1,
    borderColor: 'green', 
    borderRadius: 20, 
    padding: 10,
    marginVertical: 10,
  },
  picker: {
    height: 40,
    borderColor: 'green', 
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  passwordContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  signUpButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 20, 
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUp;
