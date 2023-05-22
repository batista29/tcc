import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginCadastro from './src/pages/index';
import Main from './src/pages/home/index.js';
import NewPartida from './src/pages/createPartida/index.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginCadastro" component={LoginCadastro} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NewPartida" component={NewPartida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}