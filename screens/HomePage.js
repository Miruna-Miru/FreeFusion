import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db, auth } from '../firebaseconfig';
import LottieView from 'lottie-react-native';
import { doc, setDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

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
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [freelancerRequests, setFreelancerRequests] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
      setCurrentUserEmail(currentUser.email);
    }
  }, []);

  const fetchFreelancerRequests = async () => {
    if (!currentUserEmail) {
      return;
    }
    try {
      const requestsQuery = query(
        collection(db, 'Freelancer_accept'),
        where('customerEmail', '==', currentUserEmail)
      );
      const querySnapshot = await getDocs(requestsQuery);
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredRequests = requests.filter(request => request.status !== 'Accepted' && request.status !== 'Declined');
      setFreelancerRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching freelancer requests: ', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const requestRef = doc(db, 'Freelancer_accept', requestId);
      await updateDoc(requestRef, { status: 'Accepted' });
      fetchFreelancerRequests();
      setIsNotificationModalVisible(false);
    } catch (error) {
      console.error('Error accepting request: ', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const requestRef = doc(db, 'Freelancer_accept', requestId);
      await deleteDoc(requestRef);
      fetchFreelancerRequests();
      setIsNotificationModalVisible(false);
    } catch (error) {
      console.error('Error declining request: ', error);
    }
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalVisible(!isNotificationModalVisible);
    if (!isNotificationModalVisible) {
      fetchFreelancerRequests();
    }
  };

  const categories = [
    { id: 1, title: 'UI UX design', lottie: require('../assets/ani3.json'), screen: 'UiUx' },
    { id: 2, title: 'Animation', lottie: require('../assets/ani1.json'), screen: 'Animation' },
    { id: 3, title: 'App Developer', lottie: require('../assets/ani2.json'), screen: 'FullStack' },
    { id: 4, title: 'Web Development', lottie: require('../assets/ani5.json'), screen: 'ML' },
    { id: 5, title: 'Data Science', lottie: require('../assets/ani4.json'), screen: 'DS' },
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.postProjectContainer}>
        <Text style={styles.postProjectText}>Ready to take on new challenges? Post your project now!</Text>
        <TouchableOpacity style={styles.postButton} onPress={toggleModal}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Explore Top Categories</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.card}>
            <LottieView source={category.lottie} autoPlay loop style={styles.lottieAnimation} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(category.screen)}>
                <Text style={styles.cardButton}>&gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <Modal visible={isNotificationModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalcont}>
          <ScrollView contentContainerStyle={styles.modalcontent}>
            <Text style={styles.modalHeader}>Freelancer Requests</Text>
            {freelancerRequests.length > 0 ? (
              freelancerRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <Text style={styles.requestTitle}>Project : {request.projectName}</Text>
                  <Text style={styles.requestDetail}>Freelancer : {request.freelancerUsername}</Text>
                  <Text style={styles.requestDescription}>E-mail : {request.freelancerEmail}</Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(request.id)}>
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(request.id)}>
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No requests available</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={toggleNotificationModal}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity style={styles.notificationButton} onPress={toggleNotificationModal}>
        <Icon name="bell" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>New Project</Text>
            <TextInput style={styles.input} placeholder="Company Name" value={formData.companyName} onChangeText={(value) => handleInputChange('companyName', value)} />
            <TextInput style={styles.input} placeholder="Project Title" value={formData.projectTitle} onChangeText={(value) => handleInputChange('projectTitle', value)} />
            <TextInput style={styles.input} placeholder="Description" value={formData.description} onChangeText={(value) => handleInputChange('description', value)} />
            <TextInput style={styles.input} placeholder="Duration" value={formData.duration} onChangeText={(value) => handleInputChange('duration', value)} />
            <TextInput style={styles.input} placeholder="Salary" value={formData.salary} onChangeText={(value) => handleInputChange('salary', value)} />
            <TextInput style={styles.input} placeholder="Contact Info" value={formData.contactInfo} editable={false} />
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
    padding: 16,
  },
  lottieAnimation: {
    height: 120,
    width: 170,
    borderRadius: 8,
  },
  postProjectContainer: {
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  postProjectText: {
    color: 'black',
    fontSize: 16,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 12,
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  headerText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardButton: {
    color: '#4CAF50',
    fontSize: 24,
  },
  notificationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 12,
  },
  modalcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalcontent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  requestCard: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestDetail: {
    fontSize: 14,
  },
  requestDescription: {
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default HomePage;
