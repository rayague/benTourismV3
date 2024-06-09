import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { doc, updateDoc } from "firebase/firestore"; // Importer les fonctions de Firestore nécessaires
import { db } from "../firebaseConfig"; // Importer la référence à votre base de données Firestore

export default function EditProfileTourist({ route, navigation }) {
  // Récupérer les données de l'utilisateur passées en paramètre depuis la navigation
  const { user } = route.params;

  // États pour stocker les nouvelles informations
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [nationality, setNationality] = useState(user.nationality || "");
  const [number, setNumber] = useState(user.number || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dateOfBirth
      ? user.dateOfBirth.toDate().toLocaleDateString("fr-FR")
      : ""
  );

  // Fonction pour sauvegarder les modifications
  const saveChanges = async () => {
    try {
      console.log("Sauvegarde des modifications...");
      console.log("user.id:", user.id);

      // Créer une référence au document de l'utilisateur à mettre à jour
      const userRef = doc(db, "Tourist", user.id);

      // Créer un objet contenant les données mises à jour
      const updatedUserData = {};

      // Vérifier et ajouter les valeurs modifiées
      if (firstName.trim() !== "" && firstName !== user.firstName) {
        updatedUserData.firstName = firstName.trim();
      }
      if (lastName.trim() !== "" && lastName !== user.lastName) {
        updatedUserData.lastName = lastName.trim();
      }
      if (email.trim() !== "" && email !== user.email) {
        updatedUserData.email = email.trim();
      }
      if (nationality.trim() !== "" && nationality !== user.nationality) {
        updatedUserData.nationality = nationality.trim();
      }
      if (number.trim() !== "" && number !== user.number) {
        updatedUserData.number = number.trim();
      }
      if (dateOfBirth.trim() !== "" && dateOfBirth !== user.dateOfBirth) {
        updatedUserData.dateOfBirth = new Date(
          dateOfBirth.split("/").reverse().join("-")
        ); // Convertir en objet Date
      }

      console.log("updatedUserData:", updatedUserData);

      // Mettre à jour les données du document seulement si des modifications sont présentes
      if (Object.keys(updatedUserData).length > 0) {
        await updateDoc(userRef, updatedUserData);
        // Afficher un message d'alerte pour indiquer que les modifications ont été enregistrées
        Alert.alert("Modifications enregistrées avec succès");
      } else {
        Alert.alert("Aucune modification détectée");
      }

      // Une fois les modifications sauvegardées, vous pouvez naviguer vers le profil
      navigation.navigate("Dashboard Touriste");
    } catch (error) {
      console.error("Error saving changes: ", error);
      // Gérer les erreurs de sauvegarde
      Alert.alert(
        "Erreur lors de l'enregistrement des modifications. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Prénom"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Nom"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={nationality}
        onChangeText={setNationality}
        placeholder="Nationalité"
      />
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="Numéro de téléphone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="Date de naissance (jj/mm/aaaa)"
      />
      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});
