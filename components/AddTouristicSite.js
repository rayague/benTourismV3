import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Importer les fonctions nécessaires de Firestore
import { db } from "../firebaseConfig"; // Assurez-vous que votre fichier firebaseConfig exporte db
import { AuthContext } from "../AuthContext"; // Importer le contexte d'authentification

const AddTouristicSite = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Utiliser le contexte pour obtenir l'utilisateur connecté
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
      console.log("Requesting permission to access media library...");
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
      }
    };

    requestPermission();
  }, []);

  const handleImagePick = async () => {
    console.log("Opening image picker...");
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Image picker result: ", pickerResult);
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setImage(pickerResult.assets[0].uri);
      console.log("Image selected: ", pickerResult.assets[0].uri);
    }
  };

  const validateFields = () => {
    if (!title || !location || !latitude || !longitude || !description || !image || !price) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return false;
    }
    if (isNaN(latitude) || isNaN(longitude) || isNaN(price)) {
      Alert.alert("Erreur", "Latitude, Longitude et Prix doivent être des nombres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

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
      datePosted: new Date().toISOString(),
      userEmail: user.email // Ajouter l'email de l'utilisateur connecté
    };

    console.log("Submitting new touristic site: ", newTouristicSite);

    try {
      // Vérification des documents existants avec getDocs
      const querySnapshot = await getDocs(collection(db, "touristicSites"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });

      // Ajout du nouveau site touristique
      const docRef = await addDoc(collection(db, "touristicSites"), newTouristicSite);
      console.log("Touristic site added successfully with ID: ", docRef.id);
      navigation.goBack();
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
        placeholder="Exemple: 2.0743"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Décrire le site touristique"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: 5000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <FontAwesome name="camera" size={24} color="black" />
        <Text>Choisir une image</Text>
      </TouchableOpacity>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : null}
      <Button title="Ajouter un site touristique" onPress={handleSubmit} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default AddTouristicSite;
