import { PDFDocument, rgb } from "pdf-lib";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { decode as atob } from "base-64";

export const generateTicket = async (bookingId) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Nous avons besoin de votre permission pour accéder à la bibliothèque multimédia."
      );
      return;
    }

    // Récupérer les données de la réservation depuis la table "booking"
    console.log("Fetching booking data...");
    const bookingRef = doc(db, "booking", bookingId);
    const bookingDoc = await getDoc(bookingRef);

    if (!bookingDoc.exists()) {
      console.error("No booking found with the provided ID");
      Alert.alert("Erreur", "Aucune réservation trouvée avec l'ID fourni");
      return;
    }

    const booking = bookingDoc.data();
    console.log("Booking data:", booking);

    // Créer un nouveau document PDF
    console.log("Creating PDF document...");
    const pdfDoc = await PDFDocument.create();

    // Ajouter une page au document
    const page = pdfDoc.addPage([300, 600]);

    // Charger une image de tourisme
    const tourismImageUri = await FileSystem.downloadAsync(
      "https://example.com/tourism_image.jpg", // URL de votre image
      `${FileSystem.documentDirectory}tourism_image.jpg`
    );
    const tourismImageBytes = await FileSystem.readAsStringAsync(
      tourismImageUri.uri,
      { encoding: FileSystem.EncodingType.Base64 }
    );
    const tourismImage = await pdfDoc.embedJpg(atob(tourismImageBytes));

    // Ajouter l'image à la page
    const imageDims = tourismImage.scale(0.25);
    page.drawImage(tourismImage, {
      x: 50,
      y: page.getHeight() - imageDims.height - 50,
      width: imageDims.width,
      height: imageDims.height
    });

    // Ajouter du texte à la page
    page.drawText("Réservation", {
      x: 50,
      y: page.getHeight() - imageDims.height - 100,
      size: 20,
      color: rgb(0, 0, 0)
    });
    page.drawText(`Agence: ${booking.agency || "Agence non disponible"}`, {
      x: 50,
      y: page.getHeight() - imageDims.height - 140
    });
    page.drawText(`Site: ${booking.site || "Non disponible"}`, {
      x: 50,
      y: page.getHeight() - imageDims.height - 160
    });
    page.drawText(`Montant: ${booking.amount || "Non disponible"}`, {
      x: 50,
      y: page.getHeight() - imageDims.height - 180
    });
    page.drawText(
      `Nombre de personnes: ${booking.numberOfPeople || "Non disponible"}`,
      { x: 50, y: page.getHeight() - imageDims.height - 200 }
    );
    page.drawText(`Prix: ${booking.price || "Non disponible"}`, {
      x: 50,
      y: page.getHeight() - imageDims.height - 220
    });
    page.drawText(
      `Date: ${
        new Date(booking.date.seconds * 1000).toLocaleDateString() ||
        "Non disponible"
      }`,
      { x: 50, y: page.getHeight() - imageDims.height - 240 }
    );
    page.drawText(`Heure: ${booking.time || "Non disponible"}`, {
      x: 50,
      y: page.getHeight() - imageDims.height - 260
    });

    // Enregistrer le document PDF
    console.log("Saving PDF document...");
    const pdfBytes = await pdfDoc.save();
    const pdfUri = `${FileSystem.documentDirectory}ticket.pdf`;
    await FileSystem.writeAsStringAsync(pdfUri, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64
    });

    // Enregistrer le PDF dans la bibliothèque multimédia de l'appareil
    console.log("Saving PDF to media library...");
    await MediaLibrary.saveToLibraryAsync(pdfUri);

    console.log("PDF generated and saved:", pdfUri);
    Alert.alert("Succès", "Le PDF a été généré et sauvegardé");
  } catch (error) {
    console.error("Error generating PDF:", error);
    Alert.alert(
      "Erreur",
      "Une erreur est survenue lors de la génération du PDF"
    );
  }
};
