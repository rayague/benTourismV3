import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Button } from "react-native-paper";

const ReservationItem = ({ reservation }) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(reservation.status || "en attente");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reservationRef = doc(db, "booking", reservation.id);
    const unsubscribe = onSnapshot(reservationRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data && data.status) {
          setStatus(data.status);
        } else {
          setStatus("en attente");
        }
      } else {
        console.error("No such document!");
        setStatus("en attente");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [reservation.id]);

  const handleContactAgency = () => {
    Alert.alert(
      "Contactez l'agence",
      "Veuillez contacter l'agence pour plus d'informations."
    );
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      console.log("Payment process initiated");
      Alert.alert("Paiement", "Le processus de paiement a été initié.");
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Supprimer la réservation",
      "Êtes-vous sûr de vouloir supprimer cette réservation?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Oui",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, "booking", reservation.id));
              Alert.alert(
                "Réservation supprimée",
                "La réservation a été supprimée avec succès."
              );
            } catch (error) {
              console.error("Erreur lors de la suppression :", error);
              Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de la suppression."
              );
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EditReservation", { reservation })}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calendar" size={30} color="#007bff" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{reservation.agency}</Text>
        <Text style={styles.details}>
          <MaterialCommunityIcons name="calendar" size={16} color="#666" />{" "}
          {new Date(reservation.date.seconds * 1000).toLocaleDateString()}
        </Text>
        <Text style={styles.details}>
          <MaterialCommunityIcons name="clock" size={16} color="#666" />{" "}
          {reservation.time}
        </Text>
        <Text style={styles.details}>
          <MaterialCommunityIcons name="account" size={16} color="#666" />{" "}
          {reservation.numberOfPeople} personnes
        </Text>
        <Text style={styles.details}>
          <MaterialCommunityIcons name="currency-usd" size={16} color="#666" />{" "}
          {reservation.amount} (Prix unitaire: {reservation.price})
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View style={styles.statusContainer}>
            {status === "en attente" && (
              <Text style={styles.statusText}>
                Votre réservation est en attente.
              </Text>
            )}
            {status === "demande rejetée" && (
              <>
                <Text style={styles.statusRejected}>
                  Votre réservation a été rejetée.
                </Text>
                <Button
                  mode="outlined"
                  onPress={handleContactAgency}
                  style={styles.contactButton}
                >
                  Contacter l'agence
                </Button>
              </>
            )}
            {status === "demande confirmée" && (
              <Button
                mode="contained"
                onPress={handlePay}
                style={styles.payButton}
              >
                Payer
              </Button>
            )}
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              Supprimer
            </Button>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  },
  infoContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3
  },
  statusContainer: {
    marginTop: 10
  },
  statusText: {
    fontSize: 16,
    color: "orange",
    marginBottom: 10
  },
  statusRejected: {
    fontSize: 16,
    color: "red",
    marginBottom: 10
  },
  contactButton: {
    marginTop: 10
  },
  payButton: {
    marginTop: 10
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red"
  }
});

export default ReservationItem;
