import { StyleSheet, Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('window');
        
const screenWidth = screenDimensions.width;
const screenHeight = screenDimensions.height;



// define a stylesheet for the app
export const GameStyles = StyleSheet.create({
      container: {
        flex: 1,

        width: screenWidth,
        height: screenHeight,
        borderColor: "black",
      },
      wall: {
        position: "absolute",
        backgroundColor: "black",
      },
      settingsButtons: {
        position: "absolute",
        color: "white",
        zIndex: 15,
      },
      resetButton: {
        position: "absolute",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        left: 0,
        top: 50,
        borderRadius: 4,
        borderWidth: 5,
        transform: [{ rotate: '270deg'}],
      },
      menuButton: {
        position: "absolute",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        left: 3,
        top: 100,
        borderRadius: 4,
        borderWidth: 5,
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
        color: "white",
      },
      arrowButtons: {
        flex: 1,
        flexDirection: "column",
        // q: how can we set the height of the arrow buttons to be just a little bit less than the height of the screen?
        // a: height: screenHeight - 20,

        height: screenHeight - 60,
        width: screenWidth * 1.6,
        position: "absolute",
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 10,
      },
      rightButton: {
        position: "absolute",
        marginLeft: 60,
        marginBottom: 35,
      },
      leftButton: {
        position: "absolute",
        marginRight: 60,
        marginBottom: 35,
      },
      upButton: {
        position: "absolute",
        marginBottom: 70,
      },
      downButton: {
        position: "absolute",
        marginTop: 60,
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