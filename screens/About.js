import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
   
    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollY, {
          toValue: 1, 
          duration: 5000, 
          useNativeDriver: true,
        }),
        Animated.timing(scrollY, {
          toValue: 18, 
          duration: 5000, 
          useNativeDriver: true,
        }),
      ])
    );

    scrollAnimation.start();

    return () => scrollAnimation.stop();
  }, [scrollY]);

  const animatedStyle = {
    opacity: scrollY,
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FreeSettings')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>FreeFusion</Text>
        <View style={styles.rightSpace} />
      </View>

      <Text style={styles.tagline}>Empowering Communities, Connecting People</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.detailsSection}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Animated.View style={animatedStyle}>
          <Text style={styles.detailsHeader}>Our Vision</Text>
          <Text style={styles.detailsText}>
            To empower freelancers and customers by creating a dynamic platform that fosters collaboration,
            creativity, and growth. We envision a world where every project can find the right talent,
            and every freelancer has access to meaningful opportunities.
          </Text>
          <Text style={styles.detailsHeader}>Our Mission</Text>
          <Text style={styles.detailsText}>
            Our mission is to bridge the gap between freelancers and customers by providing a user-friendly
            platform that facilitates seamless project posting, communication, and collaboration. We strive to
            ensure that customers can easily find the right freelancers for their projects, whether they prefer
            to post publicly or privately. Our goal is to foster a transparent environment where freelancers can
            showcase their skills and expertise, while customers can confidently engage with talented professionals.
          </Text>
          <Text style={styles.detailsHeader}>Join Us</Text>
          <Text style={styles.detailsText}>
            Are you ready to take your projects to the next level? Join our community of freelancers and
            customers today! Sign up now to post your projects, connect with talented freelancers,
            and turn your ideas into reality. Whether you’re looking to hire or be hired, our platform
            is designed to meet your needs. Let’s create together!
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightSpace: {
    width: 24,
  },
  tagline: {
    color: '#485085',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsSection: {
    marginTop: 20,
  },
  detailsHeader: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    color: '#485085',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});
