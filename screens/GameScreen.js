import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
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


// ToDo GameEngine Elemente in eigene Datei auslagern - Mischa
export default function GameScreen({}) {
  // import Styles - Mischa
  const styles = GameStyles;

  // Reference to the accelerometer data - Mischa
  const accelerometerDataRef = useRef({ x: 0, y: 0, z: 0 });
  
  // Ball settings - Mischa
  const { ballSize, setBallSize } = useContext(SettingsContext);
  const [ballPosition, setBallPosition] = useState({ x: 100, y: 400 });
  const ballSizeAdjusted = ballSize * cellSize;
  const ballRadius = ballSizeAdjusted / 2;

  // Calculate the screen dimensions - Mischa
  const screenDimensions = Dimensions.get("window");
  const screenWidth = screenDimensions.width;
  const screenHeight = screenDimensions.height;

  // Calculate the number of cells in each direction based on screen dimensions - Mischa
  const numCellsHorizontal = 21;
  const numCellsVertical = 42;

  // Calculate the cell size based on the smaller dimension (width or height) - Mischa
  const cellSize = Math.min(
    screenWidth / numCellsHorizontal,
    screenHeight * 0.8 / numCellsVertical
  );

  // Calculate the adjusted screen dimensions based on the number of cells - Mischa
  const adjustedScreenWidth = numCellsHorizontal * cellSize;
  const adjustedScreenHeight = numCellsVertical * cellSize;

  // Initialisiere Array für Hindernisse
  // wird später benötigt für effizientere Kollisionsdetektierung und Verhalten der Kugel nach Kollision - Mischa
  const obstacleArray = [];

  // Array für Hindernisse aktuell noch statische Daten - Mischa
  const obstacles = [
    {
      id: 1,
      pointsX: [1, 3, 3, 1],
      pointsY: [1, 1, 3, 3],
    },

    {
      id: 2,
      pointsX: [4, 14, 14, 4],
      pointsY: [4, 4, 14, 14],
    },
  ];

  // Funktion um Punkte der Hindernisse zu erhalten
  const getObstaclePoints = (obstacle) => {
    const points = [];
    for (let i = 0; i < obstacle.pointsX.length; i++) {
      points.push(
        `${Math.round(obstacle.pointsX[i] * cellSize)},${Math.round(
          obstacle.pointsY[i] * cellSize
        )}`
      );
    }
    return points.join(" ");
  };

  // Funktion um Größe des 2D Arrays für Hindernisse zu definieren
  // wird später benötigt für effizientere Kollisionsdetektierung und Verhalten der Kugel nach Kollision - Mischa
  const buildObstacleArray = () => {
    for (let i = 0; i < numCellsHorizontal; i++) {
      obstacleArray.push([]);
      for (let j = 0; j < numCellsVertical; j++) {
        obstacleArray[i].push(0);
      }
    }
  };

  // Funktion um Hindernisse in obstacleArray einzutragen
  // wird später benötigt für effizientere Kollisionsdetektierung und Verhalten der Kugel nach Kollision - Mischa
  const setObstacles = () => {
    for (let obstacle of obstacles) {
      for (let i = 0; i < obstacle.pointsX.length; i++) {
        obstacleArray[obstacle.pointsX[i]][obstacle.pointsY[i]] = 1;
      }
    }
  };

  const [closestPoints, setClosestPoints] = useState([]);
  const [projectionPoint, setProjectionPoint] = useState(null);

  // Funktion zur Überprüfung der Kollision
  const checkCollision = useCallback(
    (potentialPosition) => {
      let closestObstaclePoints = [];
      let minObstacleDistance = Infinity;

      for (let obstacle of obstacles) {
        const points = obstacle.pointsX.map((x, i) => [
          x * cellSize,
          obstacle.pointsY[i] * cellSize,
        ]);

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

      //console.log("distBallToProjection", distBallToProjection);
      if (distBallToProjection <= (ballSize * cellSize) / 2) {
        console.log("collision");
        return true; // Collision detected
      }
      return false; // No collision detected
    },
    [ballRadius]
  ); // Remove ballPosition from the dependency array

  // Funktion um Kugel zu bewegen mit Abfrage ob eine Kollision stattfindet
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
    /* View Container */
    <View style={styles.container}>
      {/*Game Container*/}
      <View style={styles.gameContainer}>
      {/*SVG Elements (game elements)*/}
        <Svg
          width={adjustedScreenWidth}
          height={adjustedScreenHeight}
          viewBox={`0 0 ${adjustedScreenWidth} ${adjustedScreenHeight}`}
        >
        {/*Grid*/}
          <Pattern
            id="svg-pattern"
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            fill="black"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0, 0) rotate(0) skewX(0)"
          >
            <Svg>
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
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#svg-pattern)"
          />
        {/*Obstacle*/}
          {obstacles.map((obstacles, index) => {
            let id = obstacles.id;
            let points = getObstaclePoints(obstacles);

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
          <Ball
            x={ballPosition.x}
            y={ballPosition.y}
            ballSize={(ballSize * cellSize) / 2}
          />
        </Svg>
      </View>
      {/*Info Text*/}
      <Text style={styles.positionText}>
        ballX: {ballPosition.x}, ballY: {ballPosition.y}
      </Text>
      {/*Settings Buttons*/}
      <View style={styles.settingsContainer}>
        <SettingsScreen />

        <Pressable
          onPress={() => setBallPosition({ x: 200, y: 50 })}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("SettingsScreen")}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Back</Text>
        </Pressable>
      </View>
      {/*Arrow Buttons*/}
      <View style={styles.arrowContainer}>
        <View style={styles.leftButton}>
          <Button title=" ←" onPress={() => moveBall({ x: -10, y: 0 })} />
        </View>
        <View style={styles.rightButton}>
          <Button title="→ " onPress={() => moveBall({ x: 10, y: 0 })} />
        </View>
        <View style={styles.upButton}>
          <Button title=" ↑ " onPress={() => moveBall({ x: 0, y: -10 })} />
        </View>
        <View style={styles.downButton}>
          <Button title=" ↓ " onPress={() => moveBall({ x: 0, y: 10 })} />
        </View>
      </View>
    </View>
  );
}
