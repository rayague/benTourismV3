import React, { useState, useContext } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Modal,
  Text,
  Platform,
  ActivityIndicator,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoadingOverlay from "../components/LoadingOverlay";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { db, auth } from "../firebaseConfig"; // Assurez-vous que le chemin est correct
import { collection, addDoc } from "firebase/firestore";
// import { hash } from 'scrypt';
import ProfileTourist from "./ProfileTourist";

const facebook = require("../assets/images/user.png");

export default function Register() {
  const navigation = useNavigation();

  const [userInfos, setUserInfos] = useState(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollY = new Animated.Value(0);

  const animatedStyles = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ["0deg", "-15deg"],
    extrapolate: "clamp"
  });

  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleLogin = () => {
    navigation.navigate("Connexion", { screen: "Login" });
  };

  const confirmDateSelection = () => {
    setShowDatePicker(false);
  };

  const handleRegister = async () => {
    try {
      // Vérifiez si tous les champs sont remplis
      if (
        !lastName ||
        !firstName ||
        !nationality ||
        !email ||
        !number ||
        !password
      ) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
        return;
      }

      setLoading(true);

      // Créez un nouvel utilisateur avec email et mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Ajoutez les informations de l'utilisateur dans la collection "Tourist"
      const touristDocRef = await addDoc(collection(db, "Tourist"), {
        lastName,
        firstName,
        nationality,
        email,
        number,
        dateOfBirth: selectedDate,
        uid: userCredential.user.uid // Associez le document à l'ID utilisateur Firebase Auth
      });

      console.log("Tourist document written with ID: ", touristDocRef.id);

      // Maintenant que l'utilisateur est enregistré en tant que touriste, vous pouvez migrer les informations vers la table "User"
      // const hashedPassword = await hash(password, hash_config); // Hacher le mot de passe

      // Ajouter les informations dans la table "User"
      const userDocRef = await addDoc(collection(db, "User"), {
        email,
        password,
        id: touristDocRef.id, // Utilisez l'ID du document de touriste comme ID dans la table "User"
        type_user: "touriste", // Toujours "touriste" à ce stade
        id_connected: null // Par défaut, ID connecté est null
      });

      console.log("User document written with ID: ", userDocRef.id);

      // Créer un objet contenant les informations de l'utilisateur
      const userInfo = {
        lastName,
        firstName,
        nationality,
        email,
        number,
        dateOfBirth: selectedDate,
        uid: userCredential.user.uid,
        userDocId: userDocRef.id,
        touristDocId: touristDocRef.id
      };

      // Afficher les informations de l'utilisateur dans la console
      console.log("User Info: ", userInfo);

      navigation.navigate("Dashboard Touriste");

      setUserInfos(userInfo);
    } catch (error) {
      console.log("Error creating user: ", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={loading} /> 
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.Image
          source={facebook}
          style={[styles.image, { transform: [{ rotate: animatedStyles }] }]}
          resizeMode="contain"
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Votre Nom"
            value={lastName}
            onChangeText={setLastName}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Vos ou Votre Prénom"
            value={firstName}
            onChangeText={setFirstName}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Votre Nationalité"
            value={nationality}
            onChangeText={setNationality}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable style={styles.dateInput} onPress={toggleDatePicker}>
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString("en-GB")}
            </Text>
          </Pressable>
          <Modal visible={showDatePicker} animationType="slide">
            <View style={styles.modalContainer}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
              <Pressable onPress={confirmDateSelection}>
                <Text>Confirm</Text>
              </Pressable>
            </View>
          </Modal>
          <TextInput
            style={styles.input}
            placeholder="Votre Email"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Votre Numéro"
            value={number}
            onChangeText={setNumber}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de Passe"
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.rememberView}>
          <View style={styles.switch}></View>
          <View>
            <Pressable onPress={() => Alert.alert("Forget Password!")}>
              <Text onPress={handleLogin}>
                J'ai déjà un compte ?{" "}
                <Text style={styles.connexionText}>Me connecter</Text>
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
            {loading && <ActivityIndicator />}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dateInput: {
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    color: "#4CAF50",
    borderRadius: 7
  },
  image: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 300,
    elevation: 20
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 7
    // elevation: 1,
  },
  connexionText: {
    color: "red"
    // fontWeight: 'bold',
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 25,
    textAlign: "center",
    marginHorizontal: "auto"
  },
  switch: {},
  button: {
    backgroundColor: "#4CAF50",
    height: 45,
    borderColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonView: {
    elevation: 20,
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 50
  },
  dateText: {
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 20
  }
});
