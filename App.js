import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyStack from './logic/StackNavigator.js';
/*import MenuScreen from './screens/MenuScreen.js';
import GameScreen from './screens/GameScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';
import GameWinScreen from './screens/GameWinScreen.js';
import GameLoseScreen from './screens/GameLoseScreen.js';
import GamePauseScreen from './screens/GamePauseScreen.js';
import GameResumeScreen from './screens/GameResumeScreen.js';
import GameRestartScreen from './screens/GameRestartScreen.js';
import GameQuitScreen from './screens/GameQuitScreen.js';*/

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
