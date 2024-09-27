import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig'; 


const NewFreeProfile = ({ route }) => {
  const { username, userId} = route.params; 
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [additionalSpecialization, setAdditionalSpecialization] = useState('');
  const [isAdditionalSpecializationVisible, setIsAdditionalSpecializationVisible] = useState(false);
  const [addOther, setAddOther] = useState(false); 
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const docRef = doc(db, 'freelancers', userId); 
        const docSnap = await getDoc(docRef); 

        if (docSnap.exists()) {
          const data = docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail(); 
  }, [userId]);

  const handleSpecializationChange = (value) => {
    setSpecialization(value);
    setIsAdditionalSpecializationVisible(value === 'Other');
  };

  const handleDone = async () => {
    if (!username || !about || !specialization) {
      Alert.alert("Error", "Please fill in all mandatory fields!");
      return;
    }

    try {
      console.log('Trying to update document with UID:', userId); 

      const userDocRef = doc(db, 'freelancers', userId); 

      await updateDoc(userDocRef, {
        about,
        specialization,
        additionalSpecialization: isAdditionalSpecializationVisible ? additionalSpecialization : null,
      });

      Alert.alert("Profile Submitted", `About: ${about}, Specialization: ${specialization}`);
      navigation.navigate('FreeHome', { username, userId });
    } catch (error) {
      console.error('Error updating document: ', error);
      Alert.alert('Error', 'Could not update profile details. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome, {username}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="About you"
          value={about}
          onChangeText={setAbout}
        />
        <Picker
          selectedValue={specialization}
          style={styles.picker}
          onValueChange={handleSpecializationChange}>
          <Picker.Item label="Select your specialization *" value="" />
          <Picker.Item label="Web Development" value="Web Development" />
          <Picker.Item label="Mobile Development" value="Mobile Development" />
          <Picker.Item label="Data Science" value="Data Science" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <CheckBox
          style={styles.checkbox}
          onClick={() => {
            setIsChecked(!isChecked);
            setAddOther(!addOther);
          }}
          isChecked={isChecked}
          leftText={"Add another specialization?"}
        />
        {addOther && (
          <Picker
            selectedValue={additionalSpecialization}
            style={styles.picker}
            onValueChange={setAdditionalSpecialization}>
            <Picker.Item label="Select additional specialization" value="" />
            <Picker.Item label="AI/ML" value="AI/ML" />
            <Picker.Item label="UI/UX Design" value="UI/UX Design" />
            <Picker.Item label="DevOps" value="DevOps" />
          </Picker>
        )}
        <Button title="Done" onPress={handleDone} style={styles.doneButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  checkbox: {
    padding: 10,
    marginBottom: 20,
  },
  doneButton: {
    color: 'green',
  },
});

export default NewFreeProfile;
