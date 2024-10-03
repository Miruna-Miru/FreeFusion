import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig'; 

const NewFreeProfile = ({ route }) => {
  const { username, userId } = route.params; 
  const [email, setEmail] = useState('');  
  const [about, setAbout] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [additionalSpecialization, setAdditionalSpecialization] = useState('');
  const [isAdditionalSpecializationVisible, setIsAdditionalSpecializationVisible] = useState(false);
  const [addOther, setAddOther] = useState(false); 
  const [isChecked, setIsChecked] = useState(false);
  const animation = new Animated.Value(0); // Animation for jumping text

  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const docRef = doc(db, 'freelancers', userId); 
        const docSnap = await getDoc(docRef); 

        if (docSnap.exists()) {
          const data = docSnap.data();
          setEmail(data.email);  
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail(); 
    startJumpAnimation(); // Start the jumping animation
  }, [userId]);

  // Function to start continuous jumping animation
  const startJumpAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

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
        <Animated.Text
          style={[
            styles.welcomeText,
            {
              transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }],
            },
          ]}
        >
          Welcome, {username}
        </Animated.Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}  
          editable={false}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>About you</Text>
          <TextInput
            style={styles.textArea}
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={4}
            placeholder="Tell us about yourself..."
          />
        </View>
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
        <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
  labelContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  textArea: {
    height: 100,
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
    backgroundColor: 'green', 
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NewFreeProfile;
