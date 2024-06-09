import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Pressable } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SearchBar } from "react-native-elements";

const initialRegion = {
  latitude: 6.3656,
  longitude: 2.4183,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

// Fetch route data
const fetchRouteData = async (originLatLong, destinationLatLong) => {
  const origin = `${originLatLong.latitude},${originLatLong.longitude}`;
  const destination = `${destinationLatLong.latitude},${destinationLatLong.longitude}`;
  const apiKey = "AIzaSyBuNuN331jGDJRfk-BpFGt0EM59Joa4oo4"; // Replace with your API key

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const coords = extractCoords(data.routes[0].overview_polyline);
    return coords;
  } catch (error) {
    console.error("Error fetching route with routes api:", error);
    return [];
  }
};

const extractCoords = (overviewPolyline) => {
  try {
    if (overviewPolyline && overviewPolyline.points) {
      const decodedPoints = overviewPolyline.points;
      const coords = [];
      let index = 0,
        len = decodedPoints.length;
      let lat = 0,
        lng = 0;

      while (index < len) {
        let b,
          shift = 0,
          result = 0;
        do {
          b = decodedPoints.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        let dlat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;
        do {
          b = decodedPoints.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        let dlng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        coords.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
      }

      return coords;
    } else {
      console.error("Invalid polyline points");
      return [];
    }
  } catch (error) {
    console.error("Error decoding polyline:", error);
    return [];
  }
};

export default function Mapping({ route }) {
  const { locations } = route.params || {};
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [initialRegion, setInitialRegion] = useState({
    latitude: 6.3656,
    longitude: 2.4183,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [searchResult, setSearchResult] = useState(null);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    })();
  }, []);

  const handleUserLocationChange = (event) => {
    setUserLocation(event.nativeEvent.coordinate);
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let userPosition = await Location.getCurrentPositionAsync({});
    setInitialRegion({
      latitude: userPosition.coords.latitude,
      longitude: userPosition.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=AIzaSyBuNuN331jGDJRfk-BpFGt0EM59Joa4oo4`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setSearchResult({ latitude: location.lat, longitude: location.lng });
        const newCoords = await fetchRouteData(
          {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude
          },
          {
            latitude: location.lat,
            longitude: location.lng
          }
        );
        setCoords(newCoords);
      }
    } catch (error) {
      console.error("Error fetching search result:", error);
    }
  };

  const handleSearchCancel = () => {
    setSearchText(""); // Reset the search text
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text); // Update the search text state
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Rechercher..."
        onChangeText={handleSearchTextChange}
        onSubmitEditing={handleSearchSubmit}
        onCancel={handleSearchCancel}
        value={searchText} // Link the search text value to the component state
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        cancelIcon={styles.searchBarCancelIcon}
      />
      <MapView
        style={{ flex: 1, width: "100%" }}
        initialRegion={initialRegion}
        onUserLocationChange={handleUserLocationChange}
        showsUserLocation={true}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Votre position" />
        )}
        {searchResult && (
          <Marker coordinate={searchResult} title="Résultat de recherche" />
        )}
        {coords.length > 0 && (
          <Polyline coordinates={coords} strokeWidth={4} strokeColor="blue" />
        )}
        {location && searchResult && (
          <Polyline
            coordinates={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              },
              searchResult
            ]}
            strokeWidth={4}
            strokeColor="red"
          />
        )}
        {locations &&
          locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={location.locationOnMap}
              title={location.title}
              description={location.description}
            />
          ))}
      </MapView>
      <Pressable onPress={getUserLocation} style={styles.buttonLocation}>
        <Text style={styles.paragraph}>Ma Localisation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  buttonLocation: {
    position: "absolute",
    bottom: 8,
    left: 10,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 10,
    height: 50,
    alignItems: "center"
  },
  searchBarContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 20
  },
  searchBarInputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    width: 320
  },
  searchBarInput: {
    color: "#933",
    height: 40,
    width: 200
  },
  searchBarCancelIcon: {
    color: "#333"
  }
});
