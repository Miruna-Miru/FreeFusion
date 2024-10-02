import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import NavBar from './NavBar';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { db } from '../firebaseconfig'; 
import { collection, getDocs } from 'firebase/firestore'; 

const FreeHome = ({ route }) => {
  const { username, userId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCards, setProjectCards] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const carouselItems = [
    { id: 1, text: "Project 1", image: require('../assets/ml.jpg') },
    { id: 2, text: "Project 2", image: require('../assets/uiux.jpg') },
    { id: 3, text: "Project 3", image: require('../assets/data.jpg') },
  ];

  const handleCardPress = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'customer_requests')); 
        const requests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), 
        }));
        setProjectCards(requests); 
      } catch (err) {
        console.error("Error fetching requests: ", err);
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRequests();
  }, []);

  // Get current date in format 'Day Mon Date Year'
  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);
  const handleSendPress = async () => {
    if (selectedProject) {
      const email = selectedProject.contactInfo;
      const subject = `Inquiry about ${selectedProject.projectTitle}`;
      const body = `Hello,\n\nI am interested in the project "${selectedProject.projectTitle}".\n\nThank you!`; 
      const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; 
  
      await Linking.openURL(mailUrl);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <NavBar username={username} userId={userId} /> 
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <Text style={styles.userName}>Hi, {username} !</Text>
      <Text style={styles.ongoingProjectsText}>Ongoing Projects</Text>

      <View style={styles.carouselContainer}> 
        <Carousel
          loop
          width={300}
          height={200}
          autoPlay={true}
          data={carouselItems}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
              <Text style={styles.carouselText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <ScrollView style={styles.cardContainer}> 
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error fetching projects</Text> 
        ) : projectCards.length === 0 ? (
          <Text>No projects available</Text> 
        ) : (
          projectCards.map((project) => (
            <TouchableOpacity key={project.id} onPress={() => handleCardPress(project)} style={styles.card}>
              <Text style={styles.cardTitle}>{project.projectTitle}</Text>
              <View style={styles.divider} />
              <Text style={styles.cardDescription}>{project.description}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedProject && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProject.projectTitle}</Text>
              <Text style={styles.modalDescription}>{selectedProject.description}</Text>
              <View style={styles.modalDetails}>
                <Text style={styles.modalDetail}>Company: {selectedProject.companyName}</Text>
                <Text style={styles.modalDetail}>Salary: {selectedProject.salary}</Text>
                <Text style={styles.modalDetail}>Duration: {selectedProject.duration}</Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={handleSendPress}>
                  <Icon name="send" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40, 
  },
  dateContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  ongoingProjectsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  carouselContainer: {
    height: 180,  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,  
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardContainer: {
    width: '90%',
    marginTop: 10,  
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation:1,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    backgroundColor: 'rgba(144, 238, 144, 0.1)', // Light green (10% opacity)
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalDetails: {
    width: '100%',
    alignItems: 'flex-start',
  },
  modalDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  iconButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default FreeHome;