import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

const requestMediaLibraryPermissions = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission refusée",
      "Nous avons besoin de votre permission pour accéder à la bibliothèque multimédia."
    );
    return false;
  }
  return true;
};
