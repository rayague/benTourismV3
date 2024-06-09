import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const AddTouristicSite = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
      }
    };

    requestPermission();
  }, []);

  const handleImagePick = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newTouristicSite = {
      title,
      location,
      locationOnMap: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      },
      description,
      image,
      price: parseFloat(price),
      datePosted: new Date().toISOString()
    };

    try {
      console.log("Sending touristic site to the server");
      const response = await fetch(
        "https://your-api-endpoint.com/touristicSite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newTouristicSite)
        }
      );

      if (response.ok) {
        console.log("Touristic site added successfully");
        navigation.goBack();
      } else {
        console.error("Error adding touristic site: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding touristic site: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Cascade de Kota"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Emplacement</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Dassa-Zoumè"
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: 7.7454"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: 2.1647"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Décrivez le site touristique..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.imagePicker}>
          <FontAwesome
            name="camera"
            size={24}
            color="black"
            style={styles.cameraIcon}
          />
          <Text style={styles.imagePickerText}>Choisir une image</Text>
        </View>
      </TouchableOpacity>
      {image ? (
        <Text style={styles.imageText}>Image sélectionnée: {image}</Text>
      ) : null}
      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: 15500.0"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <View style={{ width: "100%", height: 30 }} />
      <Button
        title="Ajouter Site Touristique"
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
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  cameraIcon: {
    marginRight: 10
  },
  imagePickerText: {
    fontSize: 16,
    marginHorizontal: "auto",
    marginVertical: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 150,
    textAlign: "center"
  },
  imageText: {
    fontSize: 14,
    marginTop: 5
  },
  loading: {
    marginTop: 20
  }
});

export default AddTouristicSite;
