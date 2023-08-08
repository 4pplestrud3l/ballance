// get the imports for a context
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native';
import { createContext } from 'react';

// create a context for the settings
export const SettingsContext = createContext();

// create a provider for the settings
export const SettingsProvider = ({ children }) => {
    // define ballsize and gravity
    const [ballSize, setBallSize] = useState(1);

    return (
        <SettingsContext.Provider value={{ ballSize, setBallSize }}>
            {children}
        </SettingsContext.Provider>
    );
};