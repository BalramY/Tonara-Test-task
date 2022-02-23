import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddDetails from './screens/AddDetails';
import PdfView from './screens/PdfView';

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
        <Stack.Screen name="AddDetails" component={AddDetails} />
        <Stack.Screen name="PDF" component={PdfView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
