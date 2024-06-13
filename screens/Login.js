import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Assurez-vous que le chemin est correct
import LoadingOverlay from "../components/LoadingOverlay";
import { getUserType } from "../services/UserService"; // Assurez-vous que le chemin est correct
import { getUserTypeByEmail } from "../services/UserService";
import { userTypeContext } from "../context/userTypeContext";

const facebook = require("../assets/images/user.png");

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {userType, setUserType} = useContext(userTypeContext);

  const handleForgotPassword = () => {
    navigation.navigate("Mot de passe oublié");
  };

  const handleRegister = () => {
    navigation.navigate("Inscription");
  };

  const handleLoginAgency = () => {
    navigation.navigate("Connexion Agence");
  };

  const handleLogin = async () => {
    console.log("Début de la connexion...");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Utilisateur connecté:", userCredential.user);
      const userEmail = userCredential.user.email;

      console.log(`Fetching user type for user email: ${userEmail}`);
      const userType = await getUserTypeByEmail(userEmail);

      if (userType) {
        setUserType(userType);
        console.log(`User type found: ${userType}`);
        if (userType === "touriste") {
          console.log("Redirecting to Dashboard Touriste");
          navigation.navigate("Dashboard Touriste");
        } else if (userType === "agence touristique") {
          console.log("Redirecting to Dashboard Agence");
          navigation.navigate("Dashboard Agence");
        } else {
          console.log("Unknown user type");
          Alert.alert("Erreur", "Type d'utilisateur inconnu."); 
        }
      } else {
        console.log("User type not found");
        Alert.alert("Erreur", "Type d'utilisateur non trouvé.");
      }
    } catch (error) {
      console.error("Erreur de connexion: ", error);
      Alert.alert("Erreur", "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
      console.log("Fin de la connexion.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingOverlay />}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={facebook} style={styles.image} resizeMode="contain" />
        <View style={styles.inputView}>
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
            placeholder="Votre Mot de Passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.rememberView}>
          <Pressable onPress={handleForgotPassword}>
            <Text style={styles.forgetText}>Mot de passe oublié?</Text>
          </Pressable>
        </View>
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se Connecter</Text>
          </Pressable>
        </View>
        <Text style={styles.footerText} onPress={handleRegister}>
          Pas de compte ? <Text style={styles.signup}>S'inscrire</Text>
        </Text>
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
  image: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 300
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
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
    textAlign: "center",
    marginHorizontal: "auto"
  },
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
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 50
  },
  forgetText: {
    color: "red"
  },
  footerText: {
    color: "#000",
    marginBottom: 20
  },
  signup: {
    // fontWeight: "bold",
    color: "red"
  },
  connexionAgence: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: "auto",
    marginBottom: 20
  },
  connexionAgenceText: {
    color: "#000"
  }
});
