import { db } from './firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const seedTouristicSite = async (touristicSiteData) => {
  try {
    const touristicSiteCollection = collection(db, 'touristicSite');
    await Promise.all(touristicSiteData.map(async (touristicSite) => {
      await addDoc(touristicSiteCollection, touristicSite);
    }));
    console.log('Données des agences semées avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding des données des agences:', error);
  }
};

export { seedTouristicSite };

