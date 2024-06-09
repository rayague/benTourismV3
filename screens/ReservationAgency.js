import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { generateTicket } from "../components/generateTicket";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ReservationAgency = ({ reservation }) => {
  const [status, setStatus] = useState(reservation.status || null);
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    try {
      const reservationRef = doc(db, "booking", reservation.id);
      await updateDoc(reservationRef, { status: "demande rejetée" });
      setStatus("rejected");
      Alert.alert("Succès", "La demande a été rejetée.");
    } catch (error) {
      console.error("Erreur lors du rejet de la demande :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors du rejet de la demande."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      const reservationRef = doc(db, "booking", reservation.id);
      await updateDoc(reservationRef, { status: "demande confirmée" });
      setStatus("accepted");
      Alert.alert("Succès", "La demande a été acceptée.");
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'acceptation de la demande."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTicket = async () => {
    setLoading(true);
    try {
      await generateTicket(reservation);
      console.log("Ticket généré avec succès");
      Alert.alert("Succès", "Le ticket a été généré avec succès.");
    } catch (error) {
      console.error("Erreur lors de la génération du ticket :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la génération du ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!loading && (
          <>
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
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="black"
              />
              <Text style={styles.description}>{`Site: ${
                reservation.site || "Non disponible"
              }`}</Text>
            </View>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={20}
                color="black"
              />
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
                new Date(
                  reservation.date.seconds * 1000
                ).toLocaleDateString() || "Non disponible"
              }`}</Text>
            </View>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons name="clock" size={20} color="black" />
              <Text style={styles.description}>{`Heure: ${
                reservation.time || "Non disponible"
              }`}</Text>
            </View>
            {status === null && (
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleAccept}
                  style={styles.button}
                >
                  Accepter la demande
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleReject}
                  style={styles.button}
                >
                  Refuser la demande
                </Button>
              </View>
            )}
            {status === "rejected" && (
              <Text style={styles.rejectedText}>Demande rejetée</Text>
            )}
            {status === "accepted" && (
              <Button
                mode="contained"
                onPress={handleGenerateTicket}
                style={styles.generateTicketButton}
              >
                Générer un ticket
              </Button>
            )}
          </>
        )}
      </Card.Content>
    </Card>
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
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    margin: 5
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
