import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db, auth } from '../firebaseconfig'; 
import { doc, setDoc } from 'firebase/firestore';

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId; 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    projectTitle: '',
    description: '',
    duration: '',
    salary: '',
    contactInfo: '',
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
      setFormData((prevData) => ({
        ...prevData,
        contactInfo: currentUser.email,
      }));
    }
  }, []);

  const categories = [
    { id: 1, title: 'UI UX design', image: require('../assets/back.jpg'), screen: 'UiUx' },
    { id: 2, title: 'Animation', image: require('../assets/front.jpg'), screen: 'Animation' },
    { id: 3, title: 'Fullstack Developer', image: require('../assets/uiux.jpg'), screen: 'FullStack' },
    { id: 4, title: 'Machine Learning', image: require('../assets/ml.jpg'), screen: 'ML' },
    { id: 5, title: 'Data Science', image: require('../assets/data.jpg'), screen: 'DS' },
  ];

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  
  const handleInputChange = (name, value) => setFormData({ ...formData, [name]: value });

  const handleSend = async () => {
    if (userId && formData.projectTitle && formData.description && formData.salary) {
      try {
        const requestRef = doc(db, 'customer_requests', 'requestId' + Date.now()); 

        await setDoc(requestRef, {
          userId: userId,
          ...formData,
          createdAt: new Date(),
        });

        toggleModal();
      } catch (error) {
        console.error("Error saving request: ", error);
      }
    } else {
      console.log('Please fill in all required fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Explore Top Categories</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.card}>
            <Image source={category.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(category.screen)}>
                <Text style={styles.cardButton}>&gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
      
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>New Project</Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={formData.companyName}
              onChangeText={(value) => handleInputChange('companyName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Project Title"
              value={formData.projectTitle}
              onChangeText={(value) => handleInputChange('projectTitle', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration"
              value={formData.duration}
              onChangeText={(value) => handleInputChange('duration', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Salary"
              value={formData.salary}
              onChangeText={(value) => handleInputChange('salary', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Info"
              value={formData.contactInfo} 
              editable={false} 
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cardsContainer: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardButton: {
    fontSize: 24,
    color: '#007bff',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, 
  },
});

export default HomePage;
