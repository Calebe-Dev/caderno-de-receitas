import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, shadows } from '../theme';
import { LINE_HEIGHT } from './PaperCard';

// Linha da lista de compras com uma caixinha desenhada para marcar o que já foi separado.
export default function IngredientItem({ ingredient, checked, onToggle }) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={styles.row}
    >
      <View style={[styles.box, checked ? shadows.buttonPressed : shadows.raised]}>
        {checked ? <Ionicons name="checkmark" size={18} color={colors.green} /> : null}
      </View>
      <Text style={[styles.text, checked && styles.checked]} numberOfLines={2}>
        <Text style={styles.measure}>{ingredient.measure ? `${ingredient.measure} ` : ''}</Text>
        {ingredient.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: LINE_HEIGHT,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.inkSoft,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontFamily: fonts.hand,
    fontSize: 17,
    lineHeight: LINE_HEIGHT,
    color: colors.ink,
  },
  measure: {
    fontFamily: fonts.handBold,
    color: colors.leather,
  },
  checked: {
    textDecorationLine: 'line-through',
    color: colors.inkFaded,
  },
});
