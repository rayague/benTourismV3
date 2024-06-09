import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useAuth} from './AuthContext';

const ProtectedRoute = ({children, navigation}) => {
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      Alert.alert(
        'Ooops',
        "Vous n'êtes pas encore connecté.",
        [
          {
            text: 'Se connecter',
            onPress: () => navigation.navigate('Connexion'),
          },
        ],
        {cancelable: false},
      );
    }
  }, [user, navigation]);

  if (!user) {
    return null; // Render nothing if user is not authenticated
  }

  return children;
};

export default ProtectedRoute;