import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import { Button, TouchableOpacity, StyleSheet, Text, View, Animated } from "react-native";
import Swipeable from 'react-native-swipe-gestures';
import { Svg, G, Circle, Rect } from 'react-native-svg';

// If you have a custom font, import it like this:
import * as Font from "expo-font";
Font.loadAsync({
  Barlow: require("../assets/fonts/Barlow-SemiBold.ttf"),
});

/*export default function MenuScreen({ navigation }) {
  const rotationValue = new Animated.Value(0);

  const SelectButton = ({ onPress, text }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
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
        onIndexChanged={(index) => {
          // Rotate the cake based on the swiper index
          const rotateValue = index * 120; // 120 degrees for each slide
          Animated.timing(rotationValue, {
            toValue: rotateValue,
            duration: 300, // Adjust the duration for a smooth rotation
            useNativeDriver: true,
          }).start();
        }}
      >
        <Animated.View
        style={[
          styles.slide,
          { transform: [{ rotate: rotationValue.interpolate({
            inputRange: [0, 120],
            outputRange: ['0deg', '-120deg'],
          })}] }
        ]}
      >
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <SelectButton
                style={styles.button}
                onPress={() => navigation.navigate("GameScreen")}
                text="single player"
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
        style={[
          styles.slide,
          { transform: [{ rotate: rotationValue.interpolate({
            inputRange: [120, 240],
            outputRange: ['120deg', '-120deg'],
          })}] }
        ]}
      >
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <SelectButton
                style={styles.button}
                onPress={() => navigation.navigate("ChooseLevelScreen")}
                text="multi player"
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
        style={[
          styles.slide,
          { transform: [{ rotate: rotationValue.interpolate({
            inputRange: [240, 360],
            outputRange: ['120deg', '0deg'],
          })}] }
        ]}
      >
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <SelectButton
                style={styles.button}
                onPress={() => navigation.navigate("EditorScreen")}
                text="editor"
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.slide, { transform: [{ rotate: "15deg" }] }]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <SelectButton
                style={styles.button}
                onPress={() => navigation.navigate("SettingsScreen")}
                text="settings"
              />
            </View>
          </View>
        </Animated.View>
      </Swiper>
    </View>
  );
}

// Stylesheet
// Buttons should have a gap between them
// TODO: Make the buttons look better
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    height: "40%", // Make the button container 40% of the screen height
    width: "60%", // Make the button container 40% of the screen width
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: 10,
  },
  buttonText: {
    top: "70%",
    color: "#9428bf",
    textShadowColor: "#361a42",
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 1,
    textAlign: "center",
    fontSize: 29,
    width: "100%",
    fontFamily: "Barlow",
    // If you want to use the default system font, you can omit the fontFamily property.
  },
});
*/

export default function MenuScreen({ navigation }) {
  const [rotation, setRotation] = useState(0);

  const onSwipeLeft = () => {
    // Beim Swipe nach links um 45 Grad drehen
    setRotation(rotation - 15);
  };

  const onSwipeRight = () => {
    // Beim Swipe nach rechts um 45 Grad drehen
    setRotation(rotation + 15);
  };

  return (
    <View style={styles.container}>
      <Swipeable
        style={styles.swipeContainer}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{
          velocityThreshold: 0.3, // Schwelle für die Swipe-Geschwindigkeit
          directionalOffsetThreshold: 80, // Schwelle für die Richtung des Swipes
        }}
      >
        <Svg
          style={[styles.svg, { transform: [{ rotate: `${rotation}deg` }] }]}
          width="200"
          height="200"
          viewBox="0 0 100 100"
        >
          {}
          <G>
            {/* ... */}
            <Circle cx="50" cy="50" r="45" fill="#F0F0F0" />
            <Rect x="48" y="25" width="4" height="50" fill="#FF0000" />
            <Rect x="25" y="48" width="50" height="4" fill="#FF0000" />
            <Circle cx="50" cy="50" r="2" fill="#000" />
          </G>
        </Svg>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    overflow: 'hidden', // Inhalt des "Swipeable" innerhalb der Grenzen halten
  },
  svg: {
    alignSelf: 'center', // Zentrieren Sie die Parkscheibe horizontal
  },
});