import React from "react";
import { View } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Svg, Polyline, Rect, Circle, Polygon, SvgXml } from "react-native-svg";
import { GameStyles } from "../styles/GameStyles";

const styles = GameStyles;

export const Obstacle = ({ points, id }) => {
  return (
    <Polygon
          points={points}
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

export const Grid = () => {
  const svgString = `<svg id="gridView" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="svg-pattern"
        x="0"
        y="0"
        width="36"
        height="36"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(1, 1) rotate(0) skewX(0)"
      >
        <svg width="35" height="35" viewBox="0 0 100 100">
          <g fill="#ffffff" opacity="1">
            <rect width="100" height="100"></rect>
          </g>
        </svg>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%"></rect>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect>
  </svg>`;

  return (
      <SvgXml xml={svgString} width="100%" height="100%" />
  );
};


export const Line = ({ points }) => {
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  console.log(path);

  return (
        <Polyline style={styles.lines} points={path} stroke="black" strokeWidth={2} fill="none"/>
  );
};
