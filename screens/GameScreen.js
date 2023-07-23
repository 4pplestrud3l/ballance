// Date: 2021/05/30
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Obstacle, Line, Ball } from "../components/gameElements";
import { GameStyles } from "../styles/GameStyles";
import SettingsScreen from "./SettingsModalScreen";
import { SettingsContext } from "../context/SettingsContext";
import { Circle, Svg, Polygon } from "react-native-svg";

export default function GameScreen({ }) {
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
    { id: 3, points: ["100,250", "200,250", "200,350", "100,350", "400,320"] },
  ];
  const [closestPoints, setClosestPoints] = useState([]);


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

    // console.log(`Tilt X: ${Math.round(pitchNormalized)}° (${tiltDirectionX})`);
    //console.log(`Tilt Y: ${Math.round(rollNormalized)}° (${tiltDirectionY})`);
    });
  }, []);



  // console.log tilt direction every 1000ms
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(tiltDirection);
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

  const checkCollision = useCallback(() => {
    let closestObstaclePoints = [];
    let minObstacleDistance = Infinity;
  
    for(let obstacle of obstacleCorners){
      const points = obstacle.points.map(point => point.split(',').map(Number));
      let pointsWithDistances = [];
  
      for(let point of points) {
        const distance = Math.sqrt(Math.pow(ballPosition.x - point[0], 2) + Math.pow(ballPosition.y - point[1], 2));
        pointsWithDistances.push({ point, distance });
      }
  
      pointsWithDistances.sort((a, b) => a.distance - b.distance);
      
      if (pointsWithDistances[0].distance < minObstacleDistance) {
        minObstacleDistance = pointsWithDistances[0].distance;
        closestObstaclePoints = pointsWithDistances.slice(0, 2).map(pd => pd.point);
      }
    }
  
    setClosestPoints(closestObstaclePoints);
  
    let vec1 = { x: closestObstaclePoints[0][0] - ballPosition.x, y: closestObstaclePoints[0][1] - ballPosition.y };
    let vec2 = { x: closestObstaclePoints[1][0] - ballPosition.x, y: closestObstaclePoints[1][1] - ballPosition.y };
  
    let angle = Math.acos(
      (vec1.x * vec2.x + vec1.y * vec2.y) /
      (Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y) * Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y))
      );
    
    let angleInDegrees = angle * (180 / Math.PI);
    let oppositeAngleInDegrees = 180 - angleInDegrees;
  
    console.log("Closest Points:", closestObstaclePoints);
    console.log("Angle in degrees:", angleInDegrees);
    console.log("Opposite Angle in degrees:", oppositeAngleInDegrees);
    const collisionDegree = 130;
   
  
    // if(angleInDegrees >= collisionDegree || minObstacleDistance <= ballRadius) {
    //   return true; // collision
    // }
  
    return false; // no collision
  }, [ballPosition, ballRadius]);
  
  
  // simple function to move the ball by using similar logic as in the useEffect above
  const moveBall = useCallback(
    (direction) => {
      const { x, y } = direction;
      const newBallPosition = { x: ballPosition.x + x, y: ballPosition.y + y };
      setBallPosition(newBallPosition);
  
      if(checkCollision()){
        // revert ball's position if there is a collision
        setBallPosition(ballPosition);
      }
    },
    [ballPosition, checkCollision]
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
        {closestPoints.map((point, index) => (
      <Circle
        key={index}
        cx={point[0]} // x-coordinate
        cy={point[1]} // y-coordinate
        r={5} // radius
        fill="red" // color
      />
    ))}
    {closestPoints.length === 2 && (
          <Polygon
            points={`${ballPosition.x},${ballPosition.y} ${closestPoints[0][0]},${closestPoints[0][1]} ${closestPoints[1][0]},${closestPoints[1][1]}`}
            fill="pink"
          />
        )}
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
