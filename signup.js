import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addUser } from './database';
import {styles} from './styles';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email && username && password) {
      console.log('Attempting to add user:', { email, username, password });
      addUser(
        email,
        username,
        password,
        (result) => {
          console.log('User registered successfully:', result);
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('Login');
        },
        (error) => {
          console.error('Error registering user:', error);
          Alert.alert('Error', 'Failed to register user');
        }
      );
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleSignup}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
      <Button title="Sign Up" onPress={handleSignUp} color="#fd9a25" />
      <Button title="Home" onPress={() => navigation.navigate('Language')} color="#fd9a25" />    </View>
    </View>
  );
};


export default SignUpScreen;
