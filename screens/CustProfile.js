import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 

export default function CustProfile({ navigation }) {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("JohnDoe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [address, setAddress] = useState("123 Main St, City, Country");

    const handleEditToggle = () => {
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
        navigation.navigate('HomePage', { companyName: 'Your Company Name', contactInfo: '123-456-7890' });
    };

    return (
        <View style={styles.container}>
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

            <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
                <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleNavigateHome}>
                <Text style={styles.buttonText}>Go to Home Page</Text>
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
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
