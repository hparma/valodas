import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'react-native-localize';
import { StatusBar } from 'expo-status-bar';
import languages from './language';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const systemLocale = Localization.getLocales()[0].languageTag; 

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      setSelectedLanguage(language);
    } catch (error) {
      console.error("Failed to save the language", error);
    }
  };

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      } else {
        setSelectedLanguage(systemLocale);
      }
    } catch (error) {
      console.error("Failed to load the language", error);
    }
  };
 //opens the  saved valodas
  useEffect(() => {
    loadLanguage();
  }, []);

  //gets the valodu ja nav tad default
  const greeting = languages[selectedLanguage || systemLocale] || languages.en;

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <View style={styles.buttonContainer}>
        <Button title="German" onPress={() => saveLanguage('de')} />
        <Button title="Latvian" onPress={() => saveLanguage('lv')} />
        <Button title="English" onPress={() => saveLanguage('en')} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});
