import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import { Button, TouchableOpacity, StyleSheet, Text, View } from "react-native";

// If you have a custom font, import it like this:
import * as Font from 'expo-font';
Font.loadAsync({
  'StrikeCoffee': require('../assets/fonts/StrikeCoffee.ttf'),
});

export default function MenuScreen({ navigation }) {

  const SelectButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        showsButtons={false}
        index={0}
      >
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <SelectButton
              style={styles.button}
              title="Singleplayer"
              onPress={() => navigation.navigate("GameScreen")}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <SelectButton
              style={styles.button}
              title="Multiplayer"
              onPress={() => navigation.navigate("ChooseLevelScreen")}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <SelectButton
            style={styles.button}
            title="Editor"
            onPress={() => navigation.navigate("EditorScreen")}
          />
        </View>
        <View style={styles.contentContainer}>
          <SelectButton
            style={styles.button}
            title="Settings"
            onPress={() => navigation.navigate("SettingsScreen")}
          />
        </View>
      </Swiper>
    </View>
  );
}

// Stylesheet
// Buttons should have a gap between them
// TODO: Make the buttons look better
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1, // Add a border of 1 pixel
    borderColor: "#9428bf", // Set the border color to red
  },
  buttonContainer: {
    marginBottom: 20,
    top: "20%", // Center the button container vertically
    width: "60%", // Make the button container 40% of the screen width
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: 'grey',
    paddingVertical: 70,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#9428bf',
    textShadowColor: '#5a2a6e',
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 1,
    fontSize: 29,
    width: "100%",
    fontFamily: 'StrikeCoffee',
    // If you want to use the default system font, you can omit the fontFamily property.
  },
});
