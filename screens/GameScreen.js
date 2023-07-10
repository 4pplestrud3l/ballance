// Date: 2021/05/30
import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { SettingsContext } from '../context/SettingsContext';

export default function GameScreen({ navigation }) {
    const { ballSize, setBallSize } = useContext(SettingsContext);
    const [ballPosition, setBallPosition] = useState({ x: 200, y: 405 });

    // q: how to get screendimensions
    // a: use the Dimensions API
    const screenDimensions = Dimensions.get('window');

    // q: i get an error, property screendimensions does not exist
    // a: use the width and height properties of the screenDimensions object
    const screenWidth = screenDimensions.width;
    const screenHeight = screenDimensions.height;

    const walls = [
        { x: 100, y: 150, width: 51, height: 250 },
        { x: 150, y: 250, width: 51, height: 50 },
        { x: 200, y: 150, width: 50, height: 250 },

        { x: 300, y: 150, width: 51, height: 250 },

        { x: 50, y: 120, width: screenWidth - 100, height: 1 },
        { x: 50, y: screenHeight - 100, width: screenWidth - 100, height: 1 },
        { x: 50, y: 120, width: 1, height: screenHeight - 220 },
        { x: screenWidth - 50, y: 120, width: 1, height: screenHeight - 220 },
    ];

    
    const checkCollision = (ballPosition) => {
        const { x, y } = ballPosition;
        const ballRadius = ballSize / 2;
        for (const wall of walls) {
            const { x: wallX, y: wallY, width, height } = wall;

            const ballCenterX = x + ballRadius;
            const ballCenterY = y + ballRadius;
            
            const closestX = Math.max(wallX, Math.min(ballCenterX, wallX + width));
            const closestY = Math.max(wallY, Math.min(ballCenterY, wallY + height));

            const distanceX = ballCenterX - closestX;
            const distanceY = ballCenterY - closestY;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;

            if (distanceSquared < ballRadius * ballRadius) {
                return true;
            }
        }

        return false;
    };

    // q: how to allow the ball to only move in even numbers of pixels?
    // a: use the Math.round function to round the ball position to the nearest even number
    // q: where to use the Math.round function?
    // a: use the Math.round function in the moveBall function


    useEffect(() => {
        let subscription;
        const subscribeToAccelerometer = async () => {
            Accelerometer.setUpdateInterval(16); // Set the update interval (in milliseconds)
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

    
    
    /* const moveBall = ({ x, y }) => {
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
    }; */


    // if the ball collides with the wall, dont let the ball move further in the wall, but allow it moving alongside the wall, allow the ball to glide along the wall
    const moveBall = ({ x, y }) => {
        setBallPosition(prevPosition => {
            const nextPosition = {
                x: Math.round(prevPosition.x + x),
                y: Math.round(prevPosition.y + y),
            };
            // if checkcollision is true, return prevPosition
            if (checkCollision(nextPosition)) {
                console.log('collision detected');
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
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 100,
            position: 'absolute',
            bottom: 75,
        },

        positionText: {
            position: 'absolute',
            fontSize: 18,
            bottom: 40,
        },
        moveButtons: {
            position: 'absolute',
            zIndex: 10,
            bottom: -40,
            left: 300,
        },
        rightButton: {
            position: 'absolute',
            left: 10,
            bottom: 0,
        },
        leftButton: {
            position: 'absolute',
            right: 10,
            bottom: 0,
        },
        upButton: {
            position: 'absolute',
            right: -12,
            bottom: 35,
        },
        downButton: {
            position: 'absolute',
            right: -12,
            bottom: -35,
        },
        

    });


    // implement joystick to move the ball
    return (
        <View style={styles.container}>
            <View style={[styles.ball, { width: ballSize, height: ballSize, left: ballPosition.x, bottom: ballPosition.y }]} />
            {walls.map((wall, index) => (
                <View key={index} style={[styles.wall, { left: wall.x, bottom: wall.y, width: wall.width, height: wall.height }]} />
            ))}
            <Text style={styles.positionText}>
                    ballX: {ballPosition.x},
                    ballY: {ballPosition.y}
                </Text>
            <View style={styles.buttonsContainer}>
                <Button title="Back" onPress={() => navigation.navigate('MenuScreen')} />
                <Button title="Reset" onPress={() => setBallPosition({ x: 200, y: 400 })} />
            <View style={styles.moveButtons}>
                <View style={styles.leftButton}>
                    <Button
                        title="←"
                        onPress={() => moveBall({ x: -10, y: 0 })}
                    />
                </View>
                <View style={styles.rightButton}>
                    <Button
                        title="→"
                        onPress={() => moveBall({ x: 10, y: 0 })}
                    />
                </View>
                <View style={styles.upButton}>
                    <Button
                        title="↑"
                        onPress={() => moveBall({ x: 0, y: 10 })}
                    />
                </View>
                <View style={styles.downButton}>
                    <Button
                        title="↓"
                        onPress={() => moveBall({ x: 0, y: -10 })}
                    />
                </View>
                
            </View>
            </View>
        </View>
    );

};