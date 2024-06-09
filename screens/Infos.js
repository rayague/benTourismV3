import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import InfoFoods from '../components/InfoFoods';
import CulturesList from '../components/CulturesList';

const Infos = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <InfoFoods />
        <CulturesList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  mapContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 350, // La carte occupera la moitié de la hauteur de l'écran
    width: '100%', // La carte occupera toute la largeur disponible
    backgroundColor: '#ddd',
  },
  map: {
    height: 200,
    width: 200,
  },
});

export default Infos;
