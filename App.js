import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Localization from 'react-native-localize';
import { i18n, setI18nConfig } from './i18n';

const AppContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);


//izvada sistēmas vai saglabāto valodu
  const load = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language'); //dabū saglabāto valodu
      console.log("Loaded Language from Storage:", savedLanguage);//test
      if (savedLanguage) {
        i18n.locale = savedLanguage;
        setSelectedLanguage(savedLanguage);
      } else {
        setI18nConfig();
        setSelectedLanguage(i18n.locale);
      }
      console.log("Current Locale Set:", i18n.locale); //test
    } catch (error) {
      console.error("Failed to load the language", error);//test
    }
  };

  useEffect(() => {
    // Isākuma load
    load();
  }, []);

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      i18n.locale = language;
      setSelectedLanguage(language);
      console.log("Language saved and set:", language); //test
    } catch (error) {
      console.error("Failed to save the language", error); //test
    }
  };
//testing
  const greeting = i18n.t('greeting');
  console.log("Greeting:", greeting);
  console.log("Selected Language:", selectedLanguage);
  console.log("System Locale:", Localization.getLocales()[0].languageTag);

  //pogas + saglabājas izvēle
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

//lai parādās mājaslapa
export default function App() {
  return <AppContent />;
}

//html
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
