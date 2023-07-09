// Some black minimalistic looking sliders for changing the size of the ball (default value 18) and the gravity (default value 9.8)
// a reset button, to reset the settings to initial state
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native';
import { createContext } from 'react';
import { SettingsContext, SettingsProvider } from '../context/SettingsContext';


export default function SettingsScreen({ navigation }) {
  // define the ballsize using the settingscontext
  const { ballSize, setBallSize } = useContext(SettingsContext);

  // save the settings
  const saveSettings = () => {
    setBallSize(ballSize);
  };

  // The sliders should be able to change the ball size and gravity
  return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <View style={styles.sliderContainer}>
          <Text>Ball Size: {ballSize}</Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={30}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setBallSize(value)}
            value={ballSize}
          />
        </View>
        <Button title="Save" onPress={() => saveSettings()} />
        <Button title="Reset" onPress={() => { setBallSize(18) } } />
        <Button title="Back" onPress={() => navigation.navigate('Menu')} />
      </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: 200,
    height: 40,
  },
});
