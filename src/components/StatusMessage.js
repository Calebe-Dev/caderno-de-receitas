import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../theme';
import GlossyButton from './GlossyButton';
import PaperCard from './PaperCard';

// Bilhete de papel para os estados de carregamento, erro e lista vazia.
export default function StatusMessage({ type = 'loading', message, onRetry }) {
  const icon = type === 'error' ? 'alert-circle-outline' : 'restaurant-outline';

  return (
    <View style={styles.wrapper}>
      <PaperCard style={styles.note} contentStyle={styles.content}>
        {type === 'loading' ? (
          <ActivityIndicator size="large" color={colors.leather} />
        ) : (
          <Ionicons name={icon} size={36} color={type === 'error' ? colors.danger : colors.inkSoft} />
        )}
        <Text style={styles.text}>{message}</Text>
        {onRetry ? (
          <GlossyButton title="Tentar de novo" icon="refresh" onPress={onRetry} variant="leather" />
        ) : null}
      </PaperCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  note: {
    width: '100%',
    maxWidth: 340,
    transform: [{ rotate: '-1.5deg' }],
  },
  content: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  text: {
    fontFamily: fonts.hand,
    fontSize: 18,
    color: colors.ink,
    textAlign: 'center',
  },
});
