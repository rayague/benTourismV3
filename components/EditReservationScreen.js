import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Picker } from "@react-native-picker/picker";

export default function EditReservationScreen({ route, navigation }) {
  const { reservation } = route.params;

  const [selectedAgency, setSelectedAgency] = useState(
    reservation.agency || ""
  );
  const [selectedSite, setSelectedSite] = useState(reservation.site || "");
  const [date, setDate] = useState(reservation.date.toDate());
  const [time, setTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(
    reservation.numberOfPeople.toString() || ""
  );
  const [totalAmount, setTotalAmount] = useState(reservation.amount || 0);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [touristicSites, setTouristicSites] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgenciesAndSites = async () => {
      try {
        const agenciesSnapshot = await getDocs(collection(db, "agencies"));
        const agenciesList = agenciesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setAgencies(agenciesList);

        const sitesSnapshot = await getDocs(collection(db, "touristicSites"));
        const sitesList = sitesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTouristicSites(sitesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAgenciesAndSites();
  }, []);

  const saveChanges = async () => {
    try {
      const reservationRef = doc(db, "booking", reservation.id);
      const updatedReservationData = {
        agency: selectedAgency,
        site: selectedSite,
        date: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          parseInt(time.split(":")[0]),
          parseInt(time.split(":")[1])
        ),
        numberOfPeople: parseInt(numberOfPeople),
        amount: totalAmount
      };

      await updateDoc(reservationRef, updatedReservationData);
      Alert.alert("Modifications enregistrées avec succès");
      navigation.navigate("Dashboard Touriste");
    } catch (error) {
      console.error("Error saving changes: ", error);
      Alert.alert(
        "Erreur lors de l'enregistrement des modifications. Veuillez réessayer plus tard."
      );
    }
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const calculateAmount = (people) => {
    const pricePerPerson = selectedSite ? selectedSite.price : 0;
    const total = people * pricePerPerson;
    setTotalAmount(total);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier la réservation</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Agence :</Text>
        <Picker
          selectedValue={selectedAgency}
          onValueChange={(itemValue) => setSelectedAgency(itemValue)}
        >
          {agencies.map((agency) => (
            <Picker.Item
              key={agency.id}
              label={agency.name}
              value={agency.name}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Site touristique :</Text>
        <Picker
          selectedValue={selectedSite}
          onValueChange={(itemValue) => {
            setSelectedSite(itemValue);
            setTotalAmount(0); // Reset amount when site changes
          }}
        >
          <Picker.Item label="Sélectionner un site" value="" />
          {touristicSites.map((site) => (
            <Picker.Item key={site.id} label={site.name} value={site} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={styles.label}>Date :</Text>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Heure :</Text>
        <TextInput
          style={[styles.input, styles.greenBorder]}
          value={time}
          onChangeText={setTime}
          placeholder="Heure (HH:MM)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de personnes :</Text>
        <TextInput
          style={[styles.input, styles.greenBorder]}
          value={numberOfPeople}
          onChangeText={(value) => {
            setNumberOfPeople(value);
            calculateAmount(parseInt(value));
          }}
          keyboardType="numeric"
          placeholder="Nombre de personnes"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Montant total :</Text>
        <Text>{totalAmount} FCFA</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  greenBorder: {
    borderColor: "green"
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});
