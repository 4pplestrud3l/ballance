// Date: 2021/05/30
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import Svg from "react-native-svg";
import { Accelerometer } from "expo-sensors";
import { SettingsContext } from "../context/SettingsContext";
import { Obstacle, Line, Ball } from "../components/gameElements";
import { GameStyles } from "../styles/GameStyles";
import SettingsScreen from "./SettingsModalScreen";

export default function GameScreen({ navigation }) {
  const styles = GameStyles;
  const { ballSize, setBallSize } = useContext(SettingsContext);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 100 });
  const [ballMovement, setBallMovement] = useState({ velocity: 0, direction: "0,0"})
  const ballRadius = ballSize / 2;
  const screenDimensions = Dimensions.get("window");
  const screenWidth = screenDimensions.width;
  const screenHeight = screenDimensions.height;

  const obstacleCorners = [
    { id: 1, points: ["100,50", "200,50", "200,150", "100,150"] },
  ];

  // q: how to get the tilt direction?
  // a: use accelerometer
  const [tiltDirection, setTiltDirection] = useState("none");

  useEffect(() => { // implement accelerometer
    Accelerometer.setUpdateInterval(100);
    Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;

      // Calculate the pitch and roll angles in radians
    const pitch = Math.atan2(x, Math.sqrt(y * y + z * z));
    const roll = Math.atan2(y, Math.sqrt(x * x + z * z));

    // Convert radians to degrees
    const pitchDegrees = (pitch * 180) / Math.PI;
    const rollDegrees = (roll * 180) / Math.PI;

    // Normalize values to be within 0-360 degrees
    const pitchNormalized = (pitchDegrees + 360) % 360;
    const rollNormalized = (rollDegrees + 360) % 360;

    // Output the tilt direction
    let tiltDirectionX = "None";
    let tiltDirectionY = "None";

    if (pitchNormalized >= 45 && pitchNormalized <= 135) {
      tiltDirectionX = "Down";
    } else if (pitchNormalized >= 225 && pitchNormalized <= 315) {
      tiltDirectionX = "Up";
    }

    if (rollNormalized >= 45 && rollNormalized <= 135) {
      tiltDirectionY = "Left";
    } else if (rollNormalized >= 225 && rollNormalized <= 315) {
      tiltDirectionY = "Right";
    }

    console.log(`Tilt X: ${Math.round(pitchNormalized)}° (${tiltDirectionX})`);
    //console.log(`Tilt Y: ${Math.round(rollNormalized)}° (${tiltDirectionY})`);
    });
  }, []);



  // console.log tilt direction every 1000ms
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(tiltDirection);
      if (tiltDirection === "left") {
        moveBall({ x: -5, y: 0 });
      }
      if (tiltDirection === "right") {
        moveBall({ x: 5, y: 0 });
      }
      if (tiltDirection === "down") {
        moveBall({ x: 0, y: 5 });
      }
      if (tiltDirection === "up") {
        moveBall({ x: 0, y: -5 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tiltDirection]);

  // simple function to move the ball by using similar logic as in the useEffect above
  const moveBall = useCallback(
    (direction) => {
      const { x, y } = direction;
      setBallPosition({ x: ballPosition.x + x, y: ballPosition.y + y });
    },
    [ballPosition]
  );


  // implement joystick to move the ball
  return (
    <View style={styles.container}>
    <Svg height="100%" width={"100%"}>
      {obstacleCorners.map((obstacleCorner, index) => {
        const { id, points } = obstacleCorner;
        
        return (
          <React.Fragment key={index}>
            <Obstacle points={points} id={id} />
          </React.Fragment>
        );
      })}
      <Ball x={ballPosition.x} y={ballPosition.y} ballSize={ballSize} />
    </Svg>
        <Text style={styles.positionText}>
          tiltDirection: {tiltDirection},
        ballX: {ballPosition.x}, ballY: {ballPosition.y}
      </Text>
      <View style={styles.buttonsContainer}>
        <SettingsScreen/>
        <Button
          title="Back"
          onPress={() => navigation.navigate("MenuScreen")}
        />
        <Button
          title="Reset"
          onPress={() => setBallPosition({ x: 0, y: 0 })}
        />
        <View style={styles.moveButtons}>
          <View style={styles.leftButton}>
            <Button title="←" onPress={() => moveBall({ x: -10, y: 0 })} />
          </View>
          <View style={styles.rightButton}>
            <Button title="→" onPress={() => moveBall({ x: 10, y: 0 })} />
          </View>
          <View style={styles.upButton}>
            <Button title="↑" onPress={() => moveBall({ x: 0, y: -10 })} />
          </View>
          <View style={styles.downButton}>
            <Button title="↓" onPress={() => moveBall({ x: 0, y: 10 })} />
          </View>
        </View>
      </View>
    </View>
  );
}
