import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AllCardScreen from './src/AllCardsScreen';
import AttendanceListScreen from './src/AttendanceListScreen';
import AllStudentsScreen from './src/AllStudentsScreen';
import ResultsScreen from './src/ResultScreen';
import HomeScreen from './src/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllCardScreen">
        <Stack.Screen
          name="AllCardScreen"
          component={AllCardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AttendanceList" component={AttendanceListScreen} />
        <Stack.Screen name="AllStudents" component={AllStudentsScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
