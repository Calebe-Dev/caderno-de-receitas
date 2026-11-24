import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppRoutes from './src/navigation/AppRoutes';
import { fontAssets } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppRoutes />
    </SafeAreaProvider>
  );
}
