// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
// import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button, Image } from "react-native";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Infos from "./screens/Infos";
import Chat from "./screens/Chat";
// import Account from '../screens/Account';
import Agency from "./screens/Agency";
import Mapping from "./screens/Mapping";
import Booking from "./screens/Booking";
import Event from "./screens/Event";
import Login from "./screens/Login";
import NotificationsAgency from "./screens/NotificationsAgency";
import NotificationsTourist from "./screens/NotificationsTourist";
import ChatAgency from "./screens/ChatAgency";
import ChatTourist from "./screens/ChatTourist";
import ProfileTourist from "./screens/ProfileTourist";
import ProfileAgency from "./screens/ProfileAgency";
import WelcomeAgency from "./screens/WelcomeAgency";
import WelcomeTourist from "./screens/WelcomeTourist";
import Register from "./screens/Register";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "./screens/ForgotPassword";
import FormBooking from "./screens/FormBooking";
import { Ionicons } from "@expo/vector-icons";
// import { AuthContext, AuthProvider } from '../AuthContext';
import RegisteredHome from "./screens/RegisteredHome";
import AddReservationScreen from "./components/AddReservationScreen";
import EditReservationScreen from "./components/EditReservationScreen";
import Posts from "./screens/Posts";
import AddTouristicSite from "./components/AddTouristicSite";
import AddEvent from "./components/AddEvent";
import AddHostel from "./components/AddHostel";
import AgencyLoginPage from "./screens/AgencyLoginPage";
import EditProfileTourist from "./components/EditProfileTourist";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView>
        {user ? (
          <>
            <View style={styles.drawerHeader}>
              <Image
                source={require("./assets/images/drawerImage.jpg")}
                style={styles.drawerImage}
              />
            </View>
            <DrawerItem
              label="Acceuil"
              icon={({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Acceuil")}
            />
            <DrawerItem
              label="Nos Cultures"
              icon={({ color, size }) => (
                <Ionicons name="leaf" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Nos Cultures")}
            />
            <DrawerItem
              label="Mes Réservations"
              icon={({ color, size }) => (
                <Ionicons name="book" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Mes Réservations")}
            />
            <DrawerItem
              label="Messagerie"
              icon={({ color, size }) => (
                <Ionicons name="chatbubble" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Messagerie")}
            />

            <DrawerItem
              label="Évènements"
              icon={({ color, size }) => (
                <Ionicons name="calendar-outline" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Évènements")}
            />
            <DrawerItem
              label="Agences Touristiques"
              icon={({ color, size }) => (
                <Ionicons name="briefcase" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Agences Touristiques")}
            />
            <DrawerItem
              label="Map"
              icon={({ color, size }) => (
                <Ionicons name="map" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Map")}
            />
            <DrawerItem
              label="Dashboard Touriste"
              icon={({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Dashboard Touriste")}
            />
            {/* <DrawerItem
              label="Dashboard Agences"
              icon={({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Dashboard Agence")}
            /> */}
          </>
        ) : (
          <>
            <View style={styles.drawerHeader}>
              <Image
                source={require("./assets/images/drawerImage.jpg")}
                style={styles.drawerImage}
              />
            </View>
            <DrawerItem
              label="Acceuil"
              icon={({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Acceuil")}
            />
            <DrawerItem
              label="Nos Cultures"
              icon={({ color, size }) => (
                <Ionicons name="leaf" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Nos Cultures")}
            />
            <DrawerItem
              label="Mon Compte"
              icon={({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Mon Compte")}
            />
            <DrawerItem
              label="Map"
              icon={({ color, size }) => (
                <Ionicons name="map" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate("Map")}
            />
          </>
        )}
      </DrawerContentScrollView>
    );
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <Drawer.Navigator
        initialRouteName="Acceuil"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={screenDrawerOptions}
      >
        {user ? (
          <>
            <Drawer.Screen name="Messagerie" component={Chat} />
            <Drawer.Screen name="Évènements" component={Event} />
            <Drawer.Screen name="Agences Touristiques" component={Agency} />
            <Drawer.Screen name="Acceuil" component={Home} />
            <Drawer.Screen name="Nos Cultures" component={Infos} />
            <Drawer.Screen name="Mes Réservations" component={Booking} />
            <Drawer.Screen name="Map" component={Mapping} />
            <Drawer.Screen
              name="Dashboard Touriste"
              component={DashboardTourist}
              // options={{drawerItemStyle: {display: 'none'}}}
            />
            <Drawer.Screen
              name="EditReservation"
              component={EditReservationScreen}
              // options={{drawerItemStyle: {display: 'none'}}}
            />
            <Drawer.Screen
              name="AddReservation"
              component={AddReservationScreen}
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="Dashboard Agence"
              component={DashboardAgency}
              // options={{drawerItemStyle: {display: 'none'}}}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="Map" component={Mapping} />
            <Drawer.Screen name="Acceuil" component={Home} />
            <Drawer.Screen name="Nos Cultures" component={Infos} />
            <Drawer.Screen name="Mon Compte" component={Account} />
            {/* <Drawer.Screen name="Acceuil" component={RegisteredHome} /> */}
            <Drawer.Screen
              name="Connexion"
              component={Login}
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="Inscription"
              component={Register}
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="Mot de passe oublié"
              component={ForgotPassword}
              options={{ drawerItemStyle: { display: "none" } }}
            />
          </>
        )}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
};

function DashboardAgency() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome Agency"
    >
      <Stack.Screen
        name="Notifications Agence"
        component={NotificationsAgency}
      />
      <Stack.Screen name="Mes Postes" component={Posts} />
      <Stack.Screen name="Welcome Agency" component={WelcomeAgency} />
      <Stack.Screen name="Profile Agence" component={ProfileAgency} />
      <Stack.Screen name="Messages Agences" component={ChatAgency} />
      <Stack.Screen name="Ajouter un poste" component={AddTouristicSite} />
      <Stack.Screen name="Ajouter un évènement" component={AddEvent} />
      <Stack.Screen name="Ajouter un hotel" component={AddHostel} />
    </Stack.Navigator>
  );
}

function DashboardTourist() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome Tourist"
    >
      <Stack.Screen name="Welcome Tourist" component={WelcomeTourist} />
      <Stack.Screen
        name="Notifications Touriste"
        component={NotificationsTourist}
      />
      <Stack.Screen name="Profile Touriste" component={ProfileTourist} />
      <Stack.Screen name="Messages Touriste" component={ChatTourist} />
      <Stack.Screen name="AddReservation" component={AddReservationScreen} />
      {/* <Stack.Screen name="EditReservation" component={EditReservationScreen} /> */}
      <Stack.Screen name="EditProfile" component={EditProfileTourist} />
    </Stack.Navigator>
  );
}

const Account = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inscription"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Connexion" component={Login} />
      <Stack.Screen name="Inscription" component={Register} />
      <Stack.Screen name="Connexion Agence" component={AgencyLoginPage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#4CAF50",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    elevation: 20
  },
  drawerImage: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    elevation: 20
  },
  drawerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  }
});

const screenDrawerOptions = {
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  headerShown: true,
  headerStyle: {
    backgroundColor: "#4CAF50",
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
    height: 90,
    elevation: 10
  },
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30
  },
  tabBarStyle: {
    elevation: 10,
    height: 60
  },
  drawerStyle: {
    backgroundColor: "#fff",
    width: 300,
    fontWeight: "bold"
  }
};

export { AuthContext, AuthProvider };
