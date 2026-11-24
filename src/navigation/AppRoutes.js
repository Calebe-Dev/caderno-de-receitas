import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import AboutScreen from '../screens/AboutScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchScreen from '../screens/SearchScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

// Caminhos usados na versão web (ex.: /categoria/Dessert).
const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
      Category: 'categoria/:category',
      Recipe: 'receita/:id',
      Search: 'busca',
      About: 'sobre',
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
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
