import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {styles} from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titleSignup}>Logged in :D </Text> 
        <View style={styles.buttonContainer}>   
        <Button title="Home" onPress={() => navigation.navigate('Language')} color="#fd9a25" />   
        </View>
    </View>
  );
};


export default HomeScreen;
