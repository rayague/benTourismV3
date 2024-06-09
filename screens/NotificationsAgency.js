import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import ReservationAgency from "../components/ReservationAgency";

const NotificationsAgency = () => {
  const [reservations, setReservations] = useState([]);
  const [agencyId, setAgencyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current agency ID
    const fetchAgencyId = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const agencyQuery = query(
            collection(db, "Agency"),
            where("uid", "==", currentUser.uid)
          );
          const agencySnapshot = await getDocs(agencyQuery);
          if (!agencySnapshot.empty) {
            const agencyDoc = agencySnapshot.docs[0];
            setAgencyId(agencyDoc.id);
            console.log("Agency ID: ", agencyDoc.id); // Log Agency ID for debugging
          } else {
            console.log("No such document for the agency!");
          }
        }
      } catch (error) {
        console.error("Error fetching agency ID: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyId();
  }, []);

  useEffect(() => {
    if (agencyId) {
      // Fetch reservations for the current agency
      const q = query(
        collection(db, "bookings"),
        where("agencyId", "==", agencyId)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reservationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setReservations(reservationsList);
        console.log("Reservations: ", reservationsList); // Log reservations for debugging
      });

      return () => unsubscribe();
    }
  }, [agencyId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reservations.length === 0 ? (
        <Text style={styles.noDataText}>Aucune réservation trouvée</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReservationAgency reservation={item} />}
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
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NotificationsAgency;
