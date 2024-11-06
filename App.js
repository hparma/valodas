import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Localization from 'react-native-localize';
import { i18n, setI18nConfig } from './i18n';
import { styles } from './styles'; // Update the import path as necessary
import { ImageBackground } from 'react-native'; // Add this line


const AppContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);
  const [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      console.log("Loaded Language from Storage:", savedLanguage);
      if (savedLanguage) {
        setI18nConfig(savedLanguage); // Set I18n locale to saved language
        setSelectedLanguage(savedLanguage);
      } else {
        const systemLocale = Localization.getLocales()[0].languageTag;
        setI18nConfig(systemLocale); // Set I18n locale to system locale if no saved language
        setSelectedLanguage(systemLocale);
      }
      console.log("Current Locale Set:", i18n.locale);
    } catch (error) {
      console.error("Failed to load the language", error);
    }
  };

  
  useEffect(() => {
    // Isākuma load
    loadLanguage(); // Load system language    
  }, []);
  
  useEffect(() => {
    // Load language on initial mount
    loadLanguage();

    if (Platform.OS !== 'web') {
      // Only listen to AppState changes on mobile
      const handleAppStateChange = (nextAppState) => {
        const systemLocale = Localization.getLocales()[0].languageTag;
        if (nextAppState === 'active' && systemLocale !== locale) {
          setLocale(systemLocale);
          loadLanguage(); // Refresh language if system locale has changed
        }
      };

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    } else {
      // Handle the focus and blur events for web
      const handleFocus = () => {
        const systemLocale = Localization.getLocales()[0].languageTag;
        if (systemLocale !== locale) {
          setLocale(systemLocale);
          loadLanguage(); // Refresh language if system locale has changed
          console.log("focus web1:");
        }
      };

      window.addEventListener('focus', handleFocus);
      console.log("focus web2:");

      return () => {
        window.removeEventListener('focus', handleFocus);
        console.log("focus web3:");
      };
    }
  }, [locale]);

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      setI18nConfig(language); // Set I18n locale to selected language
      setSelectedLanguage(language);
      console.log("Language saved and set:", language);
    } catch (error) {
      console.error("Failed to save the language", error);
    }
  };

  const greeting = i18n.t('greeting');
  console.log("Greeting:", greeting);
  console.log("Selected Language:", selectedLanguage);
  console.log("System Locale:", locale);



  return (
    <View style={styles.container}> 
    <ImageBackground
      source={require('./assets/images/homepage.jpg')}
      style={styles.imageBackground} // Ensure it fills the entire screen
      imageStyle={{ resizeMode: 'cover' }} // Make sure the image covers the entire screen without white space
    >
      <Text style={styles.greeting}>{greeting}</Text>
      </ImageBackground>

      <View style={{ alignItems: 'center', marginTop: 20 }}></View>
      <View style={styles.buttonContainer}>
        <Button title="German" onPress={() => saveLanguage('de')}  color="#fd9a25"/>
        <Button title="Latvian" onPress={() => saveLanguage('lv')} color="#fd9a25" />
        <Button title="English" onPress={() => saveLanguage('en')} color="#fd9a25"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return <AppContent />;
}

