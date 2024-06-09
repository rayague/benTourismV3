import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path to your firebaseConfig file

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);

  useEffect(() => {
    // Fetch agencies from Firestore
    const fetchAgencies = async () => {
      try {
        const agenciesCollection = collection(db, "agencies");
        const agencySnapshot = await getDocs(agenciesCollection);
        const agenciesList = agencySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setAgencies(agenciesList);
      } catch (error) {
        console.error("Error fetching agencies:", error);
        Alert.alert("Error", "An error occurred while fetching agencies.");
      }
    };

    fetchAgencies();
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: messages.length, text: message }
    ]);
    setMessage("");
  };

  const renderAgencyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.agencyItem}
      onPress={() => setSelectedAgency(item)}
    >
      <Text style={styles.agencyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedAgency ? (
        <>
          <Text style={styles.selectedAgencyText}>
            Chatting with: {selectedAgency.name}
          </Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={agencies}
          keyExtractor={(item) => item.id}
          renderItem={renderAgencyItem}
          ListHeaderComponent={
            <Text style={styles.headerText}>
              Selectionner une agence pour discuter{" "}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10
  },
  agencyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  agencyName: {
    fontSize: 16
  },
  selectedAgencyText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f0f0f0"
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  listContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 10,
    marginTop: 10
  }
});
