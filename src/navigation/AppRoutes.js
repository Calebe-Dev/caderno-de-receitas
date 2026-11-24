import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from '../screens/HomeScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

// Caminhos usados na versão web (ex.: /categoria/Dessert).
const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
    },
  },
};

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.wood },
};

export default function AppRoutes() {
  return (
    <NavigationContainer
      theme={navigationTheme}
      linking={linking}
      documentTitle={{ formatter: () => 'Caderno de Receitas' }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
