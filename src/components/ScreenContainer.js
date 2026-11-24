import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout } from '../theme';
import WoodBackground from './WoodBackground';

// Estrutura comum: fundo de madeira, cabeçalho fixo e conteúdo centralizado com largura máxima.
export default function ScreenContainer({ header, children, scroll = true, contentStyle }) {
  const insets = useSafeAreaInsets();
  const padding = { paddingBottom: insets.bottom + 24 };

  return (
    <WoodBackground>
      {header}
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, padding]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.inner, contentStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding]}>
          <View style={[styles.inner, styles.flex, contentStyle]}>{children}</View>
        </View>
      )}
    </WoodBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingTop: layout.gutter + 4,
  },
});
