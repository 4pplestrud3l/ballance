// imports all the components needed for the editor screen

import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

// exports the editor screen as a function

export default function EditorScreen({ navigation }) {
    const screenDimensions = Dimensions.get('window');

    const screenWidth = screenDimensions.width;
    const screenHeight = screenDimensions.height;

    const styles = StyleSheet.create({
        container: {
            marginLeft: 20,
            marginRight: 20,
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: screenWidth,
            height: screenHeight,
            borderColor: 'black',
        },
        grid: {
            flex: 1,
            flexDirection: 'column',
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            },
        cell: {
            flex: 1,
            borderWidth: 1,
            borderColor: 'black',
            },
    });
    
    const gridSize = 4
    // display the grid over the view
    const [grid, setGrid] = useState(Array(gridSize).fill(Array(gridSize).fill(0)))

    setGrid(grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            if (rowIndex === 0 || rowIndex === gridSize - 1 || colIndex === 0 || colIndex === gridSize - 1) {
                return 1
            }
            return 0
        })
    }))
    
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {grid.map((row, rowIndex) => {

                    return (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((cell, colIndex) => {
                                return (
                                    <View key={colIndex} style={styles.cell} />
                                )
                            })}
                        </View>
                    )
                }
                )}
            </View>
            <Button title="Back" onPress={() => navigation.navigate('MenuScreen')} />
        </View>
    );
}


