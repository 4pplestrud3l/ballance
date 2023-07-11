// create a page on which youre able to choose a level to play

// imports
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as db from '../logic/database.js';
// import necessary components from database.js

// export the choose level screen as a function
export default function ChooseLevelScreen({ navigation }) {
    // display a list view of the levels by retreiving them from the database
    
    const [levels, setLevels] = useState([]);
    useEffect(() => {
        db.getLevels().then((levels) => {
            setLevels(levels);
        });
    }, []);

    // create level function should navigate to LevelSettingsScreen
    const createLevel = () => {
        navigation.navigate('LevelSettingsScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {levels.map((level, index) => {
                    return (
                        <Button key={index} style={styles.button} title={level.name} onPress={() => navigation.navigate('GameScreen', { level: level })} />
                    )
                }
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Create Level" onPress={ createLevel } />
            </View>
        </View>
    );
};

// Stylesheet
// Buttons should have a gap between them

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 10,
    },
});