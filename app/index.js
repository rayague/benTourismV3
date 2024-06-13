import React, { useContext, useState } from "react";
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
import Home from "../screens/Home";
import Infos from "../screens/Infos";
import Chat from "../screens/Chat";
// import Account from '../screens/Account';
import Agency from "../screens/Agency";
import Mapping from "../screens/Mapping";
import Booking from "../screens/Booking";
import Event from "../screens/Event";
import Login from "../screens/Login";
import NotificationsAgency from "../screens/NotificationsAgency";
import NotificationsTourist from "../screens/NotificationsTourist";
import ChatAgency from "../screens/ChatAgency";
import ChatTourist from "../screens/ChatTourist";
import ProfileTourist from "../screens/ProfileTourist";
import ProfileAgency from "../screens/ProfileAgency";
import WelcomeAgency from "../screens/WelcomeAgency";
import WelcomeTourist from "../screens/WelcomeTourist";
import Register from "../screens/Register";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../screens/ForgotPassword";
import FormBooking from "../screens/FormBooking";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, AuthProvider } from "../AuthContext";
import RegisteredHome from "../screens/RegisteredHome";
import AddReservationScreen from "../components/AddReservationScreen";
import EditReservationScreen from "../components/EditReservationScreen";
import Posts from "../screens/Posts";
import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
import TestComponent from "../TestComponent";
import { userTypeContext } from "../context/userTypeContext";

export default function Page() {
  const [userType, setUserType] = useState('Papa');
  return (
    <>
    <userTypeContext.Provider value={{userType, setUserType}}>
      <AuthProvider />
      {/* <KkiapayProvider><TestComponent /></KkiapayProvider> */}
    </userTypeContext.Provider>
    </>
  );
}
