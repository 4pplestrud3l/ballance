import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Obstacle, Ball, Grid } from "../components/gameElements";
import { GameStyles } from "../styles/GameStyles";
import SettingsScreen from "./SettingsModalScreen";
import { SettingsContext } from "../context/SettingsContext";
import {
  Circle,
  Svg,
  Polygon,
  Line,
  Defs,
  Pattern,
  Rect,
} from "react-native-svg";

export default function GameScreen({}) {
  const styles = GameStyles;
  const accelerometerDataRef = useRef({ x: 0, y: 0, z: 0 });

  // useState for ball properties
  /*const ball = {
    x: 100,
    y: 200,
    velocity: 0, // pixels per second
  };*/

  const { ballSize, setBallSize } = useContext(SettingsContext);
  const [ballPosition, setBallPosition] = useState({ x: 100, y: 200 });
  const ballRadius = ballSize / 2;
  const screenDimensions = Dimensions.get("window");

  const screenWidth = screenDimensions.width;
  const screenHeight = screenDimensions.height;

  // Calculate the number of cells in each direction based on screen dimensions
  const numCellsHorizontal = 15;
  const numCellsVertical = 15;

  // Calculate the cell size based on the smaller dimension (width or height)
  const cellSize = Math.min(screenWidth / numCellsHorizontal, screenHeight / numCellsVertical);

  // Calculate the adjusted screen dimensions based on the number of cells
  const adjustedScreenWidth = numCellsHorizontal * cellSize;
  const adjustedScreenHeight = numCellsVertical * cellSize;

  const obstacleCorners = [
    { id: 1, points: ["100,50", "200,50", "200,150", "100,150"] },
    { id: 3, points: ["600,250", "800,250", "800,400", "600, 400"] },
    { id: 4, points: ["100,250", "200,250", "400,320", "200,350", "100,350"] },
  ];
  const [closestPoints, setClosestPoints] = useState([]);
  const [projectionPoint, setProjectionPoint] = useState(null);


  const checkCollision = useCallback(
    (potentialPosition) => {
      let closestObstaclePoints = [];
      let minObstacleDistance = Infinity;

      for (let obstacle of obstacleCorners) {
        const points = obstacle.points.map((point) =>
          point.split(",").map(Number)
        );
        let pointsWithDistances = [];

        for (let point of points) {
          const distance = Math.sqrt(
            Math.pow(potentialPosition.x - point[0], 2) +
              Math.pow(potentialPosition.y - point[1], 2)
          );
          pointsWithDistances.push({ point, distance });
        }

        pointsWithDistances.sort((a, b) => a.distance - b.distance);

        if (pointsWithDistances[0].distance < minObstacleDistance) {
          minObstacleDistance = pointsWithDistances[0].distance;
          closestObstaclePoints = pointsWithDistances
            .slice(0, 2)
            .map((pd) => pd.point);
        }
      }

      setClosestPoints(closestObstaclePoints);

      let vecClosestPoints = {
        x: closestObstaclePoints[1][0] - closestObstaclePoints[0][0],
        y: closestObstaclePoints[1][1] - closestObstaclePoints[0][1],
      };

      let vecBallToPoint0 = {
        x: potentialPosition.x - closestObstaclePoints[0][0],
        y: potentialPosition.y - closestObstaclePoints[0][1],
      };

      let t =
        (vecBallToPoint0.x * vecClosestPoints.x +
          vecBallToPoint0.y * vecClosestPoints.y) /
        (vecClosestPoints.x * vecClosestPoints.x +
          vecClosestPoints.y * vecClosestPoints.y);

      // Ensure the projected point stays on the line segment between the two points
      t = Math.max(0, Math.min(1, t));

      let projection = {
        x: closestObstaclePoints[0][0] + t * vecClosestPoints.x,
        y: closestObstaclePoints[0][1] + t * vecClosestPoints.y,
      };

      let distBallToProjection = Math.sqrt(
        Math.pow(projection.x - potentialPosition.x, 2) +
          Math.pow(projection.y - potentialPosition.y, 2)
      );
      setProjectionPoint(projection);

      if (distBallToProjection <= ballRadius * 2) {
        console.log("collision");
        return true; // Collision detected
      }
      return false; // No collision detected
    },
    [ballRadius]
  ); // Remove ballPosition from the dependency array

  // q: how to do the same function as here, but get all closest points and projection points for all obstacles in a certain radius?
  // a: use a for loop to iterate through all obstacles and check for collision with each one

  // simple function to move the ball by using similar logic as in the useEffect above
  const moveBall = useCallback(({ x, y }) => {
    setBallPosition((prevPosition) => {
      const nextPosition = {
        x: prevPosition.x + x,
        y: prevPosition.y + y,
      };

      if (
        checkCollision(nextPosition) ||
        nextPosition.x < 0 + ballSize ||
        nextPosition.x > screenWidth - ballSize ||
        nextPosition.y < 0 + ballSize ||
        nextPosition.y > screenHeight - ballSize
      ) {
        console.log("collision detected");

        // Perform collision response with useCallback function handleCollision
        const newPosition = prevPosition;

        return newPosition;
      }
      return nextPosition;
    });
  });

  // useEffect for Accelerometer data
  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      accelerometerDataRef.current = accelerometerData;
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  // useEffect for timed ball movement
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate ball movement based on accelerometer data
      const { x, y } = accelerometerDataRef.current;
      moveBall({ x: Math.round(-x * 10), y: Math.round(y * 15) });
    }, 1);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [moveBall]);

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Pattern
          id="svg-pattern"
          x="0"
          y="0"
          width={cellSize}
          height={cellSize}
          fill="black"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(1, 1) rotate(0) skewX(0)"
        >
          <Svg width={adjustedScreenWidth} height={adjustedScreenHeight} viewBox={`0 0 ${adjustedScreenWidth} ${adjustedScreenHeight}`}>
            <Rect width={cellSize} height={cellSize} fill="black" />
            <Rect
              width="100%"
              height="100%"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </Svg>
        </Pattern>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)" />

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
        {projectionPoint && (
          <React.Fragment>
            <Circle
              cx={projectionPoint.x} // x-coordinate
              cy={projectionPoint.y} // y-coordinate
              r={5} // radius
              fill="green" // color
            />

            <Line // Adding line component here
              x1={ballPosition.x}
              y1={ballPosition.y}
              x2={projectionPoint.x}
              y2={projectionPoint.y}
              stroke="black"
              strokeWidth="2"
            />
          </React.Fragment>
        )}
        <Ball x={ballPosition.x} y={ballPosition.y} ballSize={ballSize} />
      </Svg>
      <Text style={styles.positionText}>
        ballX: {ballPosition.x}, ballY: {ballPosition.y}
      </Text>
      <View style={styles.buttonsContainer}>
        <SettingsScreen />
        <Button
          title="Back"
          onPress={() => navigation.navigate("MenuScreen")}
        />
        <Button
          title="Reset"
          onPress={() => setBallPosition({ x: 200, y: 50 })}
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
