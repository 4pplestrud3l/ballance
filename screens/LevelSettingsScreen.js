import * as db from '../logic/database.js';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

export default function LevelSettingsScreen({ navigation }) {

    // use the useState hook to create a level name variable
    const [levelName, setLevelName] = useState('');


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