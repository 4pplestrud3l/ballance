import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import GameScreen from '../screens/GameScreen.js';
import EditorScreen from '../screens/EditorScreen.js';
import ChooseLevelScreen from '../screens/ChooseLevelScreen.js';
import { SettingsProvider } from '../context/SettingsContext';

const Stack = createStackNavigator();

export default function myStack() {
  return (
    <SettingsProvider>  
    <Stack.Navigator>
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="EditorScreen" component={EditorScreen} />
        <Stack.Screen name="ChooseLevelScreen" component={ChooseLevelScreen} />
    </Stack.Navigator>
    </SettingsProvider>
  );
}