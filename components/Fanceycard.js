import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Fanceycard() {
  const navigation = useNavigation();
  const [touristicSites, setTouristicSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "touristicSites"),
      (snapshot) => {
        const sites = snapshot.docs.map((doc) => doc.data());
        setTouristicSites(sites);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching touristic sites: ", error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLocation = (locationOnMap, title, description) => {
    navigation.navigate("Map", {
      locations: [{ locationOnMap, title, description }]
    });
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headingText}>Découvrez avec nous</Text>
        {touristicSites.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={[styles.card, styles.cardElevated]}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardLabel}>{item.location}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <View style={styles.cardFooterContainer}>
                <Pressable
                  style={styles.cardFooterButton}
                  onPress={() =>
                    handleLocation(
                      item.locationOnMap,
                      item.title,
                      item.description
                    )
                  }
                >
                  <Ionicons name="location-outline" size={24} color="#000" />
                  <Text style={styles.locationText}>Localisation</Text>
                </Pressable>
                {item.price && (
                  <Text style={styles.priceText}>{item.price} FCFA</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 20,
    color: "#333"
  },
  cardContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  card: {
    height: 200
  },
  cardElevated: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  cardBody: {
    padding: 16
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  cardLabel: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  cardFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  cardFooterButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationText: {
    marginLeft: 5,
    color: "#007bff"
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  }
});
