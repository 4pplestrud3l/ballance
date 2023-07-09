import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

// Display two buttons in the middle of the screen, one for starting the game and one for going to the settings, the buttons each navigate you to a new page with the same name
export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Start Game" onPress={() => navigation.navigate('GameScreen')} />
        <Button style={styles.button} title="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
        <Button style={styles.button} title="Editor" onPress={() => navigation.navigate('EditorScreen')} />
        <Button style={styles.button} title="Choose Level" onPress={() => navigation.navigate('ChooseLevelScreen')} />
        </View>
    </View>
  );
};

// Stylesheet
// Buttons should have a gap between them
// TODO: Make the buttons look better
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
