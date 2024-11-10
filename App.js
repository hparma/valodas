import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Localization from 'react-native-localize';
import { i18n, setI18nConfig } from './i18n';
import { styles } from './styles'; 
import { ImageBackground } from 'react-native'; 


const AppContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale); // mainīgiem iedot i18
  const [locale, setLocale] = useState(Localization.getLocales()[0].languageTag); //saglabā valodu


  //funkcija kas parāda valodas izvēli
  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language'); //pārbauda vai ir jau ir valoda
      console.log("Loaded Language from Storage:", savedLanguage);
      if (savedLanguage) { // ja ir saglabāta tad izmanto to
        setI18nConfig(savedLanguage); 
        setSelectedLanguage(savedLanguage);
      } else { // ja nav tad izmanto to kas ir sistēmā
        const systemLocale = Localization.getLocales()[0].languageTag;
        setI18nConfig(systemLocale); 
        setSelectedLanguage(systemLocale);
      }
      console.log("Current Locale Set:", i18n.locale);//test
    } catch (error) {
      console.error("Failed to load the language", error); //test
    }
  };

  
  useEffect(() => {
    // Load language on initial mount
    loadLanguage();

    if (Platform.OS !== 'web') { //izmaiņas mobīlā aplikācijā
      const handleAppStateChange = (nextAppState) => {
        const systemLocale = Localization.getLocales()[0].languageTag;
        if (nextAppState === 'active' && systemLocale !== locale) {
          setLocale(systemLocale);
          loadLanguage(); // Refresh language if system locale has changed
        }
      };
        //atkārtoti ielādē valodu, ja lietotne kļūst aktīva un ir mainīta sistēmas lokalizācija
      AppState.addEventListener('change', handleAppStateChange); 
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    } else {
      const handleFocus = () => {
        const systemLocale = Localization.getLocales()[0].languageTag;
        if (systemLocale !== locale) {
          setLocale(systemLocale);
          loadLanguage(); // Refresh language if system locale has changed
          console.log("focus web1:");
        }
      };

      window.addEventListener('focus', handleFocus);
      console.log("focus web2:"); //test pārbauda vai atpakaļ fokuss un refresh

      return () => {
        window.removeEventListener('focus', handleFocus);
        console.log("focus web3:"); //test pārbauda vai atpakaļ fokuss un refresh
      };
    }
  }, [locale]);

  //saglabā valodas izv;eli
  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      setI18nConfig(language); 
      setSelectedLanguage(language);
      console.log("Language saved and set:", language); //test
    } catch (error) {
      console.error("Failed to save the language", error); //test
    }
  };

  const greeting = i18n.t('greeting');
  console.log("Greeting:", greeting);
  console.log("Selected Language:", selectedLanguage);
  console.log("System Locale:", locale);


//izkats/ front end
  return (
    <View style={styles.container}> 
<ImageBackground
  source={
 
require('./assets/images/homepage.jpg')}
  style={styles.
  style={sty
imageBackground} 
  resizeMode="cover"
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

