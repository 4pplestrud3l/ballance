import React from "react";
import { View } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Svg, Polyline, Rect, Circle, Polygon } from "react-native-svg";
import { GameStyles } from "../styles/GameStyles";

// define a triangle obstacle by providing the coordinates of the three points

const styles = GameStyles;

export const Obstacle = ({ points, id }) => {

  return (
    <Polygon
          points={points.join(" ")}
          fill="blue"
          style={styles.obstacle}
        />
  );
};

export const Ball = ({ x, y, ballSize }) => {
  return (
        <Circle 
          cx={x}
          cy={y}
          r={ballSize}
          fill="red"
          style={styles.ball}
        />
  );
};

export const Line = ({ points }) => {
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  console.log(path);

  return (
        <Polyline style={styles.lines} points={path} stroke="black" strokeWidth={2} fill="none"/>
  );
};
