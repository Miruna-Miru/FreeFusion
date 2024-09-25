import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { companyName, contactInfo } = route.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    duration: '',
    salary: '',
  });

  const categories = [
    { id: 1, title: 'UI UX design', image: require('../assets/back.jpg'), screen: 'UiUx' },
    { id: 2, title: 'Animation', image: require('../assets/front.jpg'), screen: 'Animation' },
    { id: 3, title: 'Fullstack Developer', image: require('../assets/uiux.jpg'), screen: 'FullStack' },
    { id: 4, title: 'Machine Learning', image: require('../assets/ml.jpg'), screen: 'ML' },
    { id: 5, title: 'Data Science', image: require('../assets/data.jpg'), screen: 'DS' },
  ];

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const handleInputChange = (name, value) => setFormData({ ...formData, [name]: value });

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.headerText}>Explore Top Categories</Text>
      <ScrollView style={styles.cardsScrollView}>
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
        <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>New Project</Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={companyName}
              editable={false}
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
              value={contactInfo}
              editable={false}
            />
            <TouchableOpacity style={styles.sendButton} onPress={toggleModal}>
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
});

export default HomePage;

