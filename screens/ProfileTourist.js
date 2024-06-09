// ProfileTourist.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { auth, db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import LoadingOverlay from "../components/LoadingOverlay"; // Import du composant LoadingOverlay
import { useNavigation } from "@react-navigation/native";

export default function ProfileTourist() {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false); // Nouvel état pour gérer la déconnexion

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const q = query(
            collection(db, "Tourist"),
            where("uid", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUser({ id: doc.id, ...doc.data() }); // Inclure l'identifiant du document
            });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      setSigningOut(true); // Marquer la déconnexion en cours
      await signOut(auth);
      navigation.navigate("Acceuil");
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setSigningOut(false); // Terminé, marquer la déconnexion comme terminée
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading || signingOut ? ( // Ajouter signingOut ici
        <LoadingOverlay /> // Utilisation du composant LoadingOverlay lors du chargement ou de la déconnexion
      ) : (
        <View>
          {/* Contenu du profil */}
          <View style={styles.header}>
            <Avatar.Image
              size={80}
              source={{
                uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsfGVufDB8fDB8fHww"
              }}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Icon name="person" size={30} color="#000" />
              <Text style={styles.infoText}>
                {user.firstName} {user.lastName}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="email" size={30} color="#000" />
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="flag" size={30} color="#000" />
              <Text style={styles.infoText}>{user.nationality}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="phone" size={30} color="#000" />
              <Text style={styles.infoText}>{user.number}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="cake" size={30} color="#000" />
              <Text style={styles.infoText}>
                {user.dateOfBirth ? formatDate(user.dateOfBirth) : "N/A"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EditProfile", { user })}
            >
              <Text style={styles.buttonText}>Modifier mon profile </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signOutButton]}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 320,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center"
  },
  signOutButton: {
    backgroundColor: "#FF3B30"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20
  }
});
