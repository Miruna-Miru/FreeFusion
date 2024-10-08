import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { username, userId} = route.params;

  const getColor = (page) => (route.name === page ? 'green' : 'black');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FreeSettings',{userId})}>
        <Icon name="settings" size={24} color={getColor('FreeSettings')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FreeHome',{userId})}>
        <Icon name="home" size={24} color={getColor('FreeHome')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FreeProfile',{ username, userId})}>
        <Icon name="person" size={24} color={getColor('FreeProfile')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
    borderTopRightRadius: 20,
    elevation: 100,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default NavBar;

