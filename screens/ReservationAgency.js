import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList
} from "react-native";
import { Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ReservationAgency = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserAndReservations = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setUserEmail(user.email);

        const q = query(
          collection(db, "booking"),
          where("agencyEmail", "==", user.email)
        );

        try {
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
        } finally {
          setLoading(false);
        }
      } else {
        Alert.alert("Erreur", "Utilisateur non connecté.");
        setLoading(false);
      }
    };

    fetchUserAndReservations();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderReservation = ({ item: reservation }) => (
    <Card style={styles.card}>
      <Card.Content>
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
          <MaterialCommunityIcons
            name="account-group"
            size={20}
            color="black"
          />
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
          <Button mode="contained" style={styles.generateTicketButton}>
            Générer un ticket
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={reservations}
      renderItem={renderReservation}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5
  },
  description: {
    fontSize: 14,
    marginLeft: 5
  },
  rejectedText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  },
  generateTicketButton: {
    marginTop: 10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ReservationAgency;
