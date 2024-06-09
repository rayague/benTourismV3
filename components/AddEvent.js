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

const AddEvent = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agency, setAgency] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const db = firebase.firestore();
    const newEvent = {
      title,
      description,
      agency,
      image,
      datePosted: new Date().toISOString()
    };

    try {
      console.log("Adding event to Firestore");
      await db.collection("events").add(newEvent);
      console.log("Event added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding event: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Conférence sur le Climat"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Décrivez l'événement..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Agence</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Agence Environnementale"
        value={agency}
        onChangeText={setAgency}
      />
      <Button
        title="Ajouter Événement"
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

export default AddEvent;
