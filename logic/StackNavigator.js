import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen.js';
import SettingsScreen from '../screens/SettingsModalScreen.js';
import GameScreen from '../screens/GameScreen.js';
import EditorScreen from '../screens/EditorScreen.js';
import ChooseLevelScreen from '../screens/ChooseLevelScreen.js';
import { SettingsProvider } from '../context/SettingsContext';
import LevelSettingsScreen from '../screens/LevelSettingsScreen.js';

const Stack = createStackNavigator();

export default function myStack() {
  return (
    <SettingsProvider>  
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="EditorScreen" component={EditorScreen} />
        <Stack.Screen name="ChooseLevelScreen" component={ChooseLevelScreen} />
        <Stack.Screen name="LevelSettingsScreen" component={LevelSettingsScreen} />
    </Stack.Navigator>
    </SettingsProvider>
  );
}