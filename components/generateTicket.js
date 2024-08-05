import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Remplacez par votre configuration Firebase
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { Alert, Platform, Share } from "react-native";

// Fonction pour obtenir les données de réservation depuis Firestore
const fetchBookingData = async (reservationId) => {
  try {
    const reservationRef = doc(db, "booking", reservationId);
    const docSnap = await getDoc(reservationRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Aucune donnée trouvée pour cette réservation.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de réservation:",
      error
    );
    throw error;
  }
};

// Fonction pour mettre à jour le statut de la réservation
const handleReject = async (reservationId) => {
  try {
    const reservationRef = doc(db, "booking", reservationId);
    await updateDoc(reservationRef, { status: "demande rejetée" });
    Alert.alert("Succès", "La demande a été rejetée.");
  } catch (error) {
    console.error("Erreur lors du rejet de la demande :", error);
    Alert.alert(
      "Erreur",
      "Une erreur est survenue lors du rejet de la demande."
    );
  }
};

// Fonction pour générer un ticket PDF
const generateTicket = async (reservationId) => {
  try {
    console.log(`Generating ticket for reservation ${reservationId}`);

    // Obtenez les données de réservation
    const bookingData = await fetchBookingData(reservationId);

    if (!bookingData) {
      throw new Error("Failed to fetch booking data");
    }

    // Créez le contenu HTML pour le PDF
    const htmlContent = `
      <h1>Ticket de Réservation</h1>
      <p>Agence: ${bookingData.agency}</p>
      <p>Montant: ${bookingData.amount}</p>
      <p>Date: ${new Date(
        bookingData.date.seconds * 1000
      ).toLocaleDateString()}</p>
      <p>Heure: ${bookingData.time}</p>
      <p>Nombre de personnes: ${bookingData.numberOfPeople}</p>
      <p>Site: ${bookingData.site.title}</p>
    `;

    console.log("Creating PDF document...");

    // Générer le PDF
    const { uri: pdfUri } = await Print.printToFileAsync({ html: htmlContent });
    console.log(`PDF created at ${pdfUri}`);

    // Enregistrez le PDF dans le répertoire de documents de l'appareil
    const fileUri = `${FileSystem.documentDirectory}Ticket_${reservationId}.pdf`;
    await FileSystem.moveAsync({
      from: pdfUri,
      to: fileUri
    });

    console.log("PDF saved at", fileUri);

    // Partagez ou ouvrez le fichier
    if (Platform.OS === "ios") {
      await Share.share({
        url: fileUri,
        title: "Votre ticket PDF"
      });
    } else {
      await Share.share({
        url: fileUri,
        title: "Votre ticket PDF"
      });
    }

    Alert.alert("Succès", "Le PDF a été généré et sauvegardé");
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error.message);
    Alert.alert(
      "Erreur",
      "Une erreur est survenue lors de la génération du PDF: " + error.message
    );
  }
};

export default generateTicket;
