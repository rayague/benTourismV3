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
import { requestMediaLibraryPermissions } from "../components/requestMediaLibraryPermissions"; // Importez votre fonction ici
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import generateTicket from "../components/generateTicket";

const NotificationsAgency = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // For individual action loading

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("No user is logged in");
        Alert.alert("Erreur", "Utilisateur non connecté.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "booking"),
            where("agencyEmail", "==", user.email)
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
      }
      setLoading(false);
    };

    fetchReservations();
  }, [user]);

  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await requestMediaLibraryPermissions();
      if (!granted) {
        // Gérer le cas où la permission est refusée
        Alert.alert(
          "Permission nécessaire",
          "Vous devez accorder la permission d'accès à la bibliothèque multimédia pour générer des tickets."
        );
      }
    };

    requestPermissions();
  }, []);

  const handleAccept = async (reservationId) => {
    setActionLoading(reservationId);
    console.log(`Accepting reservation ${reservationId}`);
    try {
      const reservationRef = doc(db, "booking", reservationId);
      await updateDoc(reservationRef, { status: "accepted" });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, status: "accepted" }
            : reservation
        )
      );
      console.log(`Reservation ${reservationId} accepted`);
    } catch (error) {
      console.error("Error accepting reservation:", error);
      Alert.alert("Erreur", "Erreur lors de l'acceptation de la réservation.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reservationId) => {
    setActionLoading(reservationId);
    console.log(`Rejecting reservation ${reservationId}`);
    try {
      const reservationRef = doc(db, "booking", reservationId);
      await updateDoc(reservationRef, { status: "rejected" });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, status: "rejected" }
            : reservation
        )
      );
      console.log(`Reservation ${reservationId} rejected`);
    } catch (error) {
      console.error("Error rejecting reservation:", error);
      Alert.alert("Erreur", "Erreur lors du rejet de la réservation.");
    } finally {
      setActionLoading(null);
    }
  };

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
            console.log(`Generating ticket for reservation ${reservation.id}`);
            generateTicket(reservation.id);
          }}
        />
      )}
      {reservation.status === "en attente" && (
        <View style={styles.buttonContainer}>
          {actionLoading === reservation.id ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <Button
                title="Accepter la demande"
                onPress={() => handleAccept(reservation.id)}
              />
              <View style={{ width: 20, height: 20 }} />
              <Button
                title="Refuser la demande"
                onPress={() => handleReject(reservation.id)}
              />
            </>
          )}
        </View>
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
    backgroundColor: "#fff",
    elevation: 10
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
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10
  }
});

export default NotificationsAgency;
