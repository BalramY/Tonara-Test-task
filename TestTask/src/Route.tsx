import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddDetails from './screens/AddDetails';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="AddDetails"
          options={{headerShown: false}}
          component={AddDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
