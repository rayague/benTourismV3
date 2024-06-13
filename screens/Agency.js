import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Assurez-vous d'importer votre configuration Firebase
// Utilisez getFirestore pour initialiser la base de données
import LoadingOverlay from "../components/LoadingOverlay";

const db = getFirestore(app);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Agency = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Récupérer les données des agences touristiques depuis Firestore
    const fetchAgencies = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "agencies"));
        const agencies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(agencies);
        console.log("Données récupérées avec succès:", agencies);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchAgencies();
    setLoading(false);
  }, []);

  const scrollY = new Animated.Value(0);

  const animatedStyles = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ["0deg", "-15deg"],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable style={styles.agencyCard}>
            <View style={styles.agencyLogoContainer}>
              <MaterialCommunityIcons
                name="account-group"
                size={40}
                color="#007bff"
              />
            </View>
            <View style={styles.agencyInfo}>
              <Text style={styles.agencyTitle}>{item.name}</Text>
              <Text style={styles.agencyDescription}>
                {item.email} - {item.address}
              </Text>
              <View style={styles.agencyDetails}>
                <Text style={styles.agencyDetail}>
                  <MaterialCommunityIcons name="phone" size={20} color="#666" />
                  {item.number}
                </Text>
                <Text style={styles.agencyDetail}>
                  <MaterialCommunityIcons name="email" size={20} color="#666" />
                  {item.email}
                </Text>
              </View>
              <TouchableOpacity style={styles.agencyContactButtonContainter}>
                <Text style={styles.agencyContactButton}>
                  Contacter l'agence
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // padding: 20,
  },
  agencyCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    elevation: 5
  },
  agencyLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  agencyInfo: {
    flex: 1,
    marginLeft: 20
  },
  agencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  agencyDescription: {
    fontSize: 14,
    color: "#666"
  },
  agencyDetails: {
    flexDirection: "column",
    marginTop: 10
  },
  agencyDetail: {
    marginRight: 15
  },
  agencyContactButton: {
    textAlign: "center",
    color: "#f2f2f2",
    fontWeight: "bold"
  },
  agencyContactButtonContainter: {
    padding: 8,
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignContent: "center"
  }
});

export default Agency;
