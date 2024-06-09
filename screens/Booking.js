import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReservationItem from "../components/ReservationItem";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const Booking = () => {
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      // Gérer le cas où aucun utilisateur n'est connecté
      return;
    }

    const reservationsRef = collection(db, "booking");
    const reservationsQuery = query(
      reservationsRef,
      where("email", "==", user.email) // Filtrer par email de l'utilisateur connecté
    );

    const unsubscribe = onSnapshot(reservationsQuery, (snapshot) => {
      const reservationsList = [];
      snapshot.forEach((doc) => {
        const reservation = {
          id: doc.id,
          ...doc.data()
        };

        // Vérifier si la réservation existe déjà dans la liste
        const existingReservation = reservationsList.find(
          (item) => item.id === reservation.id
        );

        // Ajouter la réservation uniquement si elle n'existe pas déjà
        if (!existingReservation) {
          reservationsList.push(reservation);
        }
      });
      setReservations(reservationsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.bookingTextContainer}
        onPress={() => navigation.navigate("AddReservation")}
      >
        <Text style={styles.bookingText}>
          <MaterialCommunityIcons name="plus" size={20} color="#fff" /> Faire
          une réservation
        </Text>
      </Pressable>

      {reservations.length === 0 ? (
        <Text style={styles.noReservationsText}>
          Aucune réservation trouvée.
        </Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReservationItem reservation={item} />}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  bookingTextContainer: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20
  },
  bookingText: {
    color: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 16
  },
  noReservationsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20
  }
});

export default Booking;
