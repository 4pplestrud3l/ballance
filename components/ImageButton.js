import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ImageButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require('../assets/settings48px.svg')} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    //backgroundColor: 'blue',
    borderRadius: 8,
    padding: 10,
    zIndex: 15,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageButton;