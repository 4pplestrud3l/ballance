// Date: 2021/05/30
import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { SettingsContext } from '../context/SettingsContext';

export default function GameScreen({ navigation }) {
    const { ballSize, setBallSize } = useContext(SettingsContext);
    const [ballPosition, setBallPosition] = useState({ x: 200, y: 400 });

    // q: how to get screendimensions
    // a: use the Dimensions API
    const screenDimensions = Dimensions.get('window');

    // q: i get an error, property screendimensions does not exist
    // a: use the width and height properties of the screenDimensions object
    const screenWidth = screenDimensions.width;
    const screenHeight = screenDimensions.height;

    const walls = [
        { x: 100, y: 100, width: 51, height: 250 },
        { x: 150, y: 200, width: 51, height: 50 },
        { x: 200, y: 100, width: 50, height: 250 },

        { x: 300, y: 100, width: 51, height: 250 },

        { x: 50, y: 50, width: screenWidth - 100, height: 1 },
        { x: 50, y: screenHeight - 100, width: screenWidth - 100, height: 1 },
        { x: 50, y: 50, width: 1, height: screenHeight - 150 },
        { x: screenWidth - 50, y: 50, width: 1, height: screenHeight - 150 },
    ];


    // write a comment to describe the useEffect hook
    // q: how to check for collision and prevent the ball of moving through the walls?
    // a: use the checkCollision function to check if the ball collides with a wall

    const checkCollision = (ballPosition) => {
        const { x, y } = ballPosition;
        for (const wall of walls) {
            const { x: wallX, y: wallY, width, height } = wall;
            if (x < wallX + width && x + ballSize > wallX && y < wallY + height && y + ballSize > wallY) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        let subscription;
        const subscribeToAccelerometer = async () => {
            Accelerometer.setUpdateInterval(7); // Set the update interval (in milliseconds)
            subscription = Accelerometer.addListener(accelerometerData => {
                const { x, y } = accelerometerData;
                const tiltThreshold = 0.01; // Adjust this threshold based on your need

                if (Math.abs(x) > tiltThreshold || Math.abs(y) > tiltThreshold) {
                    moveBall({ x: -x * 10, y: -y * 15 });
                }
            });
        };

        subscribeToAccelerometer();

        // Clean up the subscription when the component unmounts

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);




    // move the ball to a new position

    // prevent the ball from moving through the walls and outside the screen

    
    
    const moveBall = ({ x, y }) => {
        setBallPosition(prevPosition => {
            const nextPosition = {
                x: prevPosition.x + x,
                y: prevPosition.y + y,
            };
            if (checkCollision(nextPosition)) {
                return prevPosition;
            }
            return nextPosition;
        });
    };
    
    // Stylesheet

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: screenWidth,
            height: screenHeight,
            borderColor: 'black',
        },
        ball: {
            position: 'absolute',
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize / 2,
            backgroundColor: 'red',
        },
        resetButton: {
            position: 'absolute',
            bottom: 0,
        },
        wall: {
            position: 'absolute',
            backgroundColor: 'black',
        },
    });


    return (
        <View style={styles.container}>
            <View style={[styles.ball, { width: ballSize, height: ballSize, left: ballPosition.x, bottom: ballPosition.y }]} />
            {walls.map((wall, index) => (
                <View key={index} style={[styles.wall, { left: wall.x, bottom: wall.y, width: wall.width, height: wall.height }]} />
            ))}
            <Text>
                {ballPosition.x}, {ballPosition.y}
            </Text>
            <Button title="Back" onPress={() => navigation.navigate('MenuScreen')} />
        </View>
    );

};