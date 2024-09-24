import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar'; 

const HomePage = () => {
  const categories = [
    { id: 1, title: 'UI UX design', image: require('../assets/back.jpg') },
    { id: 2, title: 'Animation', image: require('../assets/front.jpg') },
    { id: 3, title: 'Fullstack Developer', image: require('../assets/uiux.jpg') },
    { id: 4, title: 'Machine Learining', image: require('../assets/ml.jpg') },
    { id: 5, title: 'Data Science', image: require('../assets/data.jpg') },
    
  ];

  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <Text style={styles.headerText}>Explore Top Categories</Text>

      {categories.map((category) => (
        <View key={category.id} style={styles.card}>
          <Image source={category.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{category.title}</Text>
            <TouchableOpacity>
              <Text style={styles.cardButton}>&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
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
