import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mapping from '../screens/Mapping';
import Booking from '../screens/Booking';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Mapp">
      <Stack.Screen name="Mapp" component={Mapping} />
      <Stack.Screen name="Mes Réservations" component={Booking} />
    </Stack.Navigator>
  );
}
