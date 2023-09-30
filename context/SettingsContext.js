import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native';
import { createContext } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [ballSize, setBallSize] = useState(1);

    return (
        <SettingsContext.Provider value={{ ballSize, setBallSize }}>
            {children}
        </SettingsContext.Provider>
    );
};