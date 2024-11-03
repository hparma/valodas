import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Localization from 'react-native-localize';
import { i18n, setI18nConfig } from './i18n';

const AppContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        i18n.locale = savedLanguage;
        setSelectedLanguage(savedLanguage);
      } else {
        setI18nConfig();
        setSelectedLanguage(i18n.locale);
      }
    } catch (error) {
      console.error("Failed to load the language", error);
    }
  };

  useEffect(() => {
    // Initial load
    loadLanguage();

    // Polling for locale changes
    const interval = setInterval(() => {
      setI18nConfig();
      setSelectedLanguage(i18n.locale);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      i18n.locale = language;
      setSelectedLanguage(language);
      console.log("Language saved and set:", language);
    } catch (error) {
      console.error("Failed to save the language", error);
    }
  };

  const greeting = i18n.t('greeting');

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
};

export default function App() {
  return <AppContent />;
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
