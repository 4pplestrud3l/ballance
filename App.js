import React from 'react';
import { Text, View } from 'react-native';
import GameScreen from './screens/GameScreen';
import { SettingsProvider } from './context/SettingsContext';


export default function App() {

  return (
    <SettingsProvider>
     <GameScreen/>
    </SettingsProvider>
  );
};
