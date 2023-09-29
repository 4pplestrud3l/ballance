import { StyleSheet, Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('window');
        
const screenWidth = screenDimensions.width;
const screenHeight = screenDimensions.height;



// define a stylesheet for the app
export const GameStyles = StyleSheet.create({
      container: {
        flex: 1,
        display: "flex",
        borderColor: "black",
        borderColor: "green",
        borderWidth: 2,
      },
      gameContainer: {
        position: "relative",
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        justifyContent: "center",
        alignContent: "center",
        alignItems: 'center',
        borderColor: "purple",
        borderWidth: 2,
        zIndex: 5,
      },
      wall: {
        position: "absolute",
        backgroundColor: "black",
      },
      settingsContainer: {
        position: "absolute",
        color: "black",
        borderColor: "red",
        borderWidth: 2,
        zIndex: 10,
      },
      resetButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: 10,
        borderRadius: 4,
        borderWidth: 5,
        zIndex: 15,
        transform: [{ rotate: '270deg'}],
      },
      menuButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: 10,
        borderRadius: 4,
        borderWidth: 5,
        zIndex: 15,
        transform: [{ rotate: '270deg'}],
      },

      resetButtonText: {
        color: 'red',
      },
      menuButtonText: {
        color: 'red',
      },
  
      positionText: {
        position: "absolute",
        fontSize: 18,
        bottom: 40,
        color: '#333333',
      },
      arrowContainer: {
        position: "absolute",
        bottom: 0,
        right: "17%",
        borderColor: "red",
        borderWidth: 2,
        zIndex: 10,
      },
      rightButton: {
        position: "absolute",
        zIndex: 15,
        left: 27,
        bottom: 0,
        width: 50, // add a width property
        height: 50, // add a height property
      },
      leftButton: {
        position: "absolute",
        zIndex: 15,
        right: 27,
        bottom: 0,
        width: 50, // add a width property
        height: 50, // add a height property
      },
      upButton: {
        position: "absolute",
        zIndex: 15,
        bottom: 37,
        left: "50%",
        transform: [{ translateX: "-50%" }],
        width: 50, // add a width property
        height: 50, // add a height property
      },
      downButton: {
        position: "absolute",
        zIndex: 15,
        bottom: 0,
        left: "50%",
        transform: [{ translateX: "-50%" }],
        width: 50, // add a width property
        height: 50, // add a height property
      },
      lines: {
        position: "absolute",
        zIndex: 1,
      },
      ball: {
        position: "absolute",
        zIndex: 10,
        },
        obstacle: {
            position: "absolute",
            zIndex: 1,
        },
        sliderContainer: {
            marginBottom: 20,
          },
          slider: {
            width: 200,
            height: 40,
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: ' ', // semi-transparent background
          },
          modalContent: {
            backgroundColor: 'transparent',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          gridContainer: {
            flex: 1,
            backgroundColor: 'black',
          },

});