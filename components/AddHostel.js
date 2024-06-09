import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

const AddHostel = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const db = firebase.firestore();
    const newHostel = {
      name,
      location,
      description,
      image,
      pricePerNight: parseFloat(pricePerNight),
      contactInfo,
      datePosted: new Date().toISOString()
    };

    try {
      console.log("Adding hostel to Firestore");
      await db.collection("hostels").add(newHostel);
      console.log("Hostel added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding hostel: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Auberge du Lac"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Emplacement</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Cotonou"
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Décrivez l'auberge..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Prix par Nuit</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: 5000.0"
        value={pricePerNight}
        onChangeText={setPricePerNight}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Informations de Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: +229 12345678"
        value={contactInfo}
        onChangeText={setContactInfo}
      />
      <Button
        title="Ajouter Hostel"
        onPress={handleSubmit}
        disabled={loading}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="#6200ee"
          style={styles.loading}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    width: "100%"
  },
  loading: {
    marginTop: 20
  }
});

export default AddHostel;
