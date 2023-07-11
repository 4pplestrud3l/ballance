// create a screen for choosing a level name and a confirmation or back button, the level name should be saved in the database

// imports
import * as db from '../logic/database.js';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
// import necessary components from database.js

// create a screen for choosing a level name and a confirmation or back button, the level name should be saved in the database
export default function LevelSettingsScreen({ navigation }) {

    // use the useState hook to create a level name variable
    const [levelName, setLevelName] = useState('');

    // use setLevelName to set the level name variable to the text inputted by the user

    // which only when called by buttonPress will create a level in the database
    
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
        input: {
            width: 200,
            height: 50,
            borderRadius: 10,
            backgroundColor: 'white',
            marginBottom: 20,
        },
    });

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Level Name" onChangeText={text => setLevelName(text)} />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Create Level" onPress={
                    () => {
                        db.createLevel(levelName);
                        navigation.navigate('ChooseLevelScreen');
                    }
                } />
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Back" onPress={
                    () => {
                        navigation.navigate('ChooseLevelScreen');
                    }
                } />
            </View>
        </View>
    );


    };