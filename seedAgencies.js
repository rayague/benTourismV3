import { db } from "./firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const seedAgencies = async () => {
  try {
    for (const agency of agenciesData) {
      const docRef = await addDoc(collection(db, "User"), agency);
      console.log("Document written with ID: ", docRef.id);
    }
    Alert.alert("Succès", "Toutes les agences ont été ajoutées avec succès.");
  } catch (error) {
    console.error("Error adding document: ", error);
    Alert.alert("Erreur", "Erreur lors de l'ajout des agences.");
  }
};

export { seedAgencies };
