import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  Button
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ReservationAgency = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const q = query(
            collection(db, "booking"),
            where("name", "==", user.displayName) // Modification ici
          );
          const querySnapshot = await getDocs(q);
          const reservationsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setReservations(reservationsData);
        } catch (error) {
          console.error("Error fetching reservations:", error);
          Alert.alert(
            "Erreur",
            "Erreur lors de la récupération des réservations."
          );
        }
      } else {
        console.log("No user is logged in");
        Alert.alert("Erreur", "Utilisateur non connecté.");
      }

      setLoading(false);
    };

    fetchReservations();
  }, []);

  const renderReservation = ({ item: reservation }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons
          name="office-building"
          size={20}
          color="black"
        />
        <Text style={styles.title}>
          {reservation.agency || "Agence non disponible"}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="map-marker" size={20} color="black" />
        <Text style={styles.description}>{`Site: ${
          reservation.site || "Non disponible"
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="currency-usd" size={20} color="black" />
        <Text style={styles.description}>{`Montant: ${
          reservation.amount || "Non disponible"
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="account-group" size={20} color="black" />
        <Text style={styles.description}>{`Nombre de personnes: ${
          reservation.numberOfPeople || "Non disponible"
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="tag" size={20} color="black" />
        <Text style={styles.description}>{`Prix: ${
          reservation.price || "Non disponible"
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="calendar" size={20} color="black" />
        <Text style={styles.description}>{`Date: ${
          new Date(reservation.date.seconds * 1000).toLocaleDateString() ||
          "Non disponible"
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="clock" size={20} color="black" />
        <Text style={styles.description}>{`Heure: ${
          reservation.time || "Non disponible"
        }`}</Text>
      </View>
      {reservation.status === "rejected" && (
        <Text style={styles.rejectedText}>Demande rejetée</Text>
      )}
      {reservation.status === "accepted" && (
        <Button
          title="Générer un ticket"
          onPress={() => {
            /* handle ticket generation */
          }}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={reservations}
      renderItem={renderReservation}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    padding: 20
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold"
  },
  description: {
    marginLeft: 10
  },
  rejectedText: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10
  }
});

export default ReservationAgency;
