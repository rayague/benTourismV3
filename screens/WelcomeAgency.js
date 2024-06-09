import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const navigation = useNavigation();

  const navigateToReservations = () => {
    navigation.navigate("Notifications Agence");
  };

  const navigateToSettings = () => {
    navigation.navigate("Profile Agence");
  };

  const handleAddEvent = () => {
    navigation.navigate("Ajouter un poste");
  };

  const handleAddTouristSite = () => {
    navigation.navigate("Ajouter un évènement");
  };

  const handleAddHotel = () => {
    navigation.navigate("Ajouter un hotel");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tableau de Bord</Text>
          <Avatar.Image
            size={50}
            source={{
              uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsfGVufDB8fDB8fHww"
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
            <FontAwesome name="calendar-plus-o" size={24} color="white" />
            <Text style={styles.buttonText}>Ajouter un événement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddTouristSite}
          >
            <FontAwesome name="map-marker" size={24} color="white" />
            <Text style={styles.buttonText}>Ajouter un site touristique</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddHotel}>
            <FontAwesome name="bed" size={24} color="white" />
            <Text style={styles.buttonText}>Ajouter un hôtel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          <TouchableOpacity onPress={navigateToReservations}>
            <Card style={styles.card}>
              <Card.Content>
                <FontAwesome
                  name="calendar"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Title>Réservations</Title>
                <Paragraph>Gérez vos réservations</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSettings}>
            <Card style={styles.card}>
              <Card.Content>
                <FontAwesome
                  name="ticket"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Title>Tickets</Title>
                <Paragraph>
                  Personnalisez les paramètres de votre agence
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSettings}>
            <Card style={styles.card}>
              <Card.Content>
                <FontAwesome
                  name="cogs"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Title>Paramètres</Title>
                <Paragraph>
                  Personnalisez les paramètres de votre agence
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20
  },
  card: {
    width: "100%",
    marginBottom: 20
    // height: 100
  },
  icon: {
    marginBottom: 10,
    alignSelf: "center"
  }
});

export default DashboardScreen;
