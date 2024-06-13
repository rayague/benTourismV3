import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Fonction pour récupérer l'UUID de l'utilisateur à partir de l'e-mail
export const getUUIDByEmail = async (email) => {

  const firestore = getFirestore(firebaseConfig);
  try {
    // Requête pour obtenir l'utilisateur avec cet email
    const q = query(collection(firestore, "User"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Aucun utilisateur trouvé avec cet email");
      return null;
    } else {
      // Supposons qu'il n'y a qu'un seul utilisateur avec cet email
      const userData = querySnapshot.docs[0].data();
      console.log(userData);
      const userType = userData.type_user;
      if (userType === "agence touristique") {
        console.log(`UUID de l'utilisateur pour ${email}: ${userData.uuid}`);
        return userData.uuid;
      } else {
        console.log(
          `L'utilisateur avec l'email ${email} n'est pas une agence touristique.`
        );
        return null;
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'UUID de l'utilisateur:",
      error
    );
    throw error;
  }
};

// Fonction pour récupérer le type de l'utilisateur à partir de l'e-mail
export const getUserTypeByEmail = async (email) => {
  const firestore = getFirestore(firebaseConfig);

  try {
    // Requête pour obtenir l'utilisateur avec cet email
    const q = query(collection(firestore, "User"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Aucun utilisateur trouvé avec cet email");
      return null;
    } else {
      // Supposons qu'il n'y a qu'un seul utilisateur avec cet email
      const userData = querySnapshot.docs[0].data();
      console.log(userData);
      const userType = userData.type_user;
      console.log(`Type d'utilisateur pour ${email}: ${userType}`);
      return userType;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du type de l'utilisateur:",
      error
    );
    throw error;
  }
};
