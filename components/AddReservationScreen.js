import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import LoadingOverlay from "../components/LoadingOverlay";
import { getAuth } from "firebase/auth";

const AddReservationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    site: "",
    agency: "",
    agencyId: "",
    price: 15000,
    numberOfPeople: "",
    amount: "",
    date: new Date(),
    time: "",
    status: "en attente"
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [touristicSites, setTouristicSites] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    if (name === "site") {
      const selectedSite = touristicSites.find((site) => site.id === value);
      if (selectedSite) {
        const price = selectedSite.price;
        const amount = parseInt(formData.numberOfPeople) * price;
        setFormData({
          ...formData,
          [name]: value,
          price,
          amount,
          selectedSite
        });
      } else {
        Alert.alert("Erreur", "Veuillez sélectionner un site touristique.");
      }
    } else if (name === "numberOfPeople") {
      const amount = parseInt(value) * formData.price;
      setFormData({ ...formData, [name]: value, amount });
    } else if (name === "agency") {
      const selectedAgency = agencies.find((agency) => agency.id === value);
      if (selectedAgency) {
        setFormData({
          ...formData,
          agency: selectedAgency.name,
          agencyId: value
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      setLoading(true);
      const agenciesSnapshot = await getDocs(collection(db, "agencies"));
      const agenciesData = agenciesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAgencies(agenciesData);
      setLoading(false);
    };

    const fetchTouristicSites = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "touristicSites"));
        const sites = [];
        querySnapshot.forEach((doc) => {
          sites.push({ id: doc.id, ...doc.data() });
        });
        setTouristicSites(sites);
      } catch (error) {
        console.error("Error fetching touristic sites:", error);
      }
      setLoading(false);
    };

    fetchAgencies();
    fetchTouristicSites();
  }, []);

  const handleAddReservation = async () => {
    if (
      !formData.site ||
      !formData.agency ||
      !formData.numberOfPeople ||
      !formData.date ||
      !formData.time
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erreur", "Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "booking"), {
        ...formData,
        email: user.email, // Ajouter l'email de l'utilisateur connecté
        site: formData.selectedSite, // Inclure les données complètes du site touristique
        amount: formData.price * formData.numberOfPeople
      });
      navigation.navigate("Mes Réservations");
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de l'ajout de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    setLoading(true);

    try {
      const requestRef = doc(db, "booking", requestId);
      await updateDoc(requestRef, {
        status: "demande rejetée"
      });
      Alert.alert("Succès", "La demande a été rejetée.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors du rejet de la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      {loading && <LoadingOverlay />}
      <TextInput
        placeholder="Site Touristique"
        onChangeText={(text) => handleChange("site", text)}
        value={formData.site}
        style={styles.input}
      />
      <Picker
        selectedValue={formData.site}
        onValueChange={(itemValue) => handleChange("site", itemValue)}
      >
        <Picker.Item label="Sélectionnez un site touristique" value="" />
        {touristicSites.map((site) => (
          <Picker.Item key={site.id} label={site.title} value={site.id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Agence Touristique"
        onChangeText={(text) => handleChange("agency", text)}
        value={formData.agency}
        style={styles.input}
      />
      <Picker
        selectedValue={formData.agencyId}
        onValueChange={(itemValue) => handleChange("agency", itemValue)}
      >
        <Picker.Item label="Sélectionnez une agence" value="" />
        {agencies.map((agency) => (
          <Picker.Item key={agency.id} label={agency.name} value={agency.id} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {formData.date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || formData.date;
            setFormData({ ...formData, date: currentDate });
            setShowDatePicker(false);
          }}
        />
      )}
      <TextInput
        placeholder="Heure"
        onChangeText={(text) => handleChange("time", text)}
        value={formData.time}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre de Personnes"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("numberOfPeople", text)}
        value={formData.numberOfPeople}
        style={styles.input}
      />
      <Text style={styles.amountText}>Montant: {formData.amount}</Text>
      <Button
        title="Ajouter"
        style={styles.button}
        onPress={handleAddReservation}
      />
      <Button title="Annuler" onPress={() => navigation.goBack()} />
      <Button
        title="Refuser la demande"
        onPress={() => handleRejectRequest(formData.agencyId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 10
  },
  dateInput: {
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  dateText: {
    color: "blue"
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  }
});

export default AddReservationScreen;
