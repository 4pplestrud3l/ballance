// Some black minimalistic looking sliders for changing the size of the ball (default value 18) and the gravity (default value 9.8)
// a reset button, to reset the settings to initial state
import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import { Button } from "react-native";
import { createContext } from "react";
import { SettingsContext, SettingsProvider } from "../context/SettingsContext";
import { GameStyles } from "../styles/GameStyles";
import ImageButton from "../components/ImageButton";

export default function SettingsScreen({ navigation }) {
  // define the ballsize using the settingscontext
  const { ballSize, setBallSize } = useContext(SettingsContext);

  // save the settings
  const saveSettings = () => {
    setBallSize(ballSize);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Stylesheet
  const styles = GameStyles;

  return (
    <View>
      <ImageButton onPress={openModal}/>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Settings</Text>
            <View style={styles.sliderContainer}>
              <Text>Ball Size: {ballSize}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={2}
                step={0.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setBallSize(value)}
                value={ballSize}
              />
            </View>
            <Button title="Save" onPress={() => saveSettings()} />
            <Button
              title="Reset"
              onPress={() => {
                setBallSize(1);
              }}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
