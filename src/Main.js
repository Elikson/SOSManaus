import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './pages/List';
import About from './pages/About';
import Register from './pages/Register';
import Contacts from './pages/Contacts';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="List" component={List} />
        <Stack.Screen options={{headerShown: false}} name="About" component={About} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
        <Stack.Screen options={{headerShown: false}} name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}