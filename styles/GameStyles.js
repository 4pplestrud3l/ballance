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
      row: {
        flexDirection: 'row',
      },
      cell: {
        position: 'absolute',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#000',
      },
      resetButton: {
        position: "absolute",
        bottom: 0,
      },
      wall: {
        position: "absolute",
        backgroundColor: "black",
      },
      buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 100,
        position: "absolute",
        bottom: 75,
      },
  
      positionText: {
        position: "absolute",
        fontSize: 18,
        bottom: 40,
      },
      moveButtons: {
        position: "absolute",
        zIndex: 10,
        bottom: -40,
        left: 300,
      },
      rightButton: {
        position: "absolute",
        left: 10,
        bottom: 0,
      },
      leftButton: {
        position: "absolute",
        right: 10,
        bottom: 0,
      },
      upButton: {
        position: "absolute",
        right: -12,
        bottom: 35,
      },
      downButton: {
        position: "absolute",
        right: -12,
        bottom: -35,
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