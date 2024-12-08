import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);

  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      setCountryInfo(response.data[0]);
    } catch (error) {
      console.error('Error fetching country information:', error);
      setCountryInfo({ error: 'Country not found or network error.' });
    }
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          source={require('./assets/images/homepage.jpg')}
          style={styles.imageBackground}
          resizeMode="cover"
        ></ImageBackground>
      <View style={styles.buttonContainer}>   
        <Button title="Home" onPress={() => navigation.navigate('Language')} color="#fd9a25" />
      </View>

      <Text style={styles.subtitle}>Enter Country Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Country Code (e.g., LV)"
        value={countryCode}
        onChangeText={setCountryCode}
      />
      <Button title="Fetch Country Info" onPress={fetchCountryInfo} color="#fd9a25"/>

      {countryInfo && (
        <View style={styles.resultContainer}>
          {countryInfo.error ? (
            <Text style={styles.invalid}>Error: {countryInfo.error}</Text>
          ) : (
            <View>
              <Text style={styles.valid}>Country Information:</Text>
              <Text>Name: {countryInfo.name.common}</Text>
              <Text>Capital: {countryInfo.capital[0]}</Text>
              <Text>Region: {countryInfo.region}</Text>
              <Text>Population: {countryInfo.population}</Text>
              <Text>Area: {countryInfo.area} km²</Text>
              <Text>Languages: {Object.values(countryInfo.languages).join(', ')}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
