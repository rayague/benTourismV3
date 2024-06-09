

import { db } from './firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const seedAgency = async (agencyData) => {
  try {
    const agencyCollection = collection(db, 'Agency');
    await Promise.all(agencyData.map(async (agency) => {
      await addDoc(agencyCollection, agency);
    }));
    console.log('Données des agences semées avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding des données des agences:', error);
  }
};

export { seedAgency };

