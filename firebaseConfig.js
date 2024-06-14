import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import uuid from "react-native-uuid";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfX3rJaGvcH8VU-4p5LhNY6nFE1Ve2nso",
  authDomain: "tourism-348cf.firebaseapp.com",
  projectId: "tourism-348cf",
  storageBucket: "tourism-348cf.appspot.com",
  messagingSenderId: "88427767204",
  appId: "1:88427767204:web:9a3e18becee552a62ecd31"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const agencyData = [
  {
    name: "Explore Africa Tours",
    email: "contact@exploreafricatours.com",
    number: "+1234567890",
    address: "123 Safari Street, City, Country"
  },
  {
    name: "Tropical Adventures Ltd.",
    email: "info@tropicaladventures.com",
    number: "+0987654321",
    address: "456 Jungle Avenue, Town, Country"
  },
  {
    name: "Safari Seekers Travel",
    email: "info@safariseekers.com",
    number: "+1122334455",
    address: "789 Wilderness Road, City, Country"
  },
  {
    name: "Exotic Destinations Travel Agency",
    email: "info@exoticdestinations.com",
    number: "+9988776655",
    address: "101 Palm Beach Boulevard, Town, Country"
  },
  {
    name: "Adventure Trek Tours",
    email: "info@adventuretrektours.com",
    number: "+6677889900",
    address: "555 Mountain Trail, City, Country"
  }
];

const touristicSiteData = [
  {
    title: "Porte du Non-Retour",
    location: "Ouidah",
    locationOnMap: { latitude: 6.3645, longitude: 2.0886 },
    description:
      "La Porte du Non-Retour à Ouidah est un monument historique symbolisant le point de départ des Africains réduits en esclavage lors de la traite transatlantique des esclaves. Explorez sa signification et apprenez l'histoire de l'esclavage.",
    image:
      "https://prod.cdn-medias.jeuneafrique.com/medias/2017/04/05/ouidah_porte_non_retour_benin.jpg",
    price: 5000.0
  },
  {
    title: "Village Lacustre de Ganvié",
    location: "Abomey-Calavi",
    locationOnMap: { latitude: 6.4969, longitude: 2.4183 },
    description:
      "Ganvié est un village lacustre unique au Bénin, construit sur pilotis au milieu du lac Nokoué. Découvrez sa culture vibrante, ses maisons colorées et son mode de vie traditionnel.",
    image:
      "https://www.voyage-benin.com/cdn/bj-public/shutterstock_1150989716.jpg",
    price: 5100.0
  },
  {
    title: "Palais des Rois d'Allada",
    location: "Allada",
    locationOnMap: { latitude: 6.6625, longitude: 2.1514 },
    description:
      "Le Palais Royal d'Allada est un monument historique au Bénin, autrefois siège du Royaume d'Allada. Explorez son architecture, ses artefacts royaux et apprenez l'histoire du royaume.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Une_vue_des_embl%C3%A8mes_de_certains_rois_d%27Allada.jpg/1200px-Une_vue_des_embl%C3%A8mes_de_certains_rois_d%27Allada.jpg",
    price: 5300.0
  },
  {
    title: "Palais des Rois d'Abomey",
    location: "Abomey",
    locationOnMap: { latitude: 7.1828, longitude: 1.9938 },
    description:
      "Le Palais des Rois d'Abomey est un site du patrimoine mondial de l'UNESCO au Bénin, présentant l'histoire et la culture du Royaume du Dahomey. Explorez son architecture emblématique, ses reliques royales et ses expositions muséales.",
    image:
      "https://www.gobyava.com/wp-content/uploads/2020/12/couv-1632x816.jpg",
    price: 10000.0
  },
  {
    title: "Musée ethnographique Alexandre-Sénou Adandé",
    location: "Porto-Novo",
    locationOnMap: { latitude: 6.4972, longitude: 2.605 },
    description:
      "Le Musée ethnographique Alexandre-Sénou Adandé à Porto-Novo présente la diversité culturelle du Bénin à travers ses expositions sur les arts traditionnels, l'artisanat et les rituels. Explorez sa collection de masques, de sculptures et d'objets cérémoniels.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/75/11/f3/porto-novo.jpg?w=900&h=600&s=1",
    price: 15000.0
  },
  {
    title: "Musée Royal de Natitingou",
    location: "Natitingou",
    locationOnMap: { latitude: 10.306, longitude: 1.3782 },
    description:
      "Le Musée Royal de Natitingou présente le patrimoine culturel de la région de l'Atakora au Bénin. Explorez ses expositions sur l'artisanat traditionnel, les rituels et les artefacts historiques.",
    image:
      "https://oredolacultours.wordpress.com/wp-content/uploads/2021/01/fb_img_1611756700285168907946.jpg",
    price: 5100.0
  },
  {
    title: "Plage de Possotomé",
    location: "Possotomè",
    locationOnMap: { latitude: 6.8833, longitude: 1.9824 },
    description:
      "La plage de Possotomé est une destination pittoresque sur le lac Ahémé, dans le sud du Bénin, offrant des opportunités de baignade, de bain de soleil et de détente. Explorez ses rives sablonneuses, ses cocotiers et ses vues pittoresques.",
    image:
      "https://www.ecobenin.org/wp-content/uploads/Possotome_cocotier_plage_chez_prefet_pilotis_lac_aheme_ecotourisme_ecobenin_benin.jpg",
    price: 5100.0
  },
  {
    title: "Parc National de la Pendjari",
    location: "Nord Bénin",
    locationOnMap: { latitude: 11.0564, longitude: 1.4046 },
    description:
      "Le Parc National de la Pendjari est une zone protégée dans le nord du Bénin, réputée pour sa biodiversité riche et ses efforts de conservation de la faune sauvage. Partez pour un safari et observez des éléphants, des lions, des hippopotames et d'autres espèces.",
    image:
      "https://images.mnstatic.com/3c/92/3c924905bf5a8904cf0680734c9ab653.jpg",
    price: 19000.0
  },
  {
    title: "La Pierre Fendue",
    location: "Dassa-Zoumè",
    locationOnMap: { latitude: 7.7675, longitude: 2.1833 },
    description:
      "La Pierre Fendue de Dassa-Zoumè, un trésor naturel et culturel niché au cœur du Bénin, évoque un récit aussi fascinant que mystérieux. Cette remarquable formation géologique, située dans la commune de Dassa-Zoumè, incarne l'essence même du temps et de la légende.",
    image:
      "https://beninexcursion.com/wp-content/uploads/2020/05/IMG_0945-1-1000x658.jpg",
    price: 7500.0
  },
  {
    title: "La Grotte de la Vierge",
    location: "Dassa-Zoumè",
    locationOnMap: { latitude: 7.7453, longitude: 2.1681 },
    description:
      "A Dassa-Zoumé, la Grotte de la Vierge est une petite grotte, creusée en bas d’une colline, où serait apparue la Vierge. Elle est donc vite devenue un sanctuaire marial. Alors, tous les ans, vers le 15 août, un pèlerinage y draine des foules très nombreuses venant de tout le Bénin, mais même des pays voisins de la sous-région. Devant la grotte Arigbo, c’est son nom officiel, une",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Grotte_mariale_d%27Arigbo_.jpg",
    price: 7500.0
  }
];

const agenciesData = [
  {
    email: "contact@exploreafricatours.com",
    password: "explore123",
    type_user: "agence touristique",
    id_connected: null
  },
  {
    email: "info@tropicaladventures.com",
    password: "tropical123",
    type_user: "agence touristique",
    id_connected: null
  },
  {
    email: "info@safariseekers.com",
    password: "safari123",
    type_user: "agence touristique",
    id_connected: null
  },
  {
    email: "info@exoticdestinations.com",
    password: "exotic123",
    type_user: "agence touristique",
    id_connected: null
  },
  {
    email: "info@adventuretrektours.com",
    password: "adventure123",
    type_user: "agence touristique",
    id_connected: null
  }
];

// Fonction pour ajouter des documents à Firestore
const seedCollection = async (collectionName, data) => {
  const collectionRef = collection(db, collectionName);
  for (const doc of data) {
    try {
      await addDoc(collectionRef, { id: uuid.v4(), ...doc });
      console.log(
        `Document ajouté avec succès à la collection ${collectionName}:`,
        doc
      );
    } catch (error) {
      console.error(
        `Erreur lors de l'ajout du document à la collection ${collectionName}:`,
        error
      );
    }
  }
};

// Seed les données des agences et des sites touristiques
// seedCollection('agencies', agencyData);
// seedCollection('touristicSites', touristicSiteData);
// seedCollection("User", agenciesData);

export { app, auth, db };
