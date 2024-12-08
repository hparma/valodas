import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import { checkUser } from './database';
import { styles } from './styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      checkUser(
        username,
        password,
        (result) => {
          if (result) {
            console.log('User logged in successfully:', result);
            navigation.navigate('Home');
          } else {
            Alert.alert('Error', 'Invalid username or password');
          }
        },
        (error) => {
          console.error('Error checking user:', error);
          Alert.alert('Error', 'Failed to check user');
        }
      );
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          source={require('./assets/images/homepage.jpg')}
          style={styles.imageBackground}
          resizeMode="cover"
        >
      <Text style={styles.titleSignup}>Login</Text>
      </ImageBackground>
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
        <Button title="Log In" onPress={handleLogin} color="#fd9a25" />
        <Button title="Home" onPress={() => navigation.navigate('Language')} color="#fd9a25" />
      </View>
    </View>
  );
};

export default LoginScreen;
