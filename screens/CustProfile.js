import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig'; 

export default function CustProfile({ navigation, route }) {
    const { userId } = route.params; 
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDocRef = doc(db, 'customers', userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username || "");
                    setEmail(userData.email || "");
                    setAddress(userData.address || "");
                } else {
                    console.log('User does not exist in the database');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleEditToggle = async () => {
        if (isEditing) {
            try {
                const userDocRef = doc(db, 'customers', userId);
                await updateDoc(userDocRef, {
                    username: username,
                    email: email,
                    address: address,
                });
                console.log('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
        setIsEditing(!isEditing); 
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => navigation.navigate("SignUp"),
                },
            ],
            { cancelable: false }
        );
    };

    const handleNavigateHome = () => {
        navigation.navigate('Home', { userId });
    };

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Username:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                ) : (
                    <Text style={styles.text}>{username}</Text>
                )}
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                ) : (
                    <Text style={styles.text}>{email}</Text>
                )}
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Address:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />
                ) : (
                    <Text style={styles.text}>{address}</Text>
                )}
            </View>

           
            <View style={styles.iconButtonsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleEditToggle}>
                    <Icon name={isEditing ? "save-outline" : "pencil-outline"} size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.iconButton} onPress={handleNavigateHome}>
                    <Icon name="home-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <Icon name="trash-outline" size={24} color="red" />
                <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    fieldContainer: {
        backgroundColor: 'rgba(144, 238, 144, 0.1)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
    },
    iconButtonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignSelf: 'flex-end', 
        marginVertical: 10,
    },
    iconButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10, 
        marginHorizontal: 5, 
        width: 60, 
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 16,
        marginLeft: 10,
    },
});
